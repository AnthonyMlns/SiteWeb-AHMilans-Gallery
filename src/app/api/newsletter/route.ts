import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let email: string | undefined

  try {
    const body = await req.json()
    email = body.email
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined

  if (!apiKey) {
    // Dev fallback: log and return success so the UI is testable without Brevo configured
    console.warn('[newsletter] BREVO_API_KEY not set — subscription not saved:', email)
    return NextResponse.json({ success: true })
  }

  try {
    const payload: Record<string, unknown> = {
      email,
      updateEnabled: true, // update contact if already exists
    }
    if (listId) payload.listIds = [listId]

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    })

    // 201 Created or 204 No Content both mean success with Brevo
    if (res.ok || res.status === 204) {
      return NextResponse.json({ success: true })
    }

    const data = await res.json().catch(() => ({}))
    console.error('[newsletter] Brevo error:', res.status, data)
    return NextResponse.json(
      { error: (data as { message?: string }).message ?? 'Erreur Brevo' },
      { status: 500 },
    )
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'tickerText',
      title: 'Ticker Text',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Texts scrolling in the header ticker',
    }),
    defineField({
      name: 'heroArtist',
      title: 'Hero Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
    }),
    defineField({
      name: 'artistOfTheMonth',
      title: 'Artist of the Month',
      type: 'reference',
      to: [{ type: 'artist' }],
    }),
    defineField({
      name: 'featuredArtwork',
      title: 'Featured Artwork (spotlight)',
      type: 'reference',
      to: [{ type: 'artwork' }],
      description: 'Single artwork to highlight — the Collection section displays all artworks marked "featured"',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'service',
          title: 'Service',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heroArtist.name' },
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})

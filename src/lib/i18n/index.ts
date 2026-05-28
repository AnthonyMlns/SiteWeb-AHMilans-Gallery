export interface Translations {
  nav: {
    home: string
    artists: string
    works: string
    editorial: string
    contact: string
  }
  home: {
    discover: string
    artistOfMonth: string
    viewPortfolio: string
    artists: string
    allArtists: string
    collection: string
    allWorks: string
    journal: string
    allArticles: string
    heroSubtitle: string
    discoverRoster: string
    whyTitle: string
    whyCol1Title: string
    whyCol1Desc: string
    whyCol2Title: string
    whyCol2Desc: string
    whyCol3Title: string
    whyCol3Desc: string
    selectedWorks: string
    theRoster: string
    heroLeft: string
    heroRight: string
    heroLink: string
    readMore: string
    portrait: string
    readNow: string
    artistsLink: string
    artworksLink: string
    newsletterTitle: string
    newsletterSubtitle: string
    sectionJournalDesc: string
    sectionArtistsDesc: string
    sectionWorksDesc: string
    manifestoLeft: string
    manifestoRight: string
  }
  newsletter: {
    placeholder: string
    subscribed: string
    error: string
  }
  artists: {
    title: string
    count: (n: number) => string
    empty: string
    backLink: string
    worksHeading: string
  }
  works: {
    title: string
    all: string
    empty: string
    emptyFiltered: string
    count: (n: number) => string
    available: string
    sold: string
    backLink: string
    specs: {
      year: string
      medium: string
      dimensions: string
      availability: string
      price: string
    }
    inquireTrigger: string
    inquireHeading: string
    inquireSubmit: string
    inquireSubject: (title: string) => string
    inquireDefaultMessage: (title: string, artist?: string) => string
    namePlaceholder: string
    emailPlaceholder: string
  }
  articles: {
    title: string
    count: (n: number) => string
    empty: string
    backLink: string
    readTime: (n: number) => string
    relatedArtist: string
  }
  categories: {
    interview: string
    focus: string
    news: string
    essay: string
  }
  contact: {
    title: string
    address: string
    email: string
    follow: string
    acquisitions: string
    acquisitionsText: string
    form: {
      name: string
      email: string
      message: string
      namePlaceholder: string
      emailPlaceholder: string
      messagePlaceholder: string
      send: string
      sent: string
      sentDesc: string
      sendAnother: string
    }
  }
  footer: {
    privacy: string
  }
}

export const translations: Translations = {
  nav: {
    home: 'Home',
    artists: 'Artists',
    works: 'Works',
    editorial: 'Editorial',
    contact: 'Contact',
  },
  home: {
    discover: 'Discover',
    artistOfMonth: 'Artist of the Month',
    viewPortfolio: 'View portfolio',
    artists: 'Artists',
    allArtists: 'All artists →',
    collection: 'Collection',
    allWorks: 'All works →',
    journal: 'Journal',
    allArticles: 'All articles →',
    heroSubtitle: 'A curatorial label for contemporary abstract art',
    discoverRoster: 'Discover the roster',
    whyTitle: 'A more intentional way to collect art',
    whyCol1Title: 'A carefully selected roster',
    whyCol1Desc: 'Each artist is chosen for the coherence and singularity of their practice.',
    whyCol2Title: 'Direct access to the artists',
    whyCol2Desc: 'We bridge the gap between collectors and creators, without intermediaries.',
    whyCol3Title: 'Works that last',
    whyCol3Desc: 'Pieces made to stand the test of time — and grow in value.',
    selectedWorks: 'Selected works',
    theRoster: 'The roster',
    heroLeft: 'A careful eye on singular practices — artists chosen for the depth and coherence of their work.',
    heroRight: 'AH Milans champions a focused selection of emerging artists whose practice deserves a closer look. Every representation is a commitment.',
    heroLink: 'View available artworks →',
    readMore: 'Read More ↗',
    portrait: 'Portrait',
    readNow: 'Read Now ↗',
    artistsLink: 'Artists ↗',
    artworksLink: 'Artworks ↗',
    newsletterTitle: 'Not your average newsletter',
    newsletterSubtitle: 'Best emerging artist updates',
    sectionJournalDesc: 'An editorial program that follows artists beyond their works — interviews, close readings, portraits of practice.',
    sectionArtistsDesc: 'A focused roster, built around a single criterion: the singularity of an approach and the coherence of a practice over time.',
    sectionWorksDesc: 'Works chosen for their intrinsic quality, each documented and directly tied to the artist who made them.',
    manifestoLeft: 'We are not a gallery in the traditional sense. We are a curatorial label — a filter, a voice, a commitment to artists who deserve to be seen.',
    manifestoRight: 'AH Milans identifies emerging artists whose practice deserves sustained attention. We build around them an editorial presence: articles, portraits, contextual writing. Acquisition is just one of the possible forms of a relationship with art that we seek to make more direct, more personal, more honest.',
  },
  newsletter: {
    placeholder: 'Email address',
    subscribed: "✓ You're subscribed.",
    error: 'An error occurred — please try again.',
  },
  artists: {
    title: 'Artists',
    count: (n) => `${n} artist${n !== 1 ? 's' : ''}`,
    empty: 'No artists yet.',
    backLink: '← Artists',
    worksHeading: 'Works',
  },
  works: {
    title: 'Works',
    all: 'All',
    empty: 'No works available.',
    emptyFiltered: 'No works by this artist.',
    count: (n) => `${n} work${n !== 1 ? 's' : ''}`,
    available: 'Available',
    sold: 'Sold',
    backLink: '← All works',
    specs: {
      year: 'Year',
      medium: 'Medium',
      dimensions: 'Dimensions',
      availability: 'Availability',
      price: 'Price',
    },
    inquireTrigger: 'Inquire',
    inquireHeading: 'Acquisition inquiry',
    inquireSubmit: 'Open in mail client →',
    inquireSubject: (title) => `Inquiry — ${title}`,
    inquireDefaultMessage: (title, artist) =>
      `Hello,\n\nI am interested in the work "${title}"${artist ? ` by ${artist}` : ''}.\n\nCould you please provide more information about its availability?\n\nBest regards,`,
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
  },
  articles: {
    title: 'Journal',
    count: (n) => `${n} article${n !== 1 ? 's' : ''}`,
    empty: 'No articles yet.',
    backLink: '← All articles',
    readTime: (n) => `${n} min read`,
    relatedArtist: 'Related artist',
  },
  categories: {
    interview: 'Interview',
    focus: 'Focus',
    news: 'News',
    essay: 'Essay',
  },
  contact: {
    title: 'Contact',
    address: 'Address',
    email: 'Email',
    follow: 'Follow the gallery',
    acquisitions: 'Acquisitions',
    acquisitionsText: 'For any acquisition inquiry or information about a work, use the form or contact us directly from the artwork page.',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Your message...',
      send: 'Send',
      sent: 'Message prepared.',
      sentDesc: 'Your mail client opened with the message pre-filled.',
      sendAnother: 'Send another message',
    },
  },
  footer: {
    privacy: 'Privacy Policy',
  },
}

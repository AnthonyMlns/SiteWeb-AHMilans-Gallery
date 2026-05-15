export type Lang = 'fr' | 'en'

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
    services: string
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

export const translations: Record<Lang, Translations> = {
  fr: {
    nav: {
      home: 'Accueil',
      artists: 'Artistes',
      works: 'Œuvres',
      editorial: 'Éditorial',
      contact: 'Contact',
    },
    home: {
      discover: 'Découvrir',
      artistOfMonth: 'Artiste du mois',
      viewPortfolio: 'Voir le portfolio',
      artists: 'Artistes',
      allArtists: 'Tous les artistes →',
      collection: 'Collection',
      allWorks: 'Toutes les œuvres →',
      services: 'Services',
      journal: 'Journal',
      allArticles: 'Tous les articles →',
      heroSubtitle: "Un label curatorial pour l’art abstrait contemporain",
      discoverRoster: 'Découvrir les artistes',
      whyTitle: "Une façon plus intentionnelle de collectionner l’art",
      whyCol1Title: 'Une sélection rigoureuse',
      whyCol1Desc: 'Chaque artiste est choisi pour la cohérence et la singularité de sa pratique.',
      whyCol2Title: 'Un accès direct aux artistes',
      whyCol2Desc: 'Nous facilitons la relation entre collectionneurs et créateurs, sans intermédiaire.',
      whyCol3Title: 'Des œuvres qui durent',
      whyCol3Desc: 'Des pièces pensées pour traverser le temps — et prendre de la valeur.',
      selectedWorks: 'Œuvres sélectionnées',
      theRoster: 'Les artistes',
    },
    artists: {
      title: 'Artistes',
      count: (n) => `${n} artiste${n !== 1 ? 's' : ''}`,
      empty: 'Aucun artiste pour le moment.',
      backLink: '← Artistes',
      worksHeading: 'Œuvres',
    },
    works: {
      title: 'Œuvres',
      all: 'Tous',
      empty: 'Aucune œuvre disponible pour le moment.',
      emptyFiltered: 'Aucune œuvre pour cet artiste.',
      count: (n) => `${n} œuvre${n !== 1 ? 's' : ''}`,
      available: 'Disponible',
      sold: 'Vendue',
      backLink: '← Toutes les œuvres',
      specs: {
        year: 'Année',
        medium: 'Technique',
        dimensions: 'Dimensions',
        availability: 'Disponibilité',
        price: 'Prix',
      },
      inquireTrigger: 'Inquire',
      inquireHeading: 'Demande de renseignement',
      inquireSubmit: 'Ouvrir dans ma messagerie →',
      inquireSubject: (title) => `Demande — ${title}`,
      inquireDefaultMessage: (title, artist) =>
        `Bonjour,\n\nJe suis intéressé(e) par l'œuvre « ${title} »${artist ? ` de ${artist}` : ''}.\n\nPourriez-vous m'en dire davantage sur sa disponibilité ?\n\nCordialement,`,
      namePlaceholder: 'Votre nom',
      emailPlaceholder: 'votre@email.com',
    },
    articles: {
      title: 'Journal',
      count: (n) => `${n} article${n !== 1 ? 's' : ''}`,
      empty: 'Aucun article pour le moment.',
      backLink: '← Tous les articles',
      readTime: (n) => `${n} min de lecture`,
      relatedArtist: 'Artiste associé',
    },
    categories: {
      interview: 'Interview',
      focus: 'Focus',
      news: 'Actualité',
      essay: 'Essai',
    },
    contact: {
      title: 'Contact',
      address: 'Adresse',
      email: 'Email',
      follow: 'Suivre la galerie',
      acquisitions: 'Acquisitions',
      acquisitionsText: "Pour toute demande d'acquisition ou de renseignement sur une œuvre, utilisez le formulaire ou contactez-nous directement sur la fiche de l'œuvre.",
      form: {
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Votre nom',
        emailPlaceholder: 'votre@email.com',
        messagePlaceholder: 'Votre message...',
        send: 'Envoyer',
        sent: 'Message préparé.',
        sentDesc: "Votre messagerie s'est ouverte avec le message pré-rempli.",
        sendAnother: 'Envoyer un autre message',
      },
    },
    footer: {
      privacy: 'Politique de confidentialité',
    },
  },

  en: {
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
      services: 'Services',
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
  },
}

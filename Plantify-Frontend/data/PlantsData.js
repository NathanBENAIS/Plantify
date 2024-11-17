export const PLANTS_DATA = [
    {
      id: '1',
      name: 'Rose',
      scientificName: 'Rosa',
      description: 'La rose est une fleur élégante et parfumée, symbole de l\'amour et de la passion. Ses pétales délicats et son parfum envoûtant en font l\'une des fleurs les plus appréciées au monde.',
      sunshine: 'Plein soleil',
      difficulty: 'Modérée',
      image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg',
      position: [48.8566, 2.3522],
      location: 'Jardin des Tuileries',
      characteristics: {
        minerals: ['Fer', 'Calcium', 'Magnésium'],
        vitamins: ['Vitamine C'],
        antioxidants: ['Polyphénols', 'Flavonoïdes'],
        fragranceEffect: 'Apaisante et relaxante',
        therapeuticUses: ['Aide à réduire le stress', 'Améliore la qualité du sommeil', 'Calme les irritations cutanées']
      },
      traditionalUses: {
        tea: 'Les pétales de rose sont utilisés pour préparer des thés apaisants et aromatiques.',
        essentialOil: 'L\'huile essentielle de rose est prisée en aromathérapie pour ses propriétés relaxantes.',
        cosmetic: 'Les extraits de rose sont utilisés dans des produits de soins pour la peau pour leurs propriétés hydratantes et anti-âge.'
      },
      culturalSignificance: 'Symbole de l\'amour et de la beauté dans de nombreuses cultures à travers le monde.',
      wellBeing: {
        stressRelief: 'Son parfum réduit les niveaux de stress et favorise une sensation de calme.',
        moodEnhancer: 'Améliore l\'humeur et stimule les émotions positives.',
        skinCare: 'Aide à apaiser et hydrater la peau sensible.'
      },
      funFact: 'Les roses sont cultivées depuis plus de 5 000 ans et étaient déjà appréciées dans les jardins de la Chine antique.'
    },    
    {
      id: '2',
      name: 'Aloe Vera',
      scientificName: 'Aloe barbadensis miller',
      description: 'L’Aloe Vera est une plante succulente prisée pour ses propriétés médicinales et cosmétiques. Sa sève gélatineuse est utilisée depuis des siècles pour apaiser et soigner divers maux.',
      sunshine: 'Lumière indirecte ou soleil doux',
      difficulty: 'Facile',
      image: 'https://images.pexels.com/photos/7015871/pexels-photo-7015871.jpeg',
      position: [34.0522, -118.2437],
      location: 'Jardin botanique de Los Angeles',
      characteristics: {
        minerals: ['Calcium', 'Potassium', 'Sodium'],
        vitamins: ['Vitamine A', 'Vitamine C', 'Vitamine E'],
        antioxidants: ['Anthraquinones'],
        therapeuticUses: ['Hydrate et apaise la peau', 'Favorise la digestion', 'Stimule la cicatrisation'],
        fragranceEffect: 'Légèrement purifiant et frais'
      },
      traditionalUses: {
        gel: 'Utilisé pour apaiser les coups de soleil, les brûlures légères et les irritations cutanées.',
        juice: 'Consommé pour favoriser une digestion saine.',
        cosmetic: 'Ingrédient populaire dans les produits pour la peau et les cheveux.'
      },
      culturalSignificance: 'Utilisé dans la médecine traditionnelle égyptienne comme "plante de l’immortalité".',
      wellBeing: {
        skinCare: 'Aide à réduire les inflammations et hydrate intensément.',
        digestion: 'Améliore la santé intestinale grâce à ses enzymes naturelles.',
        detox: 'Contribue à éliminer les toxines du corps.'
      },
      funFact: 'L’Aloe Vera est capable de survivre plusieurs semaines sans eau grâce à sa capacité à stocker l’humidité dans ses feuilles.'
    },
    {
      id: '3',
      name: 'Lavande',
      scientificName: 'Lavandula angustifolia',
      description: 'La lavande est une plante aromatique emblématique des régions méditerranéennes, connue pour son parfum relaxant et ses nombreuses vertus thérapeutiques.',
      sunshine: 'Plein soleil',
      difficulty: 'Facile',
      image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg',
      position: [43.9493, 5.7727],
      location: 'Plateau de Valensole, France',
      characteristics: {
        minerals: ['Fer', 'Magnésium'],
        vitamins: ['Vitamine C'],
        antioxidants: ['Linalool', 'Linalyl acétate'],
        therapeuticUses: ['Réduit le stress', 'Améliore le sommeil', 'Apaise les maux de tête'],
        fragranceEffect: 'Relaxant et équilibrant'
      },
      traditionalUses: {
        tea: 'Préparée pour apaiser l’esprit et favoriser un sommeil réparateur.',
        essentialOil: 'Utilisée en aromathérapie pour soulager l’anxiété et la tension.',
        sachets: 'Placée dans les armoires pour parfumer et éloigner les insectes.'
      },
      culturalSignificance: 'Symbole de pureté et de calme dans les cultures méditerranéennes.',
      wellBeing: {
        stressRelief: 'Son arôme aide à réduire l’anxiété et à calmer l’esprit.',
        sleepAid: 'Favorise un sommeil profond et réparateur.',
        insectRepellent: 'Naturellement efficace contre les moustiques et autres nuisibles.'
      },
      funFact: 'Les Romains utilisaient la lavande pour parfumer leurs bains publics et leurs vêtements.'
    },
    {
      id: '4',
      name: 'Menthe',
      scientificName: 'Mentha spicata',
      description: 'La menthe est une plante vivace appréciée pour sa fraîcheur et son arôme revigorant. Elle est largement utilisée en cuisine et en médecine traditionnelle.',
      sunshine: 'Mi-ombre',
      difficulty: 'Facile',
      image: 'https://images.pexels.com/photos/1024419/pexels-photo-1024419.jpeg',
      position: [41.9028, 12.4964],
      location: 'Villa d\'Este, Rome',
      characteristics: {
        minerals: ['Potassium', 'Fer'],
        vitamins: ['Vitamine A', 'Vitamine C'],
        antioxidants: ['Menthol', 'Rosmarinic acid'],
        therapeuticUses: ['Favorise la digestion', 'Apaise les douleurs musculaires', 'Combat les nausées'],
        fragranceEffect: 'Revitalisant et purifiant'
      },
      traditionalUses: {
        tea: 'Infusion populaire pour calmer l’estomac et rafraîchir l’haleine.',
        oil: 'Utilisée pour apaiser les douleurs musculaires et les maux de tête.',
        culinary: 'Ajoutée aux plats et boissons pour une touche de fraîcheur.'
      },
      culturalSignificance: 'Associée à l’hospitalité dans de nombreuses cultures.',
      wellBeing: {
        digestion: 'Réduit les ballonnements et favorise la santé intestinale.',
        freshness: 'Rafraîchit l’esprit et stimule la concentration.',
        painRelief: 'Efficace contre les douleurs légères grâce à ses propriétés analgésiques.'
      },
      funFact: 'La menthe est une plante si robuste qu’elle peut envahir tout un jardin si elle n’est pas contenue.'
    },
    {
      id: '5',
      name: 'Camomille',
      scientificName: 'Matricaria chamomilla',
      description: 'La camomille est une plante douce et apaisante, souvent utilisée en infusion pour ses propriétés relaxantes et digestives.',
      sunshine: 'Plein soleil',
      difficulty: 'Facile',
      image: 'https://images.pexels.com/photos/169538/pexels-photo-169538.jpeg',
      position: [52.5200, 13.4050],
      location: 'Berlin Botanical Gardens',
      characteristics: {
        minerals: ['Phosphore', 'Potassium'],
        vitamins: ['Vitamine A'],
        antioxidants: ['Apigénine', 'Flavonoïdes'],
        therapeuticUses: ['Soulage les insomnies', 'Calme les inflammations', 'Aide à la digestion'],
        fragranceEffect: 'Apaisant et légèrement sucré'
      },
      traditionalUses: {
        tea: 'Infusion classique pour se détendre et favoriser le sommeil.',
        skin: 'Préparée en lotion pour apaiser les irritations cutanées.',
        aromatherapy: 'Utilisée pour réduire l’anxiété et favoriser un sentiment de bien-être.'
      },
      culturalSignificance: 'Connue comme "la médecine des plantes" dans les traditions européennes.',
      wellBeing: {
        relaxation: 'Favorise un état de calme et réduit l’anxiété.',
        digestion: 'Apaise les troubles gastriques légers.',
        skinCare: 'Réduit les rougeurs et calme les inflammations.'
      },
      funFact: 'Les anciens Égyptiens considéraient la camomille comme sacrée et l’offraient à leurs dieux.'
    },
    {
      id: '6',
      name: 'Fougère',
      scientificName: 'Polypodiopsida',
      description: 'La fougère est une plante luxuriante qui évoque une ambiance tropicale. Ses frondes délicates apportent une touche de fraîcheur et d’élégance dans les espaces ombragés.',
      sunshine: 'Ombre ou lumière indirecte',
      difficulty: 'Modérée',
      image: 'https://images.pexels.com/photos/1964869/pexels-photo-1964869.jpeg',
      position: [48.8417, 2.3519],
      location: 'Parc Montsouris',
      characteristics: {
        minerals: ['Magnésium', 'Fer'],
        vitamins: [],
        antioxidants: [],
        therapeuticUses: ['Purifie l’air ambiant', 'Favorise l’humidité dans l’espace'],
        fragranceEffect: 'Effet naturel et apaisant'
      },
      traditionalUses: {
        indoor: 'Utilisée pour décorer les intérieurs grâce à son feuillage dense.',
        gardens: 'Idéale pour les rocailles ombragées.',
        airPurification: 'Connue pour améliorer la qualité de l’air.'
      },
      culturalSignificance: 'Symbolise la résilience et la vitalité dans plusieurs cultures.',
      wellBeing: {
        airQuality: 'Aide à purifier l’air et à réduire les toxines.',
        stressRelief: 'Apporte une ambiance sereine et apaisante.',
        decor: 'Crée un environnement harmonieux et naturel.'
      },
      funFact: 'Les fougères existent depuis plus de 360 millions d’années et précèdent les plantes à fleurs !'
    },
    {
      id: '7',
      name: 'Orchidée',
      scientificName: 'Orchidaceae',
      description: 'L’orchidée est une fleur exotique et élégante, très appréciée pour ses couleurs vibrantes et sa beauté unique. Elle symbolise la beauté et l’élégance.',
      sunshine: 'Lumière indirecte',
      difficulty: 'Difficile',
      image: 'https://images.pexels.com/photos/1415807/orchid-flower-beautiful-flower-1415807.jpeg',
      position: [48.8599, 2.3073],
      location: 'Jardin des Serres d’Auteuil',
      characteristics: {
        minerals: ['Calcium', 'Magnésium'],
        vitamins: ['Vitamine C'],
        antioxidants: ['Polyphénols', 'Flavonoïdes'],
        fragranceEffect: 'Soutien émotionnel et apaisant',
        therapeuticUses: ['Aide à améliorer la concentration', 'Soulage la fatigue mentale', 'Stimule les capacités cognitives']
      },
      traditionalUses: {
        tea: 'Certaines espèces d’orchidées sont utilisées dans des tisanes pour leurs propriétés énergisantes.',
        essentialOil: 'L\'huile essentielle d\'orchidée est utilisée pour ses propriétés relaxantes et régénératrices.',
        cosmetic: 'L’extrait d’orchidée est utilisé dans des produits de soin pour ses propriétés hydratantes et anti-âge.'
      },
      culturalSignificance: 'L’orchidée est un symbole de beauté, de sophistication et de luxe dans de nombreuses cultures.',
      wellBeing: {
        stressRelief: 'Sa fragrance subtile aide à réduire les niveaux de stress et favorise la relaxation.',
        moodEnhancer: 'Stimule la créativité et améliore l’humeur générale.',
        skinCare: 'Les extraits d’orchidée nourrissent et rajeunissent la peau, en la laissant douce et éclatante.'
      },
      funFact: 'Les orchidées peuvent vivre plusieurs années et certaines espèces sont connues pour leur capacité à se multiplier facilement dans les conditions appropriées.'
    },
    {
      id: '8',
      name: 'Bambou',
      scientificName: 'Bambusoideae',
      description: 'Le bambou est une plante robuste et élégante, idéale pour créer des haies ou décorer les jardins zen. Sa croissance rapide en fait une plante unique.',
      sunshine: 'Mi-ombre',
      difficulty: 'Modérée',
      image: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
      position: [48.8673, 2.3700],
      location: 'Parc des Buttes-Chaumont',
      characteristics: {
        minerals: ['Silice', 'Calcium'],
        vitamins: [],
        antioxidants: [],
        therapeuticUses: ['Atténue les tensions grâce à son ambiance relaxante'],
        fragranceEffect: 'Zen et rafraîchissant'
      },
      traditionalUses: {
        construction: 'Utilisé pour construire des structures légères et durables.',
        decor: 'Apporte une touche asiatique et naturelle aux jardins.',
        erosionControl: 'Protège le sol de l’érosion grâce à ses racines denses.'
      },
      culturalSignificance: 'Considéré comme un symbole de longévité et de force en Asie.',
      wellBeing: {
        relaxation: 'Crée un environnement paisible pour la méditation.',
        ecoFriendly: 'Contribue à une culture durable grâce à sa croissance rapide.',
        aesthetics: 'Idéal pour les espaces extérieurs zen ou modernes.'
      },
      funFact: 'Certaines variétés de bambou peuvent pousser jusqu’à un mètre par jour.'
    },
    {
      id: '9',
      name: 'Tulipe',
      scientificName: 'Tulipa',
      description: 'Symbole du printemps, la tulipe est une fleur éclatante aux multiples couleurs qui égaye les jardins avec sa beauté intemporelle.',
      sunshine: 'Plein soleil',
      difficulty: 'Modérée',
      image: 'https://images.pexels.com/photos/68178/tulips-flowers-garden-colorful-68178.jpeg',
      position: [48.8539, 2.2944],
      location: 'Champ de Mars',
      characteristics: {
        minerals: [],
        vitamins: [],
        antioxidants: [],
        therapeuticUses: ['Apporte une sensation de joie et de renouveau'],
        fragranceEffect: 'Subtil et printanier'
      },
      traditionalUses: {
        bouquets: 'Très prisée pour les arrangements floraux.',
        celebrations: 'Offerte en symbole d’amour ou d’amitié.',
        festivals: 'Fleur emblématique de nombreux festivals printaniers.'
      },
      culturalSignificance: 'Appréciée pour son rôle central dans la "tulipomanie" du XVIIe siècle.',
      wellBeing: {
        moodBoost: 'Élève l’humeur avec ses couleurs vives.',
        decoration: 'Idéale pour orner jardins et intérieurs.',
        natureConnection: 'Favorise un lien avec la nature au printemps.'
      },
      funFact: 'La tulipe est originaire de Turquie et a été importée en Europe au XVIe siècle.'
    },
    {
      id: '10',
      name: 'Lys',
      scientificName: 'Lilium',
      description: 'Avec ses grandes fleurs parfumées, le lys incarne l’élégance et la pureté. Il est parfait pour décorer les jardins et les intérieurs.',
      sunshine: 'Mi-ombre',
      difficulty: 'Modérée',
      image: 'https://images.pexels.com/photos/615350/lily-flower-plant-garden-615350.jpeg',
      position: [48.8662, 2.3182],
      location: 'Parc Monceau',
      characteristics: {
        minerals: [],
        vitamins: [],
        antioxidants: [],
        therapeuticUses: ['Améliore l’humeur grâce à son parfum doux'],
        fragranceEffect: 'Élégant et floral'
      },
      traditionalUses: {
        religious: 'Utilisé comme symbole de pureté dans l’art et la religion.',
        gifts: 'Souvent offert lors de mariages ou d’événements religieux.',
        gardens: 'Apporte une touche majestueuse aux espaces extérieurs.'
      },
      culturalSignificance: 'Symbole de la royauté dans l’héraldique française.',
      wellBeing: {
        moodEnhancement: 'Son parfum stimule les émotions positives.',
        decor: 'Évoque un sentiment de sérénité et de luxe.',
        tradition: 'Reflète des valeurs de noblesse et de pureté.'
      },
      funFact: 'Le lys blanc est souvent associé à la Vierge Marie dans la tradition chrétienne.'
    },
    {
      id: '11',
      name: 'Hortensia',
      scientificName: 'Hydrangea',
      description: 'L’hortensia est un arbuste florissant dont les couleurs varient selon le pH du sol, allant du bleu au rose.',
      sunshine: 'Mi-ombre',
      difficulty: 'Modérée',
      image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg',
      position: [48.8461, 2.2738],
      location: 'Parc André Citroën',
      characteristics: {
        minerals: ['Aluminium (selon le sol)'],
        vitamins: [],
        antioxidants: [],
        therapeuticUses: ['Apaisant pour les yeux grâce à ses couleurs douces'],
        fragranceEffect: 'Léger et subtil'
      },
      traditionalUses: {
        landscaping: 'Idéal pour créer des massifs colorés.',
        cutFlowers: 'Utilisé dans les bouquets pour sa longévité.',
        gardens: 'Favorise un charme rustique ou sophistiqué.'
      },
      culturalSignificance: 'Considéré comme un symbole de gratitude et de beauté.'
    },    
    
];
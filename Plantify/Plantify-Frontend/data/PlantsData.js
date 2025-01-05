export const PLANTS_DATA = [
    {
      id: '1',
      name: 'Rose',
      scientificName: 'Rosa × odorata',
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
      image: 'https://img.freepik.com/premium-photo/aloe-vera-leaf-hd-stock-photographic-image-with-drops-water-gel-herbal-medecine_820616-1419.jpg',
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
      image: 'https://www.creativefabrica.com/wp-content/uploads/2022/12/16/Lavender-Photography-HDR-HD-8K-4K-1080p-Sharp-Focus-55mm-52729637-1.png',
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
      image: 'https://www.shutterstock.com/shutterstock/videos/3445557255/thumb/1.jpg',
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
      image: 'https://img.freepik.com/photos-premium/macro-champ-camomille_97070-864.jpg',
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
      image: 'https://media.istockphoto.com/id/655052762/fr/photo/vert-foug%C3%A8re.jpg?s=612x612&w=0&k=20&c=OWUCTCq4x639Kgb6DsALpncGulRPB3DgFmBf7zMPGlg=',
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
      image: 'https://cdn.pixabay.com/photo/2023/02/04/21/32/flowers-7768218_640.jpg',
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
      image: 'https://png.pngtree.com/background/20230513/original/pngtree-close-up-shot-of-a-bamboo-forest-picture-image_2507777.jpg',
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
      image: 'https://png.pngtree.com/thumb_back/fh260/background/20230724/pngtree-tv-wallpaper-pink-tulips-wallpapers-image_10176785.jpg',
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
      image: 'https://media.istockphoto.com/id/105813631/fr/photo/lys-blanc-dans-un-jardin.jpg?s=612x612&w=0&k=20&c=Vcp397EmXefWLiG1wp43KWFbgTTIwpGPf21BL-XCimY=',
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
      image: 'https://img.freepik.com/photos-premium/fleurs-hortensia-bleu-bouchent_196038-693.jpg',
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

      {
        id: '12',
        name: 'Purple Dome',
        scientificName: 'Aster novae-angliae',
        description: 'Le Purple Dome est une variété d\'aster compact et robuste, particulièrement apprécié pour sa floraison abondante de couleur violette intense qui illumine les jardins en fin de saison.',
        sunshine: 'Plein soleil',
        difficulty: 'Facile',
        image: 'https://gardengoodsdirect.com/cdn/shop/files/aster-woods-purple-29777631739946_grande.jpg?v=1695417540',
        position: [48.8566, 2.3522],
        location: 'Jardin des Plantes, Paris',
        characteristics: {
          minerals: ['Fer', 'Calcium'],
          vitamins: [],
          antioxidants: ['Flavonoïdes'],
          therapeuticUses: ['Attire les pollinisateurs', 'Améliore la biodiversité du jardin'],
          fragranceEffect: 'Délicat et herbacé'
        },
        traditionalUses: {
          gardens: 'Excellent pour les massifs et bordures automnales',
          bouquets: 'Apprécié en fleurs coupées pour sa longue tenue',
          pollinator: 'Attire les papillons et les abeilles'
        },
        culturalSignificance: 'Symbolise l\'élégance et la persévérance dans le langage des fleurs',
        wellBeing: {
          gardenHealth: 'Contribue à la biodiversité du jardin',
          aesthetics: 'Apporte une touche de couleur vibrante en fin de saison',
          wildlife: 'Soutient la faune locale, notamment les pollinisateurs'
        },
        funFact: 'Contrairement à beaucoup d\'autres asters, le Purple Dome reste compact et n\'a pas besoin d\'être tuteuré'
      },
      {
        id: '13',
        name: 'Jonquille',
        scientificName: 'Narcissus jonquilla',
        description: 'La jonquille est l\'un des premiers messagers du printemps, avec ses fleurs jaunes éclatantes et parfumées qui émergent dès la fin de l\'hiver.',
        sunshine: 'Plein soleil à mi-ombre',
        difficulty: 'Facile',
        image: 'https://media.istockphoto.com/id/1176574947/fr/photo/fleurs-jaunes-de-jonquille.jpg?s=612x612&w=0&k=20&c=ADY7FnrCfo7mhjD2uKL_DpHkvIhQgtxmt3YselQitQw=',
        position: [48.8661, 2.3125],
        location: 'Parc de Bagatelle, Paris',
        characteristics: {
          minerals: ['Calcium', 'Potassium'],
          vitamins: [],
          antioxidants: [],
          therapeuticUses: ['Symbole du renouveau printanier'],
          fragranceEffect: 'Doux et printanier'
        },
        traditionalUses: {
          celebrations: 'Symbole traditionnel du printemps et du renouveau',
          gardens: 'Excellente pour la naturalisation dans les pelouses',
          cutFlowers: 'Populaire en bouquets printaniers'
        },
        culturalSignificance: 'Représente l\'espoir et le renouveau dans de nombreuses cultures',
        wellBeing: {
          moodBoost: 'Les couleurs vives stimulent l\'optimisme',
          seasonalMarker: 'Annonce l\'arrivée du printemps',
          fragrance: 'Son parfum délicat évoque la fraîcheur printanière'
        },
        funFact: 'Les bulbes de jonquilles contiennent des substances toxiques qui les protègent naturellement des rongeurs'
      },
      {
        id: '14',
        name: 'Jacinthe',
        scientificName: 'Hyacinthus orientalis',
        description: 'La jacinthe est une plante bulbeuse réputée pour ses fleurs parfumées en forme de grappe et sa palette de couleurs variées.',
        sunshine: 'Plein soleil à mi-ombre',
        difficulty: 'Modérée',
        image: 'https://images.ctfassets.net/b85ozb2q358o/95dd345e42affef5d6f6387dcde452fb1be0f9a51863a3fa605a023940ea62b9/9746b55f9623bf93850dffe214848276/quand-comment-planter-bulbes-fleurs-4.jpg',
        position: [48.8462, 2.3372],
        location: 'Jardin du Luxembourg, Paris',
        characteristics: {
          minerals: ['Phosphore', 'Potassium'],
          vitamins: [],
          antioxidants: [],
          therapeuticUses: ['Aromathérapie naturelle', 'Améliore l\'ambiance'],
          fragranceEffect: 'Intense et suave'
        },
        traditionalUses: {
          indoor: 'Populaire pour le forçage en intérieur',
          gardens: 'Création de bordures parfumées',
          aromatherapy: 'Utilisée pour son parfum apaisant'
        },
        culturalSignificance: 'Symbole du printemps et de la renaissance dans la mythologie grecque',
        wellBeing: {
          aromatherapy: 'Le parfum aide à la relaxation',
          seasonal: 'Apporte de la joie pendant la période hivernale',
          decoration: 'Embellit les espaces intérieurs et extérieurs'
        },
        funFact: 'La jacinthe peut être forcée à fleurir en hiver sur un simple vase d\'eau'
      },
      {
        id: '15',
        name: 'Jasmin jaune',
        scientificName: 'Jasminum nudiflorum',
        description: 'Le jasmin d\'hiver est un arbuste grimpant qui fleurit en plein hiver, apportant une touche de couleur dorée quand la plupart des plantes sont en dormance.',
        sunshine: 'Plein soleil à mi-ombre',
        difficulty: 'Facile',
        image: 'https://resize.elle.fr/article/var/plain_site/storage/images/deco/exterieur/jardin/le-jasmin-d-hiver-couleur-et-parfum-en-hiver-4191280/101392595-1-fre-FR/Le-jasmin-d-hiver-couleur-et-parfum-en-hiver.jpg',
        position: [48.8810, 2.3488],
        location: 'Parc Monceau, Paris',
        characteristics: {
          minerals: ['Fer', 'Magnésium'],
          vitamins: [],
          antioxidants: [],
          therapeuticUses: ['Égaye l\'ambiance hivernale'],
          fragranceEffect: 'Subtil et doux'
        },
        traditionalUses: {
          landscaping: 'Excellent pour couvrir les murs et treillages',
          winterGarden: 'Apporte de la couleur en hiver',
          decoration: 'Utilisé pour les décorations hivernales'
        },
        culturalSignificance: 'Symbole de joie et d\'optimisme en période hivernale',
        wellBeing: {
          winterCheer: 'Combat la morosité hivernale',
          gardenInterest: 'Maintient la vie au jardin en hiver',
          aesthetics: 'Crée des points focaux dorés dans le jardin'
        },
        funFact: 'Cette plante peut fleurir même sous la neige, d\'où son surnom de "soleil d\'hiver"'
      },
      {
        id: '16',
        name: 'Bruyère',
        scientificName: 'Erica',
        description: 'La bruyère est une plante rustique qui offre des fleurs colorées pendant l\'hiver, idéale pour les jardins de rocaille et les massifs.',
        sunshine: 'Plein soleil à mi-ombre',
        difficulty: 'Modérée',
        image: 'https://blog.rouepepinieres.com/hs-fs/hubfs/Erica-Eva-gold-bruy%C3%A8re-couvre-sol.jpg?width=1000&height=667&name=Erica-Eva-gold-bruy%C3%A8re-couvre-sol.jpg',
        position: [48.8232, 2.4365],
        location: 'Jardin des Serres d\'Auteuil, Paris',
        characteristics: {
          minerals: ['Fer', 'Calcium'],
          vitamins: [],
          antioxidants: [],
          therapeuticUses: ['Décorative et couvre-sol'],
          fragranceEffect: 'Léger et boisé'
        },
        traditionalUses: {
          groundcover: 'Excellent couvre-sol pour zones acides',
          winterColor: 'Apporte de la couleur en hiver',
          landscaping: 'Idéal pour les jardins de rocaille'
        },
        culturalSignificance: 'Symbolise la solitude et la protection dans le folklore écossais',
        wellBeing: {
          lowMaintenance: 'Facile à entretenir une fois établie',
          yearRound: 'Procure un intérêt visuel toute l\'année',
          wildlife: 'Attire les abeilles et les papillons'
        },
        funFact: 'La bruyère peut survivre dans des conditions extrêmes et pousse naturellement sur les landes et les sols pauvres'
      },
     
    
];
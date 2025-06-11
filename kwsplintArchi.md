# Architecture actuelle de kwhsplint

## Structure complète du projet avec tous les fichiers existants

```
/kwhsplint
├── /android                                    # Configuration Android
│   ├── /app
│   │   ├── build.gradle                       # Configuration build Android
│   │   └── /src/main/java/com/kwhsplint
│   │       ├── MainActivity.kt                # Activité principale Android
│   │       └── MainApplication.kt             # Application principale Android
│   └── gradlew.bat                            # Script Gradle Windows
├── /ios                                       # Configuration iOS
│   ├── /kwhsplint
│   │   ├── AppDelegate.swift                  # Délégué d'application iOS
│   │   ├── Images.xcassets                   # Assets images iOS
│   │   ├── Info.plist                        # Configuration iOS
│   │   ├── LaunchScreen.storyboard           # Écran de lancement
│   │   └── PrivacyInfo.xcprivacy             # Informations de confidentialité
│   ├── kwhsplint.xcodeproj                   # Projet Xcode
│   └── Podfile                               # Dépendances CocoaPods
├── /app                                      # Code source principal
│   ├── /core                                 # Couche métier (Clean Architecture)
│   │   ├── /data                            # Couche données
│   │   │   ├── /datasources
│   │   │   │   ├── AuthDataSource.ts        # Interface source données auth
│   │   │   │   └── FirebaseAuthDataSource.ts # Implémentation Firebase auth
│   │   │   ├── /repositories
│   │   │   │   ├── AuthRepositoryImpl.ts    # Implémentation repository auth
│   │   │   │   └── ReadingRepositoryImpl.ts # Implémentation repository relevés
│   │   │   └── /services
│   │   │       └── GeocodingService.ts      # Service de géocodage
│   │   ├── /domain                          # Entités et règles métier
│   │   │   ├── /entities
│   │   │   │   ├── Reading.ts               # Entité relevé de compteur
│   │   │   │   └── User.ts                  # Entité utilisateur
│   │   │   ├── /repositories
│   │   │   │   ├── AuthRepository.ts        # Interface repository auth
│   │   │   │   └── ReadingRepository.ts     # Interface repository relevés
│   │   │   ├── /types
│   │   │   │   └── FormValues.ts            # Types pour formulaires
│   │   │   └── /usecases                    # Cas d'usage métier
│   │   │       ├── AddReadingUseCase.ts     # Ajouter un relevé
│   │   │       ├── CalculateAmountToPayUseCase.ts # Calculer montant à payer
│   │   │       ├── GetHistoryUseCase.ts     # Obtenir historique
│   │   │       ├── GetTwoLastHistoryUseCase.ts # Obtenir 2 derniers relevés
│   │   │       └── /user                    # Cas d'usage utilisateur
│   │   │           ├── GetCurrentUserUseCase.ts # Obtenir utilisateur actuel
│   │   │           ├── SignInUseCase.ts     # Connexion
│   │   │           ├── SignOutUseCase.ts    # Déconnexion
│   │   │           └── SignUpUseCase.ts     # Inscription
│   │   └── /utils                           # Utilitaires métier
│   │       ├── dateUtils.ts                 # Utilitaires de date
│   │       └── readingToPlainObject.ts      # Conversion relevé
│   ├── /infrastructure                      # Couche infrastructure
│   │   ├── /services
│   │   │   └── NominatimGeocodingService.ts # Service géocodage Nominatim
│   │   └── /storage
│   │       ├── FirebaseService.ts           # Service Firebase
│   │       ├── migrations.ts                # Migrations base de données
│   │       └── SQLiteService.ts             # Service SQLite
│   ├── /presentation                        # Couche présentation (UI)
│   │   ├── /components                      # Composants réutilisables
│   │   │   ├── Layout.tsx                   # Layout principal
│   │   │   └── /ui                          # Composants UI de base
│   │   │       ├── Button.tsx               # Bouton générique
│   │   │       ├── FormButton.tsx           # Bouton de formulaire
│   │   │       ├── FormHeader.tsx           # En-tête de formulaire
│   │   │       ├── FormInput.tsx            # Input de formulaire
│   │   │       ├── GeoLocationInfo.tsx      # Info géolocalisation
│   │   │       └── Input.tsx                # Input générique
│   │   ├── /hooks                           # Hooks React personnalisés
│   │   │   ├── useCalculateAmountToPay.ts   # Hook calcul montant
│   │   │   ├── useReadingHistory.ts         # Hook historique relevés
│   │   │   └── useReadingRepository.ts      # Hook repository relevés
│   │   ├── /navigation                      # Navigation de l'app
│   │   │   ├── AppNavigator.tsx             # Navigateur principal
│   │   │   ├── /ref
│   │   │   │   └── navigationRef.ts         # Référence navigation
│   │   │   └── /types
│   │   │       └── navigationType.ts        # Types navigation
│   │   ├── /screens                         # Écrans de l'application
│   │   │   ├── AuthScreen.tsx               # Écran d'authentification
│   │   │   ├── Consumption.tsx              # Écran consommation
│   │   │   ├── History.tsx                  # Écran historique
│   │   │   ├── HomeScreen.tsx               # Écran d'accueil
│   │   │   ├── Setting.tsx                  # Écran paramètres
│   │   │   ├── SignInScreen.tsx             # Écran connexion
│   │   │   ├── SignUpScreen.tsx             # Écran inscription
│   │   │   ├── Statistic.tsx                # Écran statistiques
│   │   │   ├── /form
│   │   │   │   └── ReadingForm.tsx          # Formulaire de relevé
│   │   │   ├── /houses
│   │   │   │   ├── ConsumptionCard.tsx      # Carte consommation maison
│   │   │   │   ├── HouseProfileCard.tsx     # Carte profil maison
│   │   │   │   └── SearchBar.tsx            # Barre de recherche
│   │   │   ├── /list
│   │   │   │   ├── MeterEmptyList.tsx       # Liste vide compteurs
│   │   │   │   └── MeterList.tsx            # Liste compteurs
│   │   │   └── /skeleton
│   │   │       ├── SkeletonCard.tsx         # Skeleton carte
│   │   │       └── SkeletonSearchBar.tsx    # Skeleton barre recherche
│   │   └── /state                           # Gestion d'état présentation
│   │       └── /redux                       # Redux store
│   │           ├── /middlewares
│   │           │   └── navigationMiddleware.ts # Middleware navigation
│   │           ├── /selectors
│   │           │   └── authSelectors.ts     # Sélecteurs auth
│   │           ├── /slices
│   │           │   └── authSlice.ts         # Slice auth
│   │           └── /store
│   │               ├── readingSlice.ts      # Slice relevés
│   │               └── store.ts             # Store principal
│   └── /state                               # Gestion d'état globale
│       └── /context                         # Contextes React
│           └── /styles                      # Styles globaux
│               ├── colors.ts                # Couleurs
│               ├── styles.js                # Styles généraux
│               └── typography.ts            # Typographie
├── /public                                  # Assets publics
│   └── /images
│       └── default.jpg                      # Image par défaut
├── /__tests__                               # Tests
│   └── App.test.tsx                        # Tests du composant App
├── App.tsx                                 # Composant racine
├── index.js                                # Point d'entrée React Native
├── app.json                                # Configuration React Native
├── babel.config.js                         # Configuration Babel
├── jest.config.js                          # Configuration Jest
├── metro.config.js                         # Configuration Metro bundler
├── tsconfig.json                           # Configuration TypeScript
├── package.json                            # Dépendances npm
├── package-lock.json                       # Lock des dépendances
├── Gemfile                                 # Dépendances Ruby (iOS)
├── my-release-key.keystore                 # Clé de signature Android
└── README.md                               # Documentation
```

## Architecture Clean implémentée

### Fonctionnalités développées :

**Authentification :**
- Inscription/Connexion utilisateur
- Gestion session Firebase
- Déconnexion

**Gestion des relevés :**
- Ajout de relevés de compteur
- Historique des relevés
- Calcul de consommation et montant à payer
- Géolocalisation des compteurs

**Interface utilisateur :**
- Écrans d'authentification
- Tableau de bord principal
- Formulaires de saisie
- Historique et statistiques
- Gestion des maisons/compteurs
- Composants skeleton pour le loading

**Services techniques :**
- Base de données SQLite locale
- Synchronisation Firebase
- Géocodage avec Nominatim
- Navigation React Navigation
- État global avec Redux

### Technologies utilisées :
- **Frontend** : React Native, TypeScript
- **État** : Redux Toolkit
- **Navigation** : React Navigation
- **Base de données** : SQLite (local) + Firebase (cloud)
- **Authentification** : Firebase Auth
- **Géolocalisation** : Nominatim
- **Tests** : Jest
- **Plateformes** : Android (Kotlin), iOS (Swift)

### Architecture Clean respectée :
- **Domain** : Entités, cas d'usage, interfaces (47 fichiers)
- **Data** : Implémentations repositories, sources données (5 fichiers)
- **Infrastructure** : Services externes, stockage (4 fichiers)
- **Presentation** : UI, écrans, composants, hooks (32 fichiers)

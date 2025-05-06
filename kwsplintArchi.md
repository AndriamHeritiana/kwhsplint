/app
├── /core
│   ├── /domain
│   │   ├── /entities
│   │   │   ├── Reading.ts
│   │   │   ├── Setting.ts
│   │   ├── /repositories
│   │   │   └── ReadingRepository.ts
│   │   ├── /usecases
│   │   │   ├── AddReadingUseCase.ts
│   │   │   ├── GetHistoryUseCase.ts
│   │   │   ├── CalculateConsumptionUseCase.ts
│   │   │   └── GetAlertsUseCase.ts
│   ├── /data
│   │   ├── /repositories
│   │   │   └── ReadingRepositoryImpl.ts
│   │   ├── /datasources
│   │   │   ├── LocalDataSource.ts
│   │   │   └── RemoteDataSource.ts
│   │   ├── /services
│   │   │   └── OcrService.ts
│   ├── /utils
│   │   ├── DateUtils.ts
│   │   └── ConsumptionCalculator.ts
├── /presentation
│   ├── /screens
│   │   ├── HomeScreen.tsx
│   │   ├── ReadingInputScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── ScanScreen.tsx
│   ├── /components
│   │   ├── /ui
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── Input.tsx
│   │   ├── ReadingForm.tsx
│   │   ├── ConsumptionChart.tsx
│   │   ├── ReadingHistoryItem.tsx
│   │   ├── AlertNotification.tsx
│   ├── /navigation
│   │   ├── AppNavigator.tsx
│   ├── /state
│   │   ├── /redux
│   │   │   ├── store.ts
│   │   │   ├── /slices
│   │   │   │   ├── readingsSlice.ts
│   │   │   │   ├── alertsSlice.ts
│   │   │   ├── /selectors
│   │   │   │   ├── readingsSelectors.ts
│   │   │   │   ├── alertsSelectors.ts
│   │   ├── /context
│   │   │   ├── ThemeContext.tsx
├── /infrastructure
│   ├── /storage
│   │   ├── SQLiteService.ts
│   │   ├── FirebaseService.ts
│   ├── /api
│   │   ├── ApiClient.ts
│   ├── /services
│   │   ├── OcrServiceImpl.ts
├── App.tsx
├── tsconfig.json
├── package.json
├── .eslintrc.js
├── .prettierrc.js
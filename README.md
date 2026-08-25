# 📱 Mobile Starter Template (Expo + React Native + TypeScript)

Plantilla base para aplicaciones móviles modernas construida bajo **Clean Architecture** y principios **SOLID**. Diseñada para iniciar nuevos proyectos en segundos sin repetir configuraciones iniciales.

---

## 🏛️ Arquitectura y Principios SOLID

Esta plantilla divide el código en capas estrictas y desacopladas:

1. **Capa de Dominio & Contratos (`src/core/`):**
   - **DIP (Dependency Inversion):** Define contratos como `IStorageService` y `IApiClient`.
   - **LSP (Liskov Substitution):** Cualquier implementación que cumpla la interfaz es intercambiable.
   - Tipos globales fuertemente tipados para navegación y modelos.

2. **Capa de Infraestructura (`src/services/`):**
   - Implementaciones concretas (`AsyncStorageAdapter`) aisladas de la UI.
   - Prefijo automático de llaves para evitar colisiones entre proyectos.

3. **Capa de Presentación (`src/screens/` y `src/components/`):**
   - **SRP (Single Responsibility):** Cada pantalla divide la vista (`.tsx`) de su lógica de negocio y estado mediante un Hook ViewModel (`useHomeScreen.ts`, `useDetailsScreen.ts`).
   - Componentes UI primitivos reutilizables (`ScreenContainer`, `AppButton`, `AppTextInput`, `AppCard`, `AppHeader`, `AppText`).

4. **Sistema de Diseño y Temas (`src/theme/`):**
   - Tokens de diseño centralizados (colores, tipografía, espaciados, radios).
   - Soporte automático para **Modo Claro / Modo Oscuro / Sistema** con persistencia.
   - Hook `useTheme()` para estilos dinámicos.

5. **Configuración (`src/config/` y `tsconfig.json`):**
   - Path Aliases configurados (`@/components`, `@/screens`, `@/theme`, `@/core`, `@/services`, `@/navigation`, `@/utils`, `@/config`).

---

## 📂 Estructura del Proyecto

```
mobile-starter-template/
├── assets/                       # Iconos y splash base
├── src/
│   ├── config/                   # Configuración y variables de entorno
│   │   ├── env.ts
│   │   └── index.ts
│   ├── core/                     # Capa de Dominio (Interfaces y Tipos)
│   │   ├── interfaces/
│   │   │   ├── IStorageService.ts
│   │   │   └── IApiClient.ts
│   │   ├── types/
│   │   │   ├── navigation.ts
│   │   │   ├── theme.ts
│   │   │   └── common.ts
│   │   └── index.ts
│   ├── services/                 # Capa de Infraestructura (Implementaciones)
│   │   └── storage/
│   │       ├── asyncStorageAdapter.ts
│   │       └── index.ts
│   ├── theme/                    # Tokens de diseño y ThemeProvider
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── ThemeContext.tsx
│   │   ├── useTheme.ts
│   │   └── index.ts
│   ├── components/               # Componentes UI reutilizables
│   │   ├── ScreenContainer.tsx
│   │   ├── AppHeader.tsx
│   │   ├── AppButton.tsx
│   │   ├── AppTextInput.tsx
│   │   ├── AppCard.tsx
│   │   ├── AppText.tsx
│   │   ├── LoadingOverlay.tsx
│   │   └── index.ts
│   ├── navigation/               # React Navigation tipado
│   │   ├── RootNavigator.tsx
│   │   ├── routes.ts
│   │   └── index.ts
│   ├── screens/                  # Pantallas (Vistas limpias + Hooks)
│   │   ├── HomeScreen/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── useHomeScreen.ts
│   │   │   └── index.ts
│   │   ├── DetailsScreen/
│   │   │   ├── DetailsScreen.tsx
│   │   │   ├── useDetailsScreen.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── utils/                    # Formateadores y validadores puros
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── index.ts
│   └── App.tsx                   # Proveedores y punto de entrada
├── app.json                      # Configuración Expo
├── eas.json                      # Configuración EAS Build (APK/iOS)
├── package.json                  # Dependencias base
├── tsconfig.json                 # Path aliases
└── create-app.js                 # Generador de nuevas aplicaciones
```

---

## 🚀 ¿Cómo crear una nueva aplicación a partir de esta plantilla?

### Método 1: Con el script generador local (El más rápido)
Desde la terminal en la carpeta de la plantilla:
```bash
node create-app.js "Mi Nueva App" com.miempresa.minuevaapp
```
Esto creará automáticamente una carpeta nueva `../mi-nueva-app` con todos los archivos copiados, el `app.json`, `package.json` y `env.ts` ya renombrados y listos.

Luego solo ingresas y ejecutas:
```bash
cd ../mi-nueva-app
npm install
npx expo start
```

---

### Método 2: Usar como Plantilla de GitHub
1. Sube esta carpeta `mobile-starter-template` a un repositorio en GitHub (ej. `tu-usuario/expo-starter-template`).
2. En GitHub ve a **Settings** -> marca la casilla **"Template repository"**.
3. Siempre que quieras un proyecto nuevo, ejecutas:
   ```bash
   npx create-expo-app MiNuevaApp --template https://github.com/tu-usuario/expo-starter-template
   ```

---

## 🛠️ Comandos Disponibles

- `npm run start` o `npx expo start` : Inicia el servidor de desarrollo Expo.
- `npm run android` : Inicia en emulador o dispositivo Android.
- `npm run ios` : Inicia en simulador iOS.
- `npx eas build -p android --profile preview` : Genera un APK directo para instalar en Android.

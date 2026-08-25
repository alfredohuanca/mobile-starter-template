#!/usr/bin/env node

/**
 * Script generador de nuevas aplicaciones a partir de la plantilla base.
 * Uso:
 *   node create-app.js <NombreDeLaApp> [BundleIdentifier]
 * Ejemplo:
 *   node create-app.js MiAppDelivery com.miempresa.delivery
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const appName = args[0];
const bundleId = args[1] || `com.app.${(appName || 'myapp').toLowerCase().replace(/[^a-z0-9]/g, '')}`;

if (!appName) {
  console.log('\n❌ Error: Debes proporcionar un nombre para la nueva aplicación.');
  console.log('📌 Uso: node create-app.js <NombreDeLaApp> [BundleId]');
  console.log('📌 Ejemplo: node create-app.js "Mi Tienda" com.tienda.app\n');
  process.exit(1);
}

const slug = appName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const templateDir = __dirname;
const targetDir = path.resolve(templateDir, '..', slug);

console.log(`\n🚀 Creando nueva aplicación: "${appName}"...`);
console.log(`📂 Carpeta destino: ${targetDir}`);
console.log(`📦 Bundle ID: ${bundleId}`);
console.log(`🏷️  Slug: ${slug}\n`);

if (fs.existsSync(targetDir)) {
  console.error(`❌ La carpeta "${targetDir}" ya existe. Por favor elige otro nombre o elimina la carpeta.`);
  process.exit(1);
}

// 1. Copiar archivos excluyendo node_modules y .git
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (src.endsWith('node_modules') || src.endsWith('.git') || src.endsWith('.expo')) return;
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // Evitar copiar el propio script en el destino si no se desea
    fs.copyFileSync(src, dest);
  }
}

try {
  console.log('⏳ Copiando estructura de la plantilla...');
  copyRecursiveSync(templateDir, targetDir);

  // 2. Actualizar app.json
  const appJsonPath = path.join(targetDir, 'app.json');
  if (fs.existsSync(appJsonPath)) {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    appJson.expo.name = appName;
    appJson.expo.slug = slug;
    appJson.expo.ios.bundleIdentifier = bundleId;
    appJson.expo.android.package = bundleId;
    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  }

  // 3. Actualizar package.json
  const packageJsonPath = path.join(targetDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = slug;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // 4. Actualizar src/config/env.ts
  const envPath = path.join(targetDir, 'src', 'config', 'env.ts');
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(/appName: '.*'/, `appName: '${appName}'`);
    envContent = envContent.replace(/storagePrefix: '.*'/, `storagePrefix: '@${slug.replace(/-/g, '_')}_'`);
    fs.writeFileSync(envPath, envContent);
  }

  console.log('✅ Configuración inicial personalizada exitosamente.');
  console.log('\n🎉 ¡Tu nueva app está lista!');
  console.log('────────────────────────────────────────────');
  console.log('Para iniciar tu proyecto:');
  console.log(`  1. cd ..\\${slug}`);
  console.log('  2. npm install');
  console.log('  3. npx expo start');
  console.log('────────────────────────────────────────────\n');
} catch (error) {
  console.error('❌ Ocurrió un error al crear el proyecto:', error);
}

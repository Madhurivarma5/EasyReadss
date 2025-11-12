// Quick script to check if .env is configured correctly
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

try {
  const envPath = join(__dirname, '.env')
  const envContent = readFileSync(envPath, 'utf-8')
  
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ]
  
  console.log('\n🔍 Checking Firebase Configuration...\n')
  
  let allValid = true
  const envVars = {}
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=')
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim()
      }
    }
  })
  
  requiredVars.forEach(varName => {
    const value = envVars[varName]
    if (!value || value.includes('your-') || value === '') {
      console.log(`❌ ${varName}: NOT CONFIGURED (still has placeholder)`)
      allValid = false
    } else {
      // Show first and last few chars for security
      const masked = value.length > 10 
        ? `${value.substring(0, 6)}...${value.substring(value.length - 4)}`
        : '***'
      console.log(`✅ ${varName}: ${masked}`)
    }
  })
  
  console.log('\n')
  if (allValid) {
    console.log('✅ All Firebase variables are configured!')
    console.log('⚠️  Remember to RESTART your dev server if you just updated .env\n')
  } else {
    console.log('❌ Some variables are not configured.')
    console.log('\n📝 To fix this:')
    console.log('1. Go to Firebase Console: https://console.firebase.google.com/')
    console.log('2. Select your project > Project Settings > General')
    console.log('3. Scroll to "Your apps" section and copy the config values')
    console.log('4. Update frontend/.env with your actual Firebase credentials')
    console.log('5. RESTART your dev server (npm run dev)\n')
  }
} catch (error) {
  console.error('❌ Error reading .env file:', error.message)
  console.log('\nMake sure frontend/.env exists and has the correct format.\n')
}


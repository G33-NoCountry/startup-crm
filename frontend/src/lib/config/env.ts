export const env = {
  // Entorno
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // URLs del API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  
  // Configuración de paginación por defecto
  defaultLimit: 10,
} as const;

// Validación de variables requeridas
const requiredEnvVars = ['NEXT_PUBLIC_API_URL'] as const;

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar] && !env.isDevelopment) {
    console.warn(`⚠️  Variable de entorno faltante: ${envVar}`);
  }
});
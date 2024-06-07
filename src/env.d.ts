/// <reference types="vite/client" />
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'; 
        VITE_APP_BASE_API: string; 
      }
    }
  }
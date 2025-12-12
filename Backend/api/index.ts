import app, { startApp } from './app';

// Initialize the app (database connection, etc.)
let isInitialized = false;

async function initialize() {
  if (!isInitialized) {
    await startApp();
    isInitialized = true;
  }
}

// Vercel serverless handler
export default async function handler(req: any, res: any) {
  try {
    // Initialize on first request
    await initialize();
    
    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

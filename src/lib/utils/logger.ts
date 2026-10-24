export const logger = {
  info(message: string, meta?: Record<string, any>) {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] [${timestamp}] ${message}`, meta ? meta : "");
  },

  warn(message: string, meta?: Record<string, any>) {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] [${timestamp}] ${message}`, meta ? meta : "");
  },

  error(message: string, error?: any) {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] [${timestamp}] ${message}`, error ? error : "");
  },
};

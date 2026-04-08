
export const logger = {
  info: (msg: string, meta?: any) => console.log(`[INFO] ${msg}`, meta || ''),
  error: (msg: string, err?: any) => console.error(`[ERROR] ${msg}`, err || ''),
  audit: (node: string, action: string) => console.log(`[AUDIT] Node: ${node} | Action: ${action} | Time: ${Date.now()}`)
};

export const pool = {
  query: async (sql: string, values?: any[]) => {
    // Mock response to bypass PostgreSQL/Supabase and use static fallback config
    if (sql.includes('configured')) {
      return { rows: [{ configured: true }] };
    }
    return {
      rows: [{
        apiKey: "AIzaSyFakeKey1234567890",
        authDomain: "echo-saas.firebaseapp.com",
        projectId: "echo-saas",
        storageBucket: "echo-saas.appspot.com",
        messagingSenderId: "1234567890",
        appId: "1:1234567890:web:abcdef123456"
      }]
    };
  },
  connect: async () => ({
    query: async () => ({ rows: [] }),
    release: () => {}
  }),
  on: () => {}
};

console.log('[DB] PostgreSQL Dependency Bypassed (Using Local Mock Pool)');

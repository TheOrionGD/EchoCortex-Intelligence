
export const dbConfig = {
  url: process.env.DATABASE_URL,
  pool: { max: 10, min: 2 }
};

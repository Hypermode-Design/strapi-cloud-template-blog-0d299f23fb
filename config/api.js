module.exports = {
  rest: {
    defaultLimit: 100,
    maxLimit: 1000,
    withCount: true,
  },
  responses: {
    privateAttributes: ['_v', 'id', 'created_by', 'updated_by'],
  },
  cors: {
    enabled: true,
    origin: ['http://localhost:3000', 'https://fontcert.com'],
    credentials: true,
  },
};

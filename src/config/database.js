module.exports = {
  dialect: "mariadb",
  host: "localhost",
  username: "root",
  password: "...",
  database: "dominando-nodejs",
  define: {
    timestamp: true, // cria duas colunas: createdAt e updatedAt
    underscored: true,
    underscoredAll: true,
  },
};

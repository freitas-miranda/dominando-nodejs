// Precisa da importação porque está da forma antiga e não está usando o sucrase
import "dotenv/config";

module.exports = {
  dialect: "mariadb",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamp: true, // cria duas colunas: createdAt e updatedAt
    underscored: true,
    underscoredAll: true,
  },
};

const express = require("express");
const server = express();

// http://localhost:3000/hello?nome=Felipe&idade=21
// Query params = ?nome=Felipe&idade=21

server.get("/hello", (req, res) => {
  const { nome, idade } = req.query;

  return res.json({
    title: "Hello World",
    message: `Olá ${nome} tudo bem!?`,
    idade: idade
  });
});

// http://localhost:3000/hello/Felipe
// Route params = /hello/:nome

server.get("/hello/:nome", (req, res) => {
  const { nome } = req.params;

  return res.json({
    title: "Hello World",
    message: `Olá ${nome} tudo bem!?`
  });
});

server.listen(3000);

console.log("Servidor escutando na porta 3000");


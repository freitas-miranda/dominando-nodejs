import "dotenv/config";

import app from "./app";

app.listen(process.env.PORT);
console.log("Servidor ouvindo a porta ".concat(process.env.PORT));

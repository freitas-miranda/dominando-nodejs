export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader === "secret") {
    return next();
  }

  return res
    .status(401)
    .json({ error: "O usuário não tem permissão para acessar este recurso." });
};

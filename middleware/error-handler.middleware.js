const erroHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).send({
    message: err.message,
    error: err,
  });
};

export default erroHandler;

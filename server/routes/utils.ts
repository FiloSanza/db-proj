export const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
}
/*
In server.js:
app.use(notFound)
app.use(errorHandler)
*/
function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
/*
  In server.js:
  import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
  */

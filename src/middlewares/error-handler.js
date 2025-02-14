import { CustomApiError } from "../errors/custom-error.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: "Something went wrong. Please try again" });
};

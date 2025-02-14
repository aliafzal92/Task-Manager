class CustomApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (statusCode, message) => {
  return new CustomApiError(statusCode, message);
};

export {createCustomError , CustomApiError};
const createSuccessResponse = (data) => {
  return {
    status: 'ok',
    ...data,
  };
};

const createErrorResponse = (code, message) => {
  return {
    status: 'error',
    error: {
      code,
      message,
    },
  };
};

module.exports = { createSuccessResponse, createErrorResponse };

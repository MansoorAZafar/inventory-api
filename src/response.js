const createSuccessResponse = (data) => {
  return {
    status: 'ok',
    ...data,
  };
};

const createErrorResponse = (code, data) => {
  return {
    status: 'error',
    error: {
      code,
      ...data,
    },
  };
};

module.exports = { createSuccessResponse, createErrorResponse };

const httpStatus = require("http-status-codes");

module.exports = {
    internalServer: async (res, data) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(data);
    },

    forbidden: async (res, data) => {
        res.status(httpStatus.FORBIDDEN).json(data);
    },

    success: async (res, data) => {
        res.status(httpStatus.OK).json(data);
    },

    successEmpty: async (res) => {
        res.status(httpStatus.NO_CONTENT).send();
    },

    unauthorized: async (res, data) => {
        res.status(httpStatus.UNAUTHORIZED).json(data);
    },

    badRequest: async (res, data) => {
        res.status(httpStatus.BAD_REQUEST).json(data);
    },

    notFound: async (res, data) => {
        res.status(httpStatus.NOT_FOUND).json(data);
    },
};

// pagination.middleware.js

const paginationMiddleware = (req, res, next) => {
    // Extract pagination parameters from query string
    const { page = 1, limit = 10 } = req.query;
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    // Calculate skip value based on page and limit
    const skip = (parsedPage - 1) * parsedLimit;

    // Add pagination parameters to request object
    req.pagination = {
        page: parsedPage,
        limit: parsedLimit,
        skip: skip
    };

    next();
};

module.exports = paginationMiddleware;

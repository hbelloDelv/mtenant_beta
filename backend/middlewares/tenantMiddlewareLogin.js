function tenantMiddlewareLogin(req, res, next) {
    const modelName = req.headers['x-company-name'] // modelName is passed as part of the URL path


    // Ensure modelName is provided
    if (!modelName) {
        return res.status(400).json({ message: 'Company ID is required' });
    }

    // Attach the values to the request object for downstream access
    req.modelName = modelName;

    next();
}

module.exports = tenantMiddlewareLogin
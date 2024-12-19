function tenantMiddleware(req, res, next) {
    // Extract companyId from headers (or from query if you prefer)
    const companyId = req.headers['x-tenant-id']; // Or from JWT payload or query parameter
    const modelName = req.headers['x-company-name'] // modelName is passed as part of the URL path

    // Ensure companyId is provided
    if (!companyId) {
        return res.status(400).json({ error: 'Company ID is required' });
    }

    // Ensure modelName is provided
    if (!modelName) {
        return res.status(400).json({ error: 'Compamy model name is required' });
    }

    // Attach the values to the request object for downstream access
    req.companyId = companyId;
    req.modelName = modelName;

    next();
}

module.exports = tenantMiddleware
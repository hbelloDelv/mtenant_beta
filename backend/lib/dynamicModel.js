const mongoose = require('mongoose');


function getDynamicModel(tenantId, modelName, schemaDefinition) {
    const modelNameForTenant = `${tenantId}_${modelName}`; // Combining tenantId and modelName

    // Explicitly set the collection name to avoid pluralization
    const schema = new mongoose.Schema(schemaDefinition, { collection: modelNameForTenant });

    // Check if the model already exists to avoid re-compiling the schema
    return mongoose.models[modelNameForTenant] || mongoose.model(modelNameForTenant, schema);
}

module.exports = getDynamicModel;

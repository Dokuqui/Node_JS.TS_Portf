module.exports = {
    components: {
        schemas: {
            Jewelry: {
                type: 'object',
                properties: {
                    id: { type: 'integer', format: 'int64' },
                    description: { type: 'string' },
                    priceSale: { type: 'number', format: 'double' },
                    priceLocation: { type: 'number', format: 'double' },
                    categoryId: { type:'integer', format: 'int64' }
                }
            }
        }
    }
};
module.exports = {
    components: {
        schemas: {
            Location: {
                type: 'object',
                properties: {
                    idContract: { type: 'integer', format: 'int64' },
                    dateStartRental: { type: 'date' },
                    dateEndRental: { type: 'date' },
                    clientId: { type: 'integer', format: 'int64'},
                    jewelryId: { type:'integer', format: 'int64' }
                }
            }
        }
    }
};
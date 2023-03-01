const { OfficeService } = require('../services/OfficeService');

module.exports = {

    /* A function that is called when the route is called. */
    getAllOffices: async(ctx) => {
        const offices = await OfficeService.getAllOffices();
        ctx.body = offices;
    },

    /* A function that is called when the route is called. */
    getOfficeById: async(ctx) => {
        const office = await OfficeService.getOfficeById(ctx.params.id);
        ctx.body = office;
    },

    /* This is a function that is called when the route is called. */
    getOfficeByAddress: async(ctx) => {
        const office = await OfficeService.getOfficeByAddress(ctx.params.address);
        ctx.body = office;
    },

    /* Creating a new office. */
    createOffice: async(ctx) => {
        const office = await OfficeService.createOffice(ctx.request.body);
        ctx.body = office;
    },

    /* Updating the office. */
    updateOffice: async(ctx) => {
        const office = await OfficeService.updateOffice(ctx.params.id, ctx.request.body);
        ctx.body = office;
    },

    /* Deleting the office. */
    deleteOffice: async(ctx) => {
        const office = await OfficeService.deleteOffice(ctx.params.id);
        ctx.body = office;
    },

    /* This is a function that is called when the route is called. */
    updateOfficeExpiresIn: async(ctx) => {
        const office = await OfficeService.updateOfficeExpiresIn(ctx.params.id, ctx.request.body);
        ctx.body = office;
    },

    /* This is a function that is called when the route is called. */
    checkOfficeExpiration: async(ctx) => {
        const office = await OfficeService.checkOfficeExpiration(ctx.headers);
        ctx.body = office;
    },

    /* This is a function that is called when the route is called. */
    updateExpiresDateOffices: async(ctx) => {
        const offices = await OfficeService.updateExpiresDateOffices(ctx.request.body);
        ctx.body = offices;
    },

    /* This is a function that is called when the route is called. */
    deleteOffices: async(ctx) => {
        const offices = await OfficeService.deleteOffices(ctx.request.body);
        ctx.body = offices;
    },

    /* This is a function that is called when the route is called. */
    checkProviderAddress: async(ctx) => {
        const office = await OfficeService.checkProviderAddress(ctx.request.body);
        ctx.body = office;
    },

    /* This is a function that is called when the route is called. */
    updateStatusWorking: async(ctx) => {
        const office = await OfficeService.updateStatusWorking(ctx.request.body, ctx.headers);
        ctx.body = office;
    }

}
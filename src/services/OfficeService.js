const { Office } = require('../models/Office');

module.exports.OfficeService = {

    /* A function that is called when the route is called. */
    getAllOffices: async() => {
        const offices = await Office.findAll();
        return {
            status: true,
            data: offices
        };
    },

    /* A function that is called when the route is called. */
    getOfficeById: async(id) => {
        const office = await Office.findByPk(id);
        return {
            status: true,
            data: office
        };
    },

    /* This is a function that is called when the route is called. */
    getOfficeByAddress: async(address) => {
        const office = await Office.findOne({
            where: {
                address: address
            }
        });
        if (!office) {
            return {
                status: false,
                message: 'Office not found'
            };
        }
        return {
            status: true,
            data: office
        };
    },

    /* Creating a new office. */
    createOffice: async(params) => {
        const newOffice = await Office.create(params);
        return {
            status: true,
            message: 'Office created',
            data: newOffice
        };
    },

    /* Updating the office. */
    updateOffice: async(id, params) => {
        const updatedOffice = await Office.update(params, {
            where: {
                id: id
            }
        });
        return {
            status: true,
            message: 'Office updated',
            data: updatedOffice
        };
    },

    /* Deleting the office. */
    deleteOffice: async(id) => {
        const deletedOffice = await Office.destroy({
            where: {
                id: id
            }
        });
        return {
            status: true,
            message: 'Office deleted',
            data: deletedOffice
        };
    },

    /* This is a function that is called when the route is called. */
    updateOfficeExpiresIn: async(id, params) => {
        const office = await Office.findByPk(id);
        if (!office) {
            return {
                status: false,
                message: 'Office not found'
            };
        }
        const current_expires_date = new Date(office.expires_in);
        const new_expires_date = current_expires_date.setMonth(current_expires_date.getMonth() + params.expires_in);
        const updatedOffice = await office.update({
            expires_in: new_expires_date
        });
        return {
            status: true,
            message: 'The office was successfully paid for',
            data: updatedOffice
        };
    },

    /* This is a function that is called when the route is called. */
    checkOfficeExpiration: async(address) => {
        const office = await Office.findOne({
            where: {
                address: address
            }
        });
        if (!office) {
            return {
                status: false,
                message: 'Office not found'
            };
        }
        const current_expires_date = new Date(office.expires_in);
        const current_date = new Date();
        if (current_date > current_expires_date) {
            return {
                status: false,
                message: 'The office is not paid for',
                expires_in: office.expires_in
            };
        }
        return {
            status: true,
            message: 'The office is paid for',
            expires_in: office.expires_in
        };
    },

    /* This is a function that is called when the route is called. */
    updateExpiresDateOffices: async(params) => {
        const offices = await Office.findAll({
            where: {
                id: params.offices
            }
        });
        offices.forEach(office => {
            let current_date = new Date(office.expires_in);
            current_date = new Date(current_date.setMonth(current_date.getMonth() + +params.expires_in));
            office.update({
                expires_in: current_date
            });
        });
        return {
            status: true,
            message: 'The offices were successfully paid for'
        };
    },

    /* This is a function that is called when the route is called. */
    deleteOffices: async(params) => {
        const offices = await Office.findAll({
            where: {
                id: params.offices
            }
        });
        offices.forEach(office => {
            office.destroy();
        });
        return {
            status: true,
            message: 'The offices were successfully deleted'
        };
    }

}
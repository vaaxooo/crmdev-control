const { Office } = require('../models/Office');
const { Notification } = require('../models/Notification');

module.exports.NotificationService = {

    /* A function that is called when the route is called. */
    getNotificationsByDomain: async(domain) => {
        const notifications = await Notification.findAll({
            where: {
                domain: domain
            }
        });
        return {
            status: true,
            data: notifications
        };
    },

    /* Creating a new notification. */
    create: async(params) => {
        if (!params.offices || !params.title || !params.message) {
            return {
                status: false,
                message: 'Missing parameters.'
            }
        }
        let offices = params.offices;
        for (let office of offices) {
            office = await Office.findByPk(office);
            if (office) {
                await Notification.create({
                    title: params.title,
                    message: params.message,
                    domain: office.domain
                });
            }
        }
        return {
            status: true,
            message: 'Notifications have been sent to the offices'
        };
    },

    /**
     * This function deletes a notification from the database.
     */
    delete: async(params) => {
        const { id, domain } = params;
        if (!id || !domain) {
            return {
                status: false,
                message: 'Missing parameters.'
            }
        }
        if (!await Notification.findOne({ where: { id: id, domain: domain } })) {
            return {
                status: false,
                message: 'Notification not found.'
            }
        }
        await Notification.destroy({
            where: {
                id: id,
                domain: domain
            }
        });
        return {
            status: true,
            message: 'Notification deleted'
        };
    }

}
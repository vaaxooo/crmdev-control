const { NotificationService } = require('../services/NotificationService');

module.exports = {

    /* A function that is called when a request is made to the server. */
    async getNotificationsByDomain(ctx) {
        const notifications = NotificationService.getNotificationsByDomain(ctx.params.domain);
        ctx.body = notifications;
    },

    /* Creating a new notification. */
    async createNotification(ctx) {
        const notification = await NotificationService.create(ctx.request.body);
        ctx.body = notification;
    },

    /**
     * This function deletes a notification from the database.
     * @param ctx - The context of the request.
     */
    async deleteNotification(ctx) {
        const notification = await NotificationService.delete(ctx.query);
        ctx.body = notification;
    }

}
const { TransactionService } = require('../services/TransactionService');

module.exports = {

    /* A function that is being exported from the TransactionController.js file. It is a function that is
    being called by the TransactionService.js file. */
    async getTransactions(ctx) {
        const transactions = await TransactionService.getTransactions(ctx.params.id);
        ctx.body = transactions;
    },

    /**
     * This function creates a transaction and returns the transaction object.
     * @param ctx - The context of the request.
     */
    async createTransaction(ctx) {
        const transaction = await TransactionService.createTransaction(ctx.request.body);
        ctx.body = transaction;
    }

}
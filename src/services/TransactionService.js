const { Office } = require('../models/Office');
const { Transaction } = require('../models/Transaction');

module.exports.TransactionService = {

    /* A function that is called when the route is called. */
    getTransactions: async(office_id) => {
        const transactions = await Transaction.findAll({
            where: {
                office_id: office_id
            }
        });
        return {
            status: true,
            data: transactions
        };
    },

    /* Creating a transaction. */
    createTransaction: async(transaction) => {
        if (!transaction.office_address || !transaction.wallet || !transaction.amount || !transaction.date) {
            return {
                status: false,
                message: 'Missing required fields.'
            };
        }
        const office = await Office.findOne({
            where: {
                address: transaction.office_address
            }
        })
        if (!office) {
            return {
                status: false,
                message: 'Office not found.'
            };
        }
        await Transaction.create({
            office_id: office.id,
            wallet: transaction.wallet,
            amount: transaction.amount,
            date: transaction.date
        });
        return {
            status: true,
            message: "Transaction created successfully",
        };
    }

}
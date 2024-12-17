// cronJobs/passportCronJob.js
const cron = require('node-cron');
const passportTranService = require('../services/passportService');

cron.schedule('0 0 * * *', async () => {
    console.log('Checking for expired passports...');
    try {
        await passportTranService.checkAndMoveExpiredPassport();
    } catch (error) {
        console.error('Error executing checkAndMoveExpiredPassport:', error);
    }
});
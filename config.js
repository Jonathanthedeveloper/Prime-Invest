const PORT = process.env.PORT || 3000;

// const payoutDuration = 604800000; // 7day
const payoutDuration = 6000; // 6 secs
const starterPercent = 0.02;
const platinumPercent = 0.025;
const premiumPercent = 0.03;
const zenithPercent = 0.04;
const referralEarningPercent = 0.2;


module.exports = { PORT, payoutDuration, starterPercent, platinumPercent, premiumPercent, zenithPercent, referralEarningPercent }
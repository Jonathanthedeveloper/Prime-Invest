const PORT = process.env.PORT || 3000;
const starterDuration = 0.02;
const platinumDuration = 0.025;
const premiumDuration = 0.03;
const zenithDuration = 0.04;
// const payoutDuration = 604800000; // 7day
// const payoutDuration = 300000; // 5mins
const payoutDuration = 60000; // 6 secs
const starterPercent = 0.02;
const platinumPercent = 0.025;
const premiumPercent = 0.03;
const zenithPercent = 0.04;
const referralEarningPercent = 0.1;


module.exports = { PORT, payoutDuration, starterPercent, platinumPercent, premiumPercent, zenithPercent, referralEarningPercent, starterDuration, platinumDuration, premiumDuration, zenithDuration }
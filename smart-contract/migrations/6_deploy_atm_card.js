// eslint-disable-next-line no-undef
const WorkloobATM = artifacts.require("WorkloobATM");

module.exports = async function (deployer) {
  const PLATFORM_WALLET = "0x93893EA64dA1311c2993E08B8d92Db57B657c148"; // Your company’s wallet address
  const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // The actual deployed USDC token contract address on Base

  await deployer.deploy(WorkloobATM, PLATFORM_WALLET, USDC_ADDRESS);
};

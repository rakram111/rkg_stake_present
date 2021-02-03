var TronBeast = artifacts.require("./TronBeast.sol");
module.exports = function (deployer) {
  deployer.deploy(TronBeast,
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY"
  );
};

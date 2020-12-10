var SweezGlobal = artifacts.require("./SweezGlobal.sol");

module.exports = function (deployer) {
  // deployer.deploy(TRXMessages);
  deployer.deploy(SweezGlobal,
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY"
  );

  /* deployer.deploy(TronexSun,
    "TLceGbD5xhujwjKpQPrDtHfeXxQf52eXwN",
    "TAC1DwWiDBGNe1DRj2FKBKaEF5dHzzE7vZ",
    "TDku3ax2nK7qh72ZG5F4tT9qCLtgrYT8ef",
    "TDku3ax2nK7qh72ZG5F4tT9qCLtgrYT8ef"
  ); */
  //deployer.deploy(TrxChain);
};

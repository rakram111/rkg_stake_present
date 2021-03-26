const contractAddress = 'TKgnEfAMQ7vuqiPCKtqLkc4rLMxrrQ2ZUu'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;
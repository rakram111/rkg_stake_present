const contractAddress = 'TU5oYTsq11mp2U9T7jE37feMy14N5YATf1 '

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;
const tokenAddress = 'TP8pbrEDLFgetKrGwWtSzYMFvWGa5jmico'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(tokenAddress)
    },

};

export default utils;
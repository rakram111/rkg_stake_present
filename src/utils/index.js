const contractAddress = 'TGDZQRunDZ7DAZr3k37u79YAYzFUTXqXvK'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
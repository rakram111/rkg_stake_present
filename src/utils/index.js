const contractAddress = 'TQqE9TVcbsKqh7rXxqNP385ZsuVsQ568uN'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
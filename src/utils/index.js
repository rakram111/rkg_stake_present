const contractAddress = 'TTRX6WPpHfV3xDsk1B4Yxo6Ex3aUjsu4vh'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
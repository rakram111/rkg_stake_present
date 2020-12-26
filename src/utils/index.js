const contractAddress = 'TXVDyH2yrpbxNqcNFkj2rrUE1dWPjVErxC'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
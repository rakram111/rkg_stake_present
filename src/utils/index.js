const contractAddress = 'TJQ71SQv1AXqGFdwxiv34cF6diVKFgL4uz'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
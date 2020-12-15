const contractAddress = 'TLxG1Ui4KZgviu4mmAuZkYBxjkoum6H4rq'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
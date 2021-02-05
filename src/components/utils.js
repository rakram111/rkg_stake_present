const contractAddress = 'TQLqnrutAoDbyzCuvTkGA8TYdRihYmsEH7'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;
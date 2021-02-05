const contractAddress = 'TCMEx5QT5DXZNHZ4GmtZrxaYLCUYNreraV'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;
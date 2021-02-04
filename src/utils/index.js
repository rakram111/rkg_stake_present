const contractAddress = 'TGN8Bp3NAVCLcWrVkmLuTHBYibes6JYhZC'
const tbtAddress = 'TGN8Bp3NAVCLcWrVkmLuTHBYibes6JYhZC'

const token_utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(tbtAddress)
    },

};

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
const contractAddress = 'TSZ1YYotLgEwDXFnnEp82fqFa5FQ5KmY12'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
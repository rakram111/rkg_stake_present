const contractAddress = 'TVn7aMQBAEfkAk6JRJUpW3DcTpoQmBoS4Y'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
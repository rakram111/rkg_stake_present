const contractAddress = 'TSd6biB8vSABDHyiu7Qth5P3USdzc7xJhL'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
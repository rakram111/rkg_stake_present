const contractAddress = 'TQyN8i3qxt8eaH3QXzPYTVVeikuzuDZNgn'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;
const tokenAddress = 'TA2EDEgytsPYu27kkZtDpFBz85as8vPqsX'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(tokenAddress)
    },

};

export default utils;
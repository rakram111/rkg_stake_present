<<<<<<< HEAD
const contractAddress = 'TGDZQRunDZ7DAZr3k37u79YAYzFUTXqXvK'
=======
const contractAddress = 'TU5oYTsq11mp2U9T7jE37feMy14N5YATf1 '
>>>>>>> 4e46aaa9338e38d0bf56091e77f0291e67c6923c

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;
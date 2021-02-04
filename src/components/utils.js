const contractAddress = 'TGN8Bp3NAVCLcWrVkmLuTHBYibes6JYhZC'
const tbtAddress = 'TTZZiD4PHpqNBKgCu2vC72HfToUqN62e6Z'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;
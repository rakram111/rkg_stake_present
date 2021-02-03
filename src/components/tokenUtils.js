const tbtAddress = 'TNGEGGLrfSzRSPDKa8HpBUSuH4xVENv89n'

const tokenUtils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(tbtAddress)
    },

};
export default tokenUtils;
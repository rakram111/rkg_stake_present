const contractAddress = 'TCCUraEMQzovWE9BpfD16BRGtMPCi76ZA3'
const tbtAddress = 'TNGEGGLrfSzRSPDKa8HpBUSuH4xVENv89n'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;
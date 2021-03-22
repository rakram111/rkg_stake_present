import React from 'react';
import TronWeb from 'tronweb';
import Utils from 'utils/index.js';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/bootstrap.css";

toast.configure();

const TOKEN_ADDRESS = 'TA2EDEgytsPYu27kkZtDpFBz85as8vPqsX';
//let contract_address = 'TUx4rh6X22oCbmYVaQdSCthCCeerg7bDNq'; 

class Token extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            count: 0,
            getbalanceaddress: '',
            transferaddress: '',
            transferamount: '',
            contractAddress: '',
            contract_address: 'TU5oYTsq11mp2U9T7jE37feMy14N5YATf1 ',
            tokenname: '',
            tokensymbol: '',
            tronwebaddress: '',
            totalSupply: '',
            burnamount: '',
            transferfromfromaddress: '',
            transferfromtoaddress: '',
            transferfromamount: '',
            approvespender: '',
            approveamount: '',
            burnfromfrom: '',
            burnfromamount: '',

            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }

        this.updateGetBalanceInputValue = this.updateGetBalanceInputValue.bind(this)
        this.updateTransferInputValue = this.updateTransferInputValue.bind(this)
        this.updateTransferAmountInputValue = this.updateTransferAmountInputValue.bind(this)
        this.updateContractAddressInput = this.updateContractAddressInput.bind(this)
        this.updateBurnAmountInputValue = this.updateBurnAmountInputValue.bind(this)
        this.updateTansferFrom_FromInputValue = this.updateTansferFrom_FromInputValue.bind(this)
        this.updateTransferFromToInputValue = this.updateTransferFromToInputValue.bind(this)
        this.updateTransferFromAmountInputValue = this.updateTransferFromAmountInputValue.bind(this)
        this.updateApproveSpender = this.updateApproveSpender.bind(this)
        this.updateApproveValue = this.updateApproveValue.bind(this)
        this.updateBurnFromFromValue = this.updateBurnFromFromValue.bind(this)
        this.updateBurnFromAmountValue = this.updateBurnFromAmountValue.bind(this)


        this.buttonTen = this.buttonTen.bind(this);
        this.buttonHundred = this.buttonHundred.bind(this);
        this.button5Hundred = this.button5Hundred.bind(this);
        this.button1Thousand = this.button1Thousand.bind(this);
        this.button10Thousand = this.button10Thousand.bind(this);
        this.button50Thousand = this.button50Thousand.bind(this);
        this.button100Thousand = this.button100Thousand.bind(this);
        this.button500Thousand = this.button500Thousand.bind(this);
        this.reset = this.reset.bind(this);

    }

    async componentDidMount() {

        this.setState({ loading: true })
        await new Promise(resolve => {
            const tronWebState = {
                installed: !!window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if (tronWebState.installed) {
                this.setState({
                    tronWeb:
                        tronWebState
                });

                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if (tries >= 10) {
                    const TRONGRID_API = 'https://api.trongrid.io';

                    window.tronWeb = new TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if (!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if (!this.state.tronWeb.loggedIn) {
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            window.tronWeb.defaultAddress = {
                hex: window.tronWeb.address.toHex(TOKEN_ADDRESS),
                base58: TOKEN_ADDRESS
            };

            window.tronWeb.on('addressChanged', () => {
                if (this.state.tronWeb.loggedIn)
                    return;

                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }
        await this.setState({
            contractAddress: TOKEN_ADDRESS
        });
        console.log('contractAddress : ', this.state.contractAddress);
        await Utils.setTronWeb(window.tronWeb, this.state.contractAddress);
        //const tmp_name = await Utils.contract.name().call();
        const tmp_tronwebaddress = Utils.tronWeb.address.fromHex((((await Utils.tronWeb.trx.getAccount()).address).toString()));
        await this.setState({
            tokenname: await Utils.contract.name().call(),
            tokensymbol: await Utils.contract.symbol().call(),
            totalSupply: ((await Utils.contract.totalSupply().call()).toNumber()) / 1000000,
            tronwebaddress: tmp_tronwebaddress
        });
    }

    ///////////////////////////////// DYNAMIC CONTRACT ADDRESS /////////////////////////
    async updateContractAddressInput(evt) {
        await this.setState({
            contractAddress: evt.target.value
        });
        console.log('contractAddress : ', this.state.contractAddress);
        await Utils.setTronWeb(window.tronWeb, this.state.contractAddress);
        //const tmp_name = await Utils.contract.name().call();
        const tmp_tronwebaddress = Utils.tronWeb.address.fromHex((((await Utils.tronWeb.trx.getAccount()).address).toString()));
        await this.setState({
            tokenname: await Utils.contract.name().call(),
            tokensymbol: await Utils.contract.symbol().call(),
            totalSupply: ((await Utils.contract.totalSupply().call()).toNumber()) / 1000000,
            tronwebaddress: tmp_tronwebaddress
        });
    }
    ///////////////////////////////// DYNAMIC CONTRACT ADDRESS END /////////////////////////

    /////////////////////////////////////// GET BALANCE /////////////////////////////////
    async getBalance(_getbalanceaddress) {
        const balance = ((await Utils.contract.balanceOf(_getbalanceaddress).call()).toNumber()) / 1000000;
        //const balance = await Utils.contract.decimals().call();
        console.log('balance', balance);
        this.setState({ balance: balance })

    }
    updateGetBalanceInputValue(evt) {
        console.log('getbalanceaddress : ', this.state.getbalanceaddress);
        this.setState({
            getbalanceaddress: evt.target.value
        });
    }
    /////////////////////////////////////// GET BALANCE END /////////////////////////////////

    /////////////////////////////////// TRANSFER /////////////////////////////
    Transfer(_to, _amount) {

        Utils.contract.transfer(_to, _amount).send({
            shouldPollResponse: true,
            callValue: 0
        }).then(res => Swal({
            title: 'Transfer Successful',
            type: 'success'
        })).catch(err => Swal({
            title: 'Transfer Failed',
            type: 'error'
        }));
    }

    updateTransferInputValue(evt) {
        this.setState({
            transferaddress: evt.target.value
        });
        console.log('transferaddress : ', this.state.transferaddress);

    }

    updateTransferAmountInputValue(evt) {
        console.log('transferamount : ', this.state.transferamount);
        this.setState({
            transferamount: evt.target.value
        });
    }
    /////////////////////////////////// TRANSFER END /////////////////////////////


    /////////////////////////////  TRANSFER FROM ///////////////////////////////////

    async TransferFrom(_from, _to, _amount) {

        const allowance = await Utils.contract.allowance(_from, this.state.tronwebaddress).call();
        console.log('allowance : ', allowance);

        Utils.contract.transferFrom(_from, _to, _amount).send({
            shouldPollResponse: true,
            callValue: 0
        }).then(res => Swal({
            title: 'Transfer Successful',
            type: 'success'
        })).catch(err => Swal({
            title: 'Transfer Failed',
            type: 'error'
        }));
    }

    updateTansferFrom_FromInputValue(evt) {

        this.setState({
            transferfromfromaddress: evt.target.value
        });

        console.log('transferfromfromaddress : ', this.state.transferfromfromaddress);
    }

    updateTransferFromToInputValue(evt) {

        this.setState({
            transferfromtoaddress: evt.target.value
        });
        console.log('transferfromtoaddress : ', this.state.transferfromtoaddress);
    }

    updateTransferFromAmountInputValue(evt) {

        this.setState({
            transferfromamount: evt.target.value
        });

        console.log('transferfromamount : ', this.state.transferfromamount);
    }

    /////////////////////////////  TRANSFER FROM END ///////////////////////////////////


    //////////////////////////////////// APPROVE ////////////////////////////
    Approve(_spender, _amount) {
        if (this.state.count <= this.props.MIN_DEPOSIT) {
            Utils.contract.approve(_spender, _amount).send({
                shouldPollResponse: true,
                callValue: 0,
                feeLimit: 1000000000,
            }).then(res => toast.success("Step1 completed")).catch(err => Swal({
                title: 'Approval Failed',
                type: 'error'

            }));
        } else {
            toast.error("Min Stake is 300 RKG");
        }

    }

    updateApproveValue(evt) {

        this.setState({
            approveamount: evt.target.value
        });
        console.log('approveamount : ', this.state.approveamount);
    }

    updateApproveSpender(evt) {

        this.setState({
            approvespender: evt.target.value
        });

        console.log('approvespender : ', this.state.approvespender);
    }

    //////////////////////////////////// APPROVE END ////////////////////////////

    /////////////////////////// BURN /////////////////////////////////

    Burn(_amount) {

        Utils.contract.burn(_amount).send({
            shouldPollResponse: true,
            callValue: 0
        }).then(res => Swal({
            title: 'Burn Successful',
            type: 'success'
        })).catch(err => Swal({
            title: 'Burn Failed',
            type: 'error'

        }));

    }

    updateBurnAmountInputValue(evt) {
        console.log('burnamount : ', this.state.burnamount);
        this.setState({
            burnamount: evt.target.value
        });
    }
    /////////////////////////// BURN END /////////////////////////////////


    /////////////////////////// BURN FROM /////////////////////////////////

    BurnFrom(_from, _amount) {

        Utils.contract.burnFrom(_from, _amount).send({
            shouldPollResponse: true,
            callValue: 0
        }).then(res => Swal({
            title: 'Burn Successful',
            type: 'success'
        })).catch(err => Swal({
            title: 'Burn Failed',
            type: 'error'

        }));

    }

    updateBurnFromAmountValue(evt) {
        console.log('burnfromamount : ', this.state.burnfromamount);
        this.setState({
            burnfromamount: evt.target.value
        });
    }

    updateBurnFromFromValue(evt) {
        console.log('burnfromfrom : ', this.state.burnfromfrom);
        this.setState({
            burnfromfrom: evt.target.value
        });
    }

    /////////////////////////// BURN FROM END /////////////////////////////////

    buttonTen(event) {
        this.setState({ count: this.state.count + 10 });
    }
    buttonHundred(event) {
        this.setState({ count: this.state.count + 100 });
    }

    button5Hundred(event) {
        this.setState({ count: this.state.count + 500 });
    }

    button1Thousand(event) {
        this.setState({ count: this.state.count + 1000 });
    }

    button10Thousand(event) {
        this.setState({ count: this.state.count + 10000 });
    }

    button50Thousand(event) {
        this.setState({ count: this.state.count + 50000 });
    }

    button100Thousand(event) {
        this.setState({ count: this.state.count + 100000 });
    }

    button500Thousand(event) {
        this.setState({ count: this.state.count + 500000 });
    }

    reset(event) {
        this.setState({ count: 0 });
    }

    render() {


        const colStyle = {
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        const headerStyle = { marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }

        const addButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "#FFF",
            transition: ".4s", marginTop: "10px", marginLeft: "10px", marginBottom: "10px", fontWeight: "3px", border: "3px solid white", backgroundColor: "black"
        }


        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s", marginTop: "30px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to bottom, #5AFF15, #FBB034)", fontSize: "18px", borderRadius: "30px", marginLeft: "150px"
        };


        // if (!this.state.tronWeb.installed)
        //     return <TronLinkGuide />;

        // if (!this.state.tronWeb.loggedIn)
        //     return <TronLinkGuide installed />;

        return (

            <div className='row'>

                <div className="col-xl-4"></div>

                <div className="col-xl-4" style={colStyle}>
                    <div className="col-xl-12" style={headerStyle}>
                        Stake Here
                    </div>
                    <br />
                    {/* <div className="row container">
                        <span style={dotStyle1}>

                        </span>
                        <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Investor : <span style={{ color: "yellow" }}> {this.props.pack1 + this.props.pack1} TRX to {this.props.pack2} TRX </span><br />(200 % ROI)</p>

                    </div>
                    <div className="row container">
                        <span style={dotStyle1}>

                        </span>
                        <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Business Financier : <span style={{ color: "yellow" }}> {this.props.pack2 + this.props.pack1} TRX to {this.props.pack3} TRX </span><br />(250 % ROI)</p>

                    </div>
                    <div className="row container">
                        <span style={dotStyle1}>

                        </span>
                        <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Shark Investor : <span style={{ color: "yellow" }}> {this.props.pack3 + this.props.pack1} TRX to {this.props.pack4} TRX </span><br />(300 % ROI)</p>

                    </div>
                    <div className="row container">
                        <span style={dotStyle1}>

                        </span>
                        <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Tycoon Investor : <span style={{ color: "yellow" }}> {this.props.pack4 + this.props.pack1} TRX to {this.props.pack5} TRX </span><br />(350 % ROI)</p>

                    </div>
                    <div className="row container">
                        <span style={dotStyle1}>

                        </span>
                        <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}>Beast Investor : <span style={{ color: "yellow" }}> {this.props.pack5 + this.props.pack1} TRX and above </span><br />(400 % ROI)</p>

                    </div>
                    <div className="row container">
                        <span style={dotStyle1}>

                        </span>
                        <p style={{ color: "white", paddingLeft: "10px", fontSize: "15px" }}> Min Investment for receiving TBT is <br /><span style={{ color: "yellow" }}>{this.props.tbt_min_deposit} TRX (<span style={{ color: "white" }}> priced @ of {this.props.tbt_price} TRX / TBT</span> )</span>
                        </p>

                    </div>
                    <br /> */}
                    <form>
                        <input type="text" style={{ backgroundColor: "black", borderRadius: "2px", height: "50px", color: "White", fontSize: "25px", paddingLeft: "30px", border: "4px solid white", width: "100%" }} value={this.state.count} onChange={this.updateApproveValue} /> <br />

                        <a href="#100" className="btn btn-primary" style={addButton} onClick={this.buttonHundred}>+100</a>

                        <a href="#500" className="btn btn-primary" style={addButton} onClick={this.button5Hundred}>+500</a>

                        <a href="#1000" className="btn btn-primary" style={addButton} onClick={this.button1Thousand}>+1000</a>

                        <a href="#10k" className="btn btn-primary" style={addButton} onClick={this.button10Thousand}>+10 k</a>

                        <a href="#50k" className="btn btn-primary" style={addButton} onClick={this.button50Thousand}>+50 k</a>
                        <a href="#100k" className="btn btn-primary" style={addButton} onClick={this.button100Thousand}>+100 k</a>
                        <a href="#500k" className="btn btn-primary" style={addButton} onClick={this.button5HundredThousand}>+500 k</a>
                        <a href="#10" className="btn btn-primary" style={addButton} onClick={this.buttonTen}>+10</a>
                        <a href="#reset" className="btn btn-primary" style={addButton} onClick={this.reset}>Reset</a><br />
                        <br />

                        {this.props.isReentry === true ?
                            <p style={{ color: "pink", textAlign: "center", fontSize: "16px" }}>Minimum Additional TRX for Re-Investment is {(this.props.next_min_deposit).toFixed(2)} TRX<br />
                                <p style={{ color: "yellow", textAlign: "center" }}>
                                    Locked balance value is <br />
                                    {this.props.locked_balance} TRX
                                    </p>
                            </p>
                            : null
                        }
                        {this.props.refLoading ? null :
                            <button type="submit" className="btn btn-success" style={investButton} onClick={(event) => {
                                event.preventDefault()
                                this.Approve(this.state.contract_address, this.state.count * 1000000)
                            }}>Make Deposit
                            </button>}
                    </form>
                </div>

                <div className="col-xl-4"></div>

                <div className='col-lg-12 text-center' >
                    {/* <hr />

                    <hr style={{ color: 'white', backgroundColor: 'white', height: 0.5 }} />

                    <h1 style={{ color: 'white' }}>Tron TRC20 Token Management Platform</h1>
                    <hr style={{ color: 'white', backgroundColor: 'white', height: 0.5 }} />
                    <p> Your Address : {this.state.tronwebaddress} </p>
                    <br />
                    <br />



                    <p> Paste your contract address here : </p>
                    <input style={{ width: "400px" }} value={this.state.contractAddress} onChange={this.updateContractAddressInput} />
                    <br />
                    <p> Token name : {this.state.tokenname}</p>
                    <p> Token Symbol : {this.state.tokensymbol}</p>
                    <p> Total Supply : {this.state.totalSupply}</p>
                    <hr style={{ color: 'white', backgroundColor: 'white', height: 0.5 }} />


                    <br /> */}
                    {/* <p> Amount : </p>
                    <input style={{ width: "400px" }} value={this.state.approveamount} onChange={this.updateApproveValue} />
                    <br />
                    <br />
                    <button className='btn btn-primary' onClick={(event) => {
                        event.preventDefault()
                        this.Approve(this.state.contract_address, this.state.approveamount * 1000000)
                    }}>Approve
                  </button>
                    <br />
                    <br />
                    <br />




                    <input style={{ width: "400px" }} value={this.state.getbalanceaddress} onChange={this.updateGetBalanceInputValue} />
                    <br />
                    <br />
                    <button className='btn btn-primary' onClick={(event) => {
                        event.preventDefault()
                        this.getBalance(this.state.getbalanceaddress)
                    }}>Get Balance
                  </button>
                    <br />
                    <br />
                    <p>Your balance is : {this.state.balance}</p>
                    <br /> */}



                </div>
            </div>
        );
    }
}

export default Token;

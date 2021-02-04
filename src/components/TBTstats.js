import React, { Component } from 'react'
import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

class TBTstats extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }
        this.withdraw = this.withdraw.bind(this);

    }
    async withdraw() {
        await Utils.contract
            .withdraw()
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Wihdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            ).then(res => {
                window.location = "/";
            });


    }


    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        const headerStyle = { marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }


        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={headerStyle}>
                            TBT Stats
                        </div>
                        <br />

                        <div className="col-xl-12" >

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>TBT received from Deposit</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.from_deposit} TBT</p>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>TBT received from Withdrawal</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.from_withdrawal} TBT</p>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Total TBT received</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.total_tbt} TBT</p>

                            <br /><br />
                        </div>
                        <div className="col-xl-3"></div>
                    </div>
                </div >
            </div >

        )
    }
}

export default TBTstats

import React, { Component } from 'react'

export class IncomeandTeamStats extends Component {
    render() {
        const colStyle = {
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={{ marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            My Income and Team Stats</div>
                        <br />

                        <div className="col-xl-12" >


                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Deposited </p>
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}> {this.props.userTotalDeposit} TRX</p>
                            <br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Received</p>
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}> {this.props.userTotalWithdrawn} TRX</p>
                            <br />




                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Personally Invited Partners</p>
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}> # {this.props.referrals_count}  </p>
                            <br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Wonder Partners</p>
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}> # {this.props.wonder_directs}  </p>
                            <br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Team Partners</p>
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}> # {this.props.total_structure} </p>
                            <br />

                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >

        )
    }
}

export default IncomeandTeamStats

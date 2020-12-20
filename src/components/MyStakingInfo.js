import React, { Component } from 'react'

// const contract_address = 'TSZ1YYotLgEwDXFnnEp82fqFa5FQ5KmY12';

// let contracturl = "https://tronscan.org/#/contract/" + contract_address;

class MyStakingInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }

    }

    render() {
        const colStyle = {
            backgroundImage: "linear-gradient(to right, #131050, black)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={{ marginTop: "-18px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            Bonus Stats</div>

                        <br />

                        <div className="col-xl-12" >
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Standard Dividend </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> +2.30 %</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Deposit Bonus </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}>
                                +{this.props.contract_bonus} %</p>
                            <br /><br />



                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >
        )
    }
}

export default MyStakingInfo

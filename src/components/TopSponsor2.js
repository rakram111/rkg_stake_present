import React, { Component } from 'react'

import 'react-toastify/dist/ReactToastify.css';
const url = "https//sweezglobal.com/";

class TopSponsor2 extends Component {

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
                            Top Sponsor Stats</div>
                        <br />

                        <div className="col-xl-12" >

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>
                                1. {this.props.deps1 > 0 ? this.props.deps1 : "..."} TRX </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.deps1 > 0 ? this.props.subAddress1 : null}... </p>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>
                                2. {this.props.deps2 > 0 ? this.props.deps2 : "..."} TRX </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.deps2 > 0 ? this.props.subAddress2 : null}... </p>

                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>
                                3. {this.props.deps3 > 0 ? this.props.deps3 : "..."} TRX </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.deps3 > 0 ? this.props.subAddress3 : null}... </p>

                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>
                                4. {this.props.deps4 > 0 ? this.props.deps4 : "..."} TRX </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.deps4 > 0 ? this.props.subAddress4 : null}... </p>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>
                                5. {this.props.deps5 > 0 ? this.props.deps5 : "..."} TRX </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.deps5 > 0 ? this.props.subAddress5 : null}... </p>

                            <br /><br />


                        </div>
                        {/*                     
                     <div className="col-xl-12" >
                            <h3 style={{ color: "white", fontSize: "23px", float: "left" }}>Top Whale Investors</h3>
                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>
                                1. {this.props.whale_deps1 > 0 ? this.props.whale_deps1 : "..."} TRX </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.whale_deps1 > 0 ? this.props.whaleSubAddress1 : null}... </p>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>
                                2. {this.props.whale_deps2 > 0 ? this.props.whale_deps2 : "..."} TRX </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.whale_deps2 > 0 ? this.props.whaleSubAddress2 : null}... </p>

                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>
                                3. {this.props.whale_deps3 > 0 ? this.props.whale_deps3 : "..."} TRX </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right", fontFamily: "MyFont" }}>
                                {this.props.whale_deps3 > 0 ? this.props.whaleSubAddress3 : null}... </p>

                             <br /><br />
                            

                            <br />
                            <br />
                        </div> */}
                        <p>
                            <a href="https://sweezglobal.com" style={{ color: "red", textDecoration: "underline" }} >Back</a>
                        </p>

                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >

        )
    }
}

export default TopSponsor2

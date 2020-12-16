import React, { Component } from 'react'
import loader from "./img/loadicon1.gif"



const contract_address = 'TLxG1Ui4KZgviu4mmAuZkYBxjkoum6H4rq';

let contracturl = "https://shasta.tronscan.org/#/contract/" + contract_address;
//https://tronscan.org/#/contract/
export class SmartInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }

    }

    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };
        // var pdt = 0;
        // var pdtflag = 0;
        // if (this.props.pool_draw_time && pdtflag === 0) {
        //     pdt = Number(this.props.pool_draw_time) + 100000;
        //     pdtflag = 1;
        // }

        // console.log("PDPPDPT " + pdt)


        // var x = setInterval(function () {

        //     // Get today's date and time
        //     //var now = new Date().getTime();

        //     // Find the distance between now and the count down date
        //     //console.log('next draw time' + this.props.pool_draw_time);
        //     var distance = Date.now() + pdt; //this.props.next_draw_time;

        //     // Time calculations for days, hours, minutes and seconds
        //     // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //     // Display the result in the element with id="demo"
        //     document.getElementById("demo").innerHTML = hours + "h "
        //         + minutes + "m " + seconds + "s ";

        //     // If the count down is finished, write some text
        //     if (distance < 0) {
        //         clearInterval(x);
        //         document.getElementById("demo").innerHTML = "EXPIRED";
        //     }
        // }, 1000);



        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={{ marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            Smart Contract</div>

                        <br />

                        <div className="col-xl-12" style={{ textAlign: "center" }}>
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Contract Address </p><p style={{ color: "white", fontSize: "17px", float: "right" }}>
                                {this.props.smartLoading ? <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "10px" }} /> :
                                    <a href={contracturl} style={{ textDecoration: "underline", color: "white" }} target="_blank" rel="noopener noreferrer">{this.props.subContract}...</a>}
                            </p><br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Total Deposits </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.totalInvested} TRX</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>  Total Paid</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.totalPaid}  TRX</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Contract Balance</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.contractBalance} TRX</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Pool Draw in</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.draw_hrs}h {this.props.draw_mins}m {this.props.draw_secs}s</p>

                            <br /><br />



                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Pool Balance</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.pool_balance} TRX</p>

                            <br /><br />

                            
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Whale Pool Balance</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.whale_balance} TRX</p>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>  Total Users</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> # {Number(this.props.totalUsers)}  </p>
                            <br /><br />


                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >
        )
    }
}

export default SmartInfo

import React, { Component } from 'react'
import loader from "./img/loadicon1.gif"



const contract_address = 'TQqE9TVcbsKqh7rXxqNP385ZsuVsQ568uN';

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

                        <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Contract Address</p>
                         
                            <a href={contracturl} style={{ textDecoration: "underline", color: "#18E55F" , fontSize: "23px", textAlign: "center", paddingTop:"110px" }} target="_blank" rel="noopener noreferrer">{this.props.subContract}...</a>
                            <br /><br />
                            

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Deposits</p> 
                            <a style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.totalInvested} TRX</a>
                            <br /><br />
                             

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Paid</p> 
                            <a style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.totalPaid} TRX</a>
                            <br /><br />
                             

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Contract Balance</p> 
                            <a style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.contractBalance} TRX</a>
                            <br /><br />
                             

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Total Users</p> 
                            <a style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}># {this.props.totalUsers}</a>
                            <br /><br />

                             <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Top Sponsor Pool Balance</p> 
                            <a style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.pool_balance} TRX</a>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Present Top Sponsor Share</p> 
                            <a style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {Number(this.props.pool_balance*0.1*0.4).toFixed(3)} TRX</a>
                            <br /><br />

                             <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Whale Investor Pool Balance</p> 
                            <a style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {this.props.whale_balance} TRX</a>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Present Top Investor Share</p> 
                            <a style={{ color: "#18E55F", fontSize: "27px", textAlign: "center" }}> {Number(this.props.whale_balance*0.1*0.5).toFixed(3)} TRX</a>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>Top Spansor/ Whale Pool Draw In</p> 
                            <a style={{ color: "#18E55F", fontSize: "23px", textAlign: "center" }}> {this.props.draw_hrs}h : {this.props.draw_mins}m : {this.props.draw_secs}s</a>
                            <br /> <br /> 
                         </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >
        )
    }
}

export default SmartInfo

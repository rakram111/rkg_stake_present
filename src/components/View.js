import React, { Component } from 'react'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

let url = "https://tronbeast.live/view/";
// let url = "https://tronbeast.live/view/"
toast.configure();

export class Invest extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }

    }

    render() {

        const colStyle = {
            backgroundColor: "black", opacity: "60%", marginTop: "20px", borderRadius: "20px", border: "5px solid white", marginLeft: "20px", marginRight: "20px",
        };
        const h2Style = {
            fontSize: "30px", color: "orange", textAlign: "center", fontFamily: "MyFont", margin: "20px", paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold"
        }

        const investButton = {
            display: "inline - block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "#FFF",
            transition: ".4s", marginTop: "20px", marginLeft: "10px", marginBottom: "20px", fontWeight: "3px", fontFamily: "MyFont", textAlign: "right", border: "2px solid white", backgroundColor: "green"
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <h2 style={h2Style}>Enter View Mode</h2>

                        <div className="col-xl-12" style={{ textAlign: "center" }}>
                            <form
                                onSubmit={(event) => {

                                    event.preventDefault();
                                    if (this.address.value === this.props.owner) {
                                        if (this.props.account === this.props.owner) {
                                            const address = url + this.address.value;
                                            window.location.assign(address);
                                        } else {
                                            toast.error("Invalid address");

                                        }
                                    } else {
                                        const address = url + this.address.value;
                                        window.location.assign(address);
                                    }


                                }}
                            >

                                <input className=" " type="text"
                                    id="address"
                                    ref={(input) => {
                                        this.address = input;
                                    }}
                                    style={{ backgroundColor: "#eee", borderRadius: "10px", height: "50px", opacity: "80%", color: "White", fontSize: "25px", paddingLeft: "30px", border: "2px solid white" }}
                                    placeholder="Enter Address to View"

                                    required />


                                <button type="submit" className="btn btn-success" style={investButton}>View</button>


                            </form>


                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div>
        )
    }
}

export default Invest

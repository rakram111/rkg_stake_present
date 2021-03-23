import React, { Component } from 'react'
import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/bootstrap.css";

toast.configure();

export class DivChecker extends Component {

    constructor(props) {
        super(props)

        this.state = {
            divs: "...."
        }
    }

    async update_dividends(account) {

        await Utils.contract
            .dividends_total(account).then(res => {
                this.setState({ divs: res / 1000000 });
            }).then(res => toast.success("updated..")).catch(res => toast.error("something went wrong"));
    }

    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right, #130401, #514155)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        const headerStyle = { marginTop: "-18px", backgroundImage: "linear-gradient(to right, #130401, #514155)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }

        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to bottom, #5AFF15, #FBB034)", fontSize: "18px", borderRadius: "30px", marginLeft: "103px"

        };
        return (
            <div style={{ paddingTop: "60px" }} >
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>
                        <div className="col-xl-12" style={headerStyle}>
                            Dividends </div>
                        <h1 style={{ textAlign: "center", color: "white" }}> {this.state.divs}</h1>
                        <form
                            onSubmit={(event) => {

                                event.preventDefault();

                                this.update_dividends(this.props.account);

                            }}
                        >

                            {this.props.refLoading ? null :
                                <button type="submit" className="btn btn-success" style={investButton}>
                                    Update Dividend
                                </button>}
                        </form>
                    </div>
                    <div className="col-xl-4"></div>
                </div>


            </div >

        )
    }
}

export default DivChecker

import React, { Component } from 'react'

let url = "http://localhost:3000/RKG/";

export class ReferralLink extends Component {

    constructor(props) {
        super(props)

        this.state = {
            copySuccess: ''
        }
    }

    copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
    };

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
            transition: "1.4s", marginTop: "30px", marginLeft: "180px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to bottom, #A7ACD9, #9E8FB2)", fontSize: "18px", borderRadius: "30px"
        };

        return (
            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={headerStyle}>
                            Invitation Section</div>

                        <br />
                        <div className="col-xl-12" style={{ textAlign: "center" }}>
                            <form style={{ textAlign: "center" }}>
                                <input style={{ textAlign: "center", backgroundColor: "black", color: "white", width: "100%", height: "30px" }}
                                    ref={(textarea) => this.textArea = textarea}
                                    value={url + this.props.account}
                                />
                            </form>
                            {
                                document.queryCommandSupported('copy') &&
                                <p style={{ float: "right" }} >
                                    <button className="btn btn-success" onClick={this.copyToClipboard} style={investButton}>Copy</button>
                                    {this.state.copySuccess}
                                </p>
                            } <br />
                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div>
        )
    }
}

export default ReferralLink

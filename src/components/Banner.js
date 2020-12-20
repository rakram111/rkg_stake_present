import React, { Component } from 'react'

class Banner extends Component {

    render() {

        const colStyle = {
            opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee", backgroundImage: "radial-gradient(  black, #131050  )"
        };

        return (

            <div style={{ paddingTop: "30px" }}>
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>
                        <br />  
                        <div style={{ color: "white", fontSize: "32px", fontFamily: "MyFont", textAlign: "center", fontWeight: "bold" }}>
                           $ {this.props.totalInvested*0.031} 
                         </div>
                        <br /> 

                    </div>
                    <div className="col-xl-4"></div>
                </div>
<br />
            </div >

        )
    }
}

export default Banner

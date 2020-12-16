import React, { Component } from 'react'
import Top from "./TopPage";

class Param2 extends Component {
    render() {
   //      console.log('param ' + this.props);
        return (
            <div>
                <Top
                    refLinkid={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default Param2

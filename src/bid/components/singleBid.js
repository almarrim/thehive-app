import React, { Component } from 'react'
class SingleBid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bid: {
                value: 0,
            }
        }
    }
    componentDidMount(){
        // console.log("bid didmount", bidId)
    }
    render() {
        return (
            <div>this is the single bid page</div>
        );
    }
}

export default SingleBid;
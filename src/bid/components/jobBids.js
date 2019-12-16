import React, { Component } from 'react';
import Bid from './bid'
class JobBids extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log(this.props.location.state.bids)
        const bids= this.props.location.state.bids.map((bid, index) => {
            return <Bid value={bid.value} content={bid.content} bidId={bid._id} deleteBid={this.props.deleteBid} user={this.props.user} key={index} />
        })
        return (<div><h1>IN Job Bids</h1>
        {bids}
        </div>);
    }
}

export default JobBids;
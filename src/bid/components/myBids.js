import React, { Component } from 'react';
import Bid from './bid'
import { Link, withRouter } from 'react-router-dom'
class MyBids extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let bids
        if (this.props.bids.length) {
            const myBids = this.props.bids.filter(bid => bid.bidder === this.props.user._id)
            bids = myBids.map((bid, index) => {
                console.log(this.props.deleteBid)
                return <div key={index}><Bid value={bid.value} content={bid.content} bidId={bid._id} deleteBid={this.props.deleteBid} user={this.props.user} bidder={bid.bidder} jobId={bid.jobId}  /><Link to={`/single-bid/${bid._id}`}> View Bid</Link></div>
            })
        }
        return (<div><h1>IN My Bids</h1>
            {bids}
            <button onClick={this.props.history.goBack}>Back</button>
        </div>);
    }
}

export default withRouter(MyBids);
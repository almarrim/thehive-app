import React, { Component } from 'react';
import Bid from './bid'
import { Link } from 'react-router-dom'

class JobBids extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bids:[]
        }
    }
    componentDidMount(){
        if (this.props.bids){
            console.log(this.props.bids)
            this.setState({
                bids:[...this.props.bids]
            })
        }
    }
    render() {
        let bids = <h2>waiting...</h2>
        if (this.state.bids){
        bids = this.state.bids.map((bid, index) => {
            return <div key={index}><Bid value={bid.value} content={bid.content} bidId={bid._id} deleteBid={this.props.deleteBid} user={this.props.user} bidder={bid.bidder} jobId={bid.jobId} key={index} /><Link to={`/single-bid/${bid._id}`}> View Bid</Link></div>
        })}
        return (<div><h1>IN Job Bids</h1>
            {bids}
            <button onClick={this.props.history.goBack}>Back</button>
        </div>);
    }
}

export default JobBids;
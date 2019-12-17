import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Bid extends Component {
    constructor(props){
        super(props)
    }
    handledeleteBid =(event)=> {
        event.preventDefault();
        console.log(this.props, this.props.deleteBid)
        this.props.deleteBid(this.props.bidId, this.props.history)
    }
    moveToJob(event){
        event.preventDefault();
        this.props.history.push(`/jobs/${this.props.jobId}`)
    }
    render() {
        let buttonDel
        console.log("Biddjdjddjdjdjd",this.props.user._id,this.props.bidder)
        if (this.props.user._id===this.props.bidder){
            buttonDel=<button onClick={(e)=>this.handledeleteBid(e)}>Delete Bid</button>
        }
        // const viewBid =<Link to={`/single-bid/${this.props.bidId}`}> View Bid</Link>

        return (
            <div>
                <h1>{this.props.value}</h1>
                <h2>{this.props.content}</h2>
                {buttonDel}
                <button onClick={(e)=> this.moveToJob(e)}> To Job </button>
                {/* {viewBid} */}
            </div >
        )
    }
}
export default  withRouter(Bid);
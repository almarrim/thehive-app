import React, { Component } from 'react';
import Bid from './bid'
import { Link } from 'react-router-dom'
class JobBids extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bids:[],
            allBids:[],
            openBids:[],
            engaged:[],
            closed:[],
            accepted:[],
            show:"all"
        }
    }
    componentDidMount(){
        if (this.props.bids){
            console.log(this.props.bids)
            console.log("here")
            const allBids = this.props.bids.filter(bid => bid.jobId === this.props.jobId)
            if(allBids.length>0){
                console.log("here")
            const openBids = allBids.filter(bid=>bid.status==0)
            const engaged = allBids.filter(bid=>bid.status==1)
            const closed = allBids.filter(bid=>bid.status==2)
            const accepted = allBids.filter(bid=>bid.status==3)
            this.setState({
                allBids:[...allBids],
                openBids:[...openBids],
                engaged:[...engaged],
                closed:[...closed],
                accepted:[...accepted]
            })}
        }
    }
    handleShow=(e, show)=>{
        e.preventDefault()
        this.setState({
            show:show
        })
    }
    render() {
        let bids = <h2>waiting...</h2>
        let myBids
        if (this.state.allBids){
            switch(this.state.show){
                case "all":
                            myBids = [...this.state.allBids];
                            break;
                        case "open":
                            myBids = [...this.state.openBids];
                            break;
                        case "engaged":
                            myBids = [...this.state.engaged];
                            break;
                        case "closed":
                            myBids = [...this.state.closed];
                            break;
                        case "accepted":
                            myBids= [...this.state.accepted];
            }
            bids = myBids.map((bid, index) => {
                let bidSt 
                switch(bid.status){
                            case 0:
                            bidSt = "open";
                                break;
                            case 1:
                            bidSt = "engaged";
                                break;
                            case 2:
                            bidSt = "closed";
                            break;
                        case 3:
                        bidSt = "accepted"
                }
                return <div key={index}>
                    <Bid value={bid.value} content={bid.content} bidId={bid._id} deleteBid={this.props.deleteBid} user={this.props.user} bidder={bid.bidder} jobId={bid.jobId} key={index} />
                    Bid Status: {bidSt}
                    <Link to={`/single-bid/${bid._id}`}> View Bid</Link>
                    </div>
            })
    }
    const buttons = <div>
            <button onClick={(e)=>this.handleShow(e,"all" )}>All</button>
            <button onClick={(e)=>this.handleShow(e,"open" )}>Open</button>
            <button onClick={(e)=>this.handleShow(e, "engaged")}>Engaged</button>
            <button onClick={(e)=>this.handleShow(e, "closed")}>Closed</button>
            <button onClick={(e)=>this.handleShow(e, "accepted")}>Accepted</button>
            </div>
        return (<div><h1>IN Job Bids</h1>
        {buttons}
        <button onClick={this.props.history.goBack}>Back</button>
            {bids}
            <button onClick={this.props.history.goBack}>Back</button>
        </div>);
    }
}

export default JobBids;
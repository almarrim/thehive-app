import React, { Component } from 'react';
// import { getAllBids, deleteABid } from '../../bid/api'
import Bid from '../../bid/components/bid'
// import { showAJob, deleteAJob } from '../api';
import Job from './job';
import { Link } from 'react-router-dom'

class SingleJob extends Component {
    constructor(props) {
        super(props);
        // this.deleteBid = this.deleteBid.bind(this)
        console.log("this.props", this.props)
        this.state = {
            job: {},
            jobId: 0,
            bids: {},
            Status:0,
        }
    }
    componentDidMount() {
        // getAllBids()
        //     .then(response => {
        //         console.log(response.data)
        //         this.setState({
        //             bids: [...response.data]
        //         })
        //     })
        //     .catch(error => console.log(error))
        this.props.setJobId(this.props.match.params.id)
        const job = this.props.jobs.find(job => job._id === this.props.match.params.id)
        console.log(job)
        if(job){
            console.log(job)
        this.setState({
            job: Object.assign({}, job),
            status: job.status,
        })}
        // showAJob(this.props.match.params.id)
        //     .then((response) => {
        //         this.setState({
        //             job: Object.assign({}, response.data),
        //             jobId: this.props.match.params.id
        //         });
        //         this.props.setJob(response.data)
        //     })
        //     .catch((error) => console.log(error))
    }
    handleDelete(event) {
        event.preventDefault()
        this.props.handleDeleteAJob(this.props.match.params.id, this.props.history)
        // deleteAJOB(this.props.match.params.id)
        // this.props.history.push('/')
    }
    handleEdit(event) {
        event.preventDefault()
        this.props.history.push(`/job-form/${this.props.match.params.id}`)
    }
    handleBid(event) {
        event.preventDefault()
        this.props.history.push(`/bid-form`)
    }
    // deleteBid(bidId) {
    //     deleteABid(this.props.user, bidId)
    //     this.props.removeBid(this.props.bidId)
    // }
    render() {
        console.log("render")
        let currentBids = [];
        let job = <h1>soon</h1>
        let status
        if(this.state.status==2){
            status= "Canceled"
        } else if (this.state.status==1){
            status= "Assigned"
        } else {
            status="Accepting"
        }
        if (this.state.job) {
            job = <Job title={this.state.job.title} type={this.state.job.type} description={this.state.job.description} key={job._id} />
        }
        let buttons
        let viewBids
        let bidsCount = ""
        let bidResponse
        if (this.props.user) {
            console.log(this.props.user)
            if (this.props.user._id === this.state.job.creator) {
                console.log(this.props.user)

                buttons = <div><button onClick={(e) => this.handleDelete(e)}>Delete</button><button onClick={(e) => this.handleEdit(e)}>Edit</button></div>;
                // buttonEdit = <button onClick={(e) => this.handleEdit(e)}>Edit</button>;
                if (this.props.bids.length > 0) {
                    console.log(this.props.bids.length)

                    currentBids = this.props.bids.filter(bid => bid.jobId === this.state.job._id)
                    // bids = jobBids.map((bid, index) => {
                    //     return <Bid value={bid.value} content={bid.content} bidId={bid._id} deleteBid={this.props.deleteBid} user={this.props.user} key={index} />
                    // })
                    if (currentBids.length>0){
                    bidResponse = <div><h4>Bids: {currentBids.length}</h4>   < Link to="/job-bids"
                    // {{
                    //     pathname: `/job-bids`,
                    //     state: {
                    //         bids: currentBids,
                    //     }
                    // }
                    // }
                    > ViewBids</Link ></div>}else {
                        bidResponse = <h4> No Bids</h4>
                    }
                } 
            } else {
                const jobBids= this.props.bids.filter(bid => bid.jobId==this.state.job._id)
                const myBid= jobBids.filter(bid => bid.bidder==this.props.user._id)
                console.log(this.props.bids,this.state.job )
                if(myBid.length){
                    console.log("inmybids", myBid)
                    bidResponse = <Link to={`/single-bid/${myBid[0]._id}`}> View Your Bid</Link>
                } 
                else {
                    console.log("inelse", myBid)
                    bidResponse =  <button onClick={(e) => this.handleBid(e)}>Make A Bid</button>
                }
            }
        }
        if (this.props.bids.length < 6) {
            bidsCount = "0-5"
        } else if (this.props.bids.length < 11) {
            bidsCount = "6-10"
        } else {
            bidsCount = "10<"
        }
                const openBids = this.props.bids.filter(bid=> bid.status==1)
                const closeBids = this.props.bids.filter(bid=> bid.status==2)
            const jobStats = <div>
                 <h5>Proposals: {bidsCount}</h5>
                 <h5>Open Negotiations: {openBids.length}</h5>
                 <h5>Closed Bids: {closeBids.length}</h5>
                 {bidResponse}
                 </div>
        return (<div>
    <h1> This is SINGLJOB with Status {status}</h1>
            <button onClick={this.props.history.goBack}>Back</button>
            {job}
            {buttons}
            {/* {buttonEdit} */}
            {jobStats}
            {/* {viewBids} */}
        </div >);
    }
}

export default SingleJob;
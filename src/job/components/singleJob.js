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
        this.setState({
            job: Object.assign({}, job)
        })
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
        let bids = <h2>bids not</h2>
        let jobBids;
        if (this.props.bids.length > 0) {
            jobBids = this.props.bids.filter(bid => bid.jobId === this.state.job._id)
            bids = jobBids.map((bid, index) => {
                return <Bid value={bid.value} content={bid.content} bidId={bid._id} deleteBid={this.props.deleteBid} user={this.props.user} key={index} />
            })
        }
        let job = <h1>soon</h1>
        if (this.state.job) {
            job = <Job title={this.state.job.title} type={this.state.job.type} description={this.state.job.description} key={job._id} />
        }
        let buttonDel
        let buttonEdit
        if (this.props.user) {
            if (this.props.user._id === this.state.job.creator) {
                buttonDel = <button onClick={(e) => this.handleDelete(e)}>Delete</button>;
                buttonEdit = <button onClick={(e) => this.handleEdit(e)}>Edit</button>
            }
        }
        return (<div>
            <h1> This is SINGLJOB</h1>
            {job}
            {buttonDel}
            {buttonEdit} 
            <button onClick={(e) => this.handleBid(e)}>Bid</button>
            <Link to={{
                pathname:`/job-bids`,
                state:{
                    bids: jobBids,
                }
                }}>ViewBids</Link>
            {bids}
        </div>);
    }
}

export default SingleJob;
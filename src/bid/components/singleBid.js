import React, { Component } from 'react'
import Bid from './bid'
import {getComments, createComment, deleteComment} from '../api'
/**
 * bid status meanings: 
 *              0 new > only job creator can interact to change bid status 
 *              1 engaged in negotiationes > job creator and bidder both can interact at this level and change proposal status
 *              2 closed negotiations> job creator and bidder both can close negotiations
 *              3 accepted proposal > only job creator can accept proposals
 */
class SingleBid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bid: {
                value: 0,
            },
            bidId:0,
            comments:[],
            content:"",
        }
    }
    componentDidMount() {
        // console.log("bid didmount", bidId)
        if(this.props.match.params){
            this.props.setBidId(this.props.match.params.bidId)
            getComments(this.props.user,this.props.match.params.bidId )
            .then(response=>{
                console.log(response.data.comments)
                const comments=[...response.data.comments]
                console.log(comments)
                this.setState({
                    comments:[...comments],
                })
                console.log(response.data.comments)
            })
            .catch(error=>console.log(error))
        }

    }
    handleChange(event) {
        const content= event.target.value
        console.log(event)
        console.log(content)
        this.setState({
            content: content
        })
    }
    handleAccept=(e,status, bidId,jobId)=>{
        console.log(e)
        e.preventDefault()
        this.props.jobStatus(jobId,1)
        this.props.bidStatus(status, bidId)
    }
    engage=(e,status, bidId)=>{
        console.log(e)
        e.preventDefault()
        this.props.bidStatus(status, bidId)
        // this.setState({
        //     engage:true
        // })
    }
    handleComment=(e)=>{
        e.preventDefault()
        console.log(this.state.content)
        createComment(this.props.bidId, this.props.user,this.state.content)
        .then(response=>{
            console.log(response.data)
            const comments = [...this.state.comments]
            comments.push(response.data)
            this.setState({
                comments:[...comments],
                content:''
            })
        })
        .catch(error=>console.log(error))
    }
    handleDeleteComment=(e, commentId, bidId)=>{
        e.preventDefault()
        deleteComment(bidId, this.props.user, commentId)
        .then(response => {
            console.log(response)
            const comments = [...this.state.comments]
            const commentIndex= comments.findIndex(comment=>comment._id==commentId)
            comments.splice(commentIndex,1)
            this.setState({
                comments:[...comments]
            })
        })
        .catch(error=> console.log(error))
    }
    render() {
        console.log(this.props.match.params)
        console.log(this.props.bids)
        let bid;
        let currentBid;
        let engage;
        let contents;
        let acceptButton
        if (this.props.match.params.bidId){
            const bid = this.props.bids.filter(bid=>bid._id===this.props.match.params.bidId)
            if(bid[0]){
            console.log(bid)
            console.log(bid[0].jobId)
            console.log(this.props.bidId)
            const job= this.props.jobs.filter(job=> job._id ===bid[0].jobId)
            console.log(job)
            console.log(bid[0].status)
            console.log(this.props.user._id,bid[0].bidder,job[0].creator)
            if(this.props.user._id===bid[0].bidder || this.props.user._id=== job[0].creator){
                if(bid[0].status!==2){
                    console.log(bid[0].status)
                    if(job[0].creator===this.props.user._id && bid[0].status!=2 && bid[0].status!=3){
                        acceptButton=
                        <div>
                        <button onClick={(e)=>this.handleAccept(e,3, bid[0]._id, job[0]._id)}>Accept</button>
                        <button onClick={(e)=>this.engage(e,2, bid[0]._id)}>Close Proposal</button>
                        </div>
                    }
                    if(bid[0].status===1){
                        const content = this.state.content
                    engage =
                    <div>
                    <form id="comment" onSubmit={(event) => this.handleComment(event)}>
                    <label>Content</label>
                    <textarea required name="content" value={content} type="content" placeholder="Content" form="comment" onChange={(e) => this.handleChange(e)}></textarea>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={(e)=>this.engage(e,2, bid[0]._id)}>Close Negotiations</button>
                </div>
                
                }else{
                    console.log(job,this.props.user._id)
                    if (this.props.user._id===job[0].creator && bid[0].status==0){
                        engage= <button onClick={(e)=>this.engage(e,1, bid[0]._id)}>Engage</button>
                    }}
            } else {
                    engage= <h4>This Bid Is Closed</h4>
                }
                currentBid = bid.map((bid, index)=>{
                    return <Bid value={bid.value} content={bid.content} bidId={bid._id} deleteBid={this.props.deleteBid} user={this.props.user} bidder={bid.bidder} jobId={bid.jobId} key={index} />
                })
                if (this.state.comments){
                    contents = this.state.comments.map((comment, index)=>{
                        const deleteButton = <button onClick={(e)=>this.handleDeleteComment(e,comment._id, bid[0]._id)}>Delete</button>
                        console.log(deleteButton)
                        let commentAuthor;
                        if(this.props.user._id===comment.author){
                            commentAuthor="You"
                        } else if (comment.author===job[0].creator){
                            commentAuthor="Job Creator"
                        } else {
                            commentAuthor="Proposal Creator"
                        }
                        return <div key={index}><p >{comment.content}</p>
                        {/* <h6>by: {commentAuthor=="You"?(`${commentAuthor} `+deleteButton+"HNMJH"):commentAuthor}</h6> */}
                        <h6>by: {commentAuthor} {commentAuthor=="You" && bid[0].status==1?deleteButton:""}</h6>
                        </div>
                    })
                    console.log(contents)
                }
            }
        }}
        return (
            <div>
                <h1>this is the single bid page</h1>
                XXXX{acceptButton}KKKK
                {currentBid}
                {contents}
                {engage}
                <button onClick={this.props.history.goBack}>Back</button>
            </div>
        );
    }
}

export default SingleBid;
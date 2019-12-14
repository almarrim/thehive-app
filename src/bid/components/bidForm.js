import React, { Component } from 'react';
import { createNewBid } from '../api';
class BidForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bid: {
                value: 0,
                content: "",
            },
            jobId:0,
        }
    }
    componentDidMount() {
        this.setState({
            jobId: this.props.jobId
        })
    }
    handleChange(event) {
        let bid = { ...this.state.bid }
        bid[event.target.name] = event.target.value
        this.setState({
            bid: { ...bid }
        })
    }
    handleSubmit(event, user) {
        event.preventDefault()
        const { value, content } = this.state.bid
        const newBid={
            value: value,
            content: content,
            jobId: this.props.jobId,
        }
            createNewBid(newBid, user)
                .then((response) => {
                    console.log("in the create response", response)
                    this.props.history.push(`/bid/${response.data.bid._id}`)
                })
                .catch((error) => console.log(error))
        }
    render() {
        const { value, content } = this.state.bid
        return (
            <form onSubmit={(event) => this.handleSubmit(event, this.props.user)}>
                <h2>Create Bid</h2>
                <label>Value</label>
                <input required name="value" value={value} type="value" placeholder="Title" onChange={(e) => this.handleChange(e)} />
                <label>Content</label>
                <input required name="content" value={content} type="content" placeholder="Content" onChange={(e) => this.handleChange(e)} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default BidForm;
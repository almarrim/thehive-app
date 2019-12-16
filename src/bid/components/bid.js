import React, { Component } from 'react'

export default class Bid extends Component {
    constructor(props) {
        super(props)
    }

    handledeleteBid(event) {
        event.preventDefault();
        this.props.deleteBid(this.props.bidId)

    }
    render() {
        return (
            <div>
                <h1>{this.props.value}</h1>
                <h2>{this.props.content}</h2>
                <button onClick={(e) => this.handledeleteBid(e)}>Delete Bid</button>
            </div >
        )
    }
}
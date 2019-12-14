import React, { Component } from 'react'

export default class Bid extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.value}</h1>
                <h2>{this.props.content}</h2>
            </div>
        )
    }
}
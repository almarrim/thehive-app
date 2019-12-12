import React, { Component } from 'react'

export default class Job extends Component {
    render() {
        return (
            <div>
    <h1>{this.props.title}</h1>
        <h2>{this.props.type}</h2>
    <p>{this.props.description}</p>
            </div>
        )
    }
}

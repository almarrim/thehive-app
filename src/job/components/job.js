import React, { Component } from 'react'

export default class Job extends Component {
    render() {
        return (
            <div className='card-content'>
                <h5 className='card-header' >{this.props.title}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>{this.props.type}</h6>
                <p className='card-text'>{this.props.description}</p>
            </div>
        )
    }
}

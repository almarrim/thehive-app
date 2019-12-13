import React, { Component } from 'react';
import { showAJob } from '../api'
import Job from './job';
class SingleJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {}
        }
    }
    componentDidMount() {
        showAJob("5df38f0da894044cbd44d59b")
            .then((response) => {
                this.setState({
                    job: Object.assign({}, response.data)
                })
                console.log("didmount", this.state.job)
            })
            .catch((error) => console.log(error))
    }
    render() {

        return (<div>
            <h1> This is JobShow</h1>
            {this.state.job ? <Job title={this.state.job.title} type={this.state.job.type} description={this.state.job.description} key={this.state.job._id} /> : <h1>"Searching..."</h1>}
        </div>);
    }
}

export default SingleJob;
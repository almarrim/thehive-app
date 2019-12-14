import React, { Component } from 'react';
import { showAJob, deleteAJOB } from '../api'
import Job from './job';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
class SingleJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {},
            x: "x",
            jobID: 0
        }
    }
    componentDidMount() {
        showAJob(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    job: Object.assign({}, response.data),
                    jobID: this.props.match.params.id
                })
            })
            .catch((error) => console.log(error))
    }
    handleDelete(event) {
        event.preventDefault()
        deleteAJOB(this.props.match.params.id)
        this.props.history.push('/')
    }
    render() {
        console.log("the state", this.props.user)
        let job = <h1>Searching...</h1>
        if (this.state.job) {
            job = <Job title={this.state.job.title} type={this.state.job.type} description={this.state.job.description} key={this.state.job._id} />
        }
        let button
        if (this.props.user) {
            if (this.props.user._id === this.state.job.creator) {
                console.log(this.props.user.id)
                console.log(this.state.job.creator)
                button = <button onClick={(e) => this.handleDelete(e)}>Delete</button>
            }
        }
        return (<div>
            <h1> This is SINGLJOB</h1>
            {job}
            {button}
            {this.props.user ? "inside the if" : "WRONG"}
        </div>);
    }
}

export default SingleJob;
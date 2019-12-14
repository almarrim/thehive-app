import React, { Component } from 'react';
import { showAJob, deleteAJOB } from '../api'
import Job from './job';
import JobForm from './jobForm'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
class SingleJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {},
            jobId: 0
        }
    }
    componentDidMount() {
        this.props.setJobId(this.props.match.params.id)
        showAJob(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    job: Object.assign({}, response.data),
                    jobId: this.props.match.params.id
                });
                this.props.setJob(response.data)
            })
            .catch((error) => console.log(error))
    }
    handleDelete(event) {
        event.preventDefault()
        deleteAJOB(this.props.match.params.id)
        this.props.history.push('/')
    }
    handleEdit(event) {
        event.preventDefault()
        this.props.history.push(`/job-form/${this.props.match.params.id}`)
    }
    render() {
        let job = <h1>Searching...</h1>
        if (this.state.job) {
            job = <Job title={this.state.job.title} type={this.state.job.type} description={this.state.job.description} key={this.state.job._id} />
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
        </div>);
    }
}

export default SingleJob;
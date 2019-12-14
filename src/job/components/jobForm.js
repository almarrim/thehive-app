import React, { Component } from 'react';
import { createNewJob, updateAJOB } from '../api';
class JobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {
                title: "",
                type: "",
                description: "",
            },
            create: true,
            jobId: 0
        }
    }
    componentDidMount() {
        this.setState({
            jobId: this.props.match.params.jobId
        })
        if (this.props.match.params.jobId != 0) {
            this.setState({
                job: Object.assign({}, this.props.job),
                create: false
            })
        }
    }
    handleChange(event) {
        let job = { ...this.state.job }
        job[event.target.name] = event.target.value
        this.setState({
            job: { ...job }
        })
    }
    handleSubmit(event, user) {
        event.preventDefault()
        if (this.props.match.params.jobId != 0) {
            updateAJOB(this.state.job, user, this.props.match.params.jobId)
                .then((response) => {
                    this.props.history.push(`/jobs/${this.props.match.params.jobId}`)
                })
                .catch((error) => console.log(error))
        }
        else {
            createNewJob(this.state.job, user)
                .then((response) => {
                    this.props.history.push(`/jobs/${response.data.job._id}`)
                })
                .catch((error) => console.log(error))
        }

    }
    render() {
        const { title, type, description } = this.state.job
        return (
            <form onSubmit={(event) => this.handleSubmit(event, this.props.user)}>
                <h2>Create Job</h2>
                <label>Title</label>
                <input required name="title" value={title} type="title" placeholder="Title" onChange={(e) => this.handleChange(e)} />
                <label>Type</label>
                <input required name="type" value={type} type="type" placeholder="Type" onChange={(e) => this.handleChange(e)} />
                <label>description</label>
                <input required name="description" value={description} type="description" placeholder="Description" onChange={(e) => this.handleChange(e)} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default JobForm;
import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from '../src/apiConfig';

class Test extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            type: "",
            description: "",
        }
    }
    componentDidMount() {
        console.log(this.props.user.token)

    }
    handleChange = event => {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.title)
    }
    onCreateJob = (event, user) => {
        event.preventDefault()
        const newJob = {
            title: this.state.title,
            type: this.state.type,
            description: this.state.description,
        }
        const createNewJob = function (newJob) {
            return axios({
                url: apiUrl + '/api/jobs',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }, data: {
                    job: newJob
                }
            });
        }
        createNewJob(newJob);
    }
    render() {
        console.log("render")
        const { title, type, description } = this.state
        return (
            <form onSubmit={(event) => this.onCreateJob(event, this.props.user)}>
                <h2>Create Job</h2>
                <label>Title</label>
                <input required name="title" value={title} type="title" placeholder="Title" onChange={this.handleChange} />
                <label>Type</label>
                <input required name="type" value={type} type="type" placeholder="Type" onChange={this.handleChange} />
                <label>description</label>
                <input required name="description" value={description} type="description" placeholder="Description" onChange={this.handleChange} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Test;
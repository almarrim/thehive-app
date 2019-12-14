import React, { Component } from 'react'
import Job from './job'
import { showAllJobs } from '../api'
import { Link } from 'react-router-dom';

export default class JobsContainer extends Component {
    constructor(props) {
        super();
        this.state = {
            title: "",
            type: "",
            discription: "",
            status: "",
            jobs: []
        }
    }
    componentDidMount() {
        showAllJobs()
            .then((response) => {
                this.setState({
                    jobs: [...response.data]
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        let jobs = <h2>No Jobs</h2>
        if (this.state.jobs.length > 0) {
            jobs = this.state.jobs.map((job, index) => {
                return <div key={index}><Job title={job.title} type={job.type} description={job.description} key={index} /> <Link to={{ pathname: `/jobs/${job._id}`, state: { x: "passed" } }}>JobsPage</Link></div >
            })
        }
        return (
            <div>
                This is the Container
                {jobs}
            </div>
        )
    }
}

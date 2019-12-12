import React, { Component } from 'react'
import Job from './job'
import { showAllJobs } from '../api'
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
        console.log("this is the didmount")
        showAllJobs()
            .then((response) => {
                console.log(response.data)
                this.setState({
                    jobs: [...response.data]
                })
                console.log(this.state.jobs)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        let jobs = <h2>No Jobs</h2>
        if (this.state.jobs.length > 0) {
            jobs = this.state.jobs.map((job, index) => {
                return <Job title={job.title} type={job.type} description={job.description} key={index} />
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

import React, { Component } from 'react'
import Job from './job'
// import { showAllJobs } from '../api'
import { Link } from 'react-router-dom';

export default class JobsContainer extends Component {
    constructor(props) {
        super();
        this.state = {
        }
    }
    render() {
        let jobs = <h2>No Jobs</h2>
        if (this.props.jobs.length > 0) {
            if(this.props.user){
                const notJobs= this.props.jobs.filter(job=>job.creator!=this.props.user._id)
                jobs = notJobs.map((job, index) => {
                    return <div key={index}><Job title={job.title} type={job.type} description={job.description} key={index} /> <Link to={{ pathname: `/jobs/${job._id}`, state: { jobId: job._id } }}>JobsPage</Link></div >
                })
            }else {
                jobs = this.props.jobs.map((job, index) => {
                    return <div key={index}><Job title={job.title} type={job.type} description={job.description} key={index} /> <Link to={{ pathname: `/jobs/${job._id}`, state: { jobId: job._id } }}>JobsPage</Link></div >
                })
            }
        }
        return (
            <div>
                This is the Container
                {jobs}
            </div>
        )
    }
}

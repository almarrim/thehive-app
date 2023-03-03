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
            if (this.props.user) {
                const notJobs = this.props.jobs.filter(job => job.creator != this.props.user._id)
                jobs = notJobs.map((job, index) => {
                    return <div className="col-sm-6" key={index}><div className='card mx-auto' ><div className="card-body" key={index}><Job title={job.title} type={job.type} description={job.description} key={index} /> <Link to={{ pathname: `/jobs/${job._id}`, state: { jobId: job._id } }} className='card-link btn btn-primary'>Go to Job</Link></div ></div></div>
                })
            } else {
                jobs = this.props.jobs.map((job, index) => {
                    return <div className="col-sm-6" key={index}><div className="card mx-auto" key={index}><Job title={job.title} type={job.type} description={job.description} key={index} /> <Link to={{ pathname: `/jobs/${job._id}`, state: { jobId: job._id } }} className='card-link btn btn-primary'>Go to Job</Link></div ></div>
                })
            }
        }
        return (
            <div>
                <h1 className="title">THE HIVE</h1>
                <p>The Hive is a business app, where work such as construction, material supply etc. can be offerd. People can give proposals on jobs. Job creators can select the desired proposal. Users can both create jobs and bid on available jobs.</p>
                <div id="theBest" className="Job-Container">
                    <div className='row'>
                        {jobs}
                    </div>
                </div>
            </div>
        )
    }
}

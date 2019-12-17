import React, { Component } from 'react'
import Job from './job'
// import { showAllJobs } from '../api'
import { Link,withRouter } from 'react-router-dom';

class MyJobs extends Component {
    constructor(props) {
        super();
        this.state = {
        }
    }
    handleDeleteAll=(e, myJobs)=>{
        myJobs.forEach(job=>{
            this.props.handleDeleteAJob(job._id,this.props.history)
        })
    }
    render() {
        let jobs = <h2>No Jobs</h2>
        let myJobs
        if (this.props.jobs.length > 0) {
            myJobs = this.props.jobs.filter(job => job.creator === this.props.user._id)
            jobs = myJobs.map((job, index) => {
                return <div key={index}><Job title={job.title} type={job.type} description={job.description} key={index} /> <Link to={{ pathname: `/jobs/${job._id}`, state: { jobId: job._id } }}>JobsPage</Link></div >
            })
        }
        return (
            <div>
                This is My Job Container
                <button onClick={this.props.history.goBack}>Back</button>
                <button onClick={(e)=>this.handleDeleteAll(e, myJobs)}>Delete All</button>
                {jobs}
            </div>
        )
    }
}
export default  withRouter(MyJobs)
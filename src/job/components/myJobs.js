import React, { Component } from 'react'
import Job from './job'
// import { showAllJobs } from '../api'
import { Link, withRouter } from 'react-router-dom';

class MyJobs extends Component {
    constructor(props) {
        super();
        this.state = {
            allJobs: [],
            openJobs: [],
            canceled: [],
            show: "all"
        }
    }
    componentDidMount() {
        // console.log("here", this.props.jobs.length, this.props.jobs)
        if (this.props.jobs.length > 0) {
            // console.log("here")
            const allJobs = this.props.jobs.filter(job => job.creator === this.props.user._id)
            if (allJobs.length > 0) {
                // console.log("here")
                const openJobs = allJobs.filter(job => job.status == 0)
                const assigned = allJobs.filter(job => job.status == 1)
                const canceled = allJobs.filter(job => job.status == 2)
                this.setState({
                    allJobs: [...allJobs],
                    openJobs: [...openJobs],
                    assigned: [...assigned],
                    canceled: [...canceled]
                })
            }
        }
    }
    handleDeleteAll = (e, myJobs) => {
        myJobs.forEach(job => {
            this.props.handleDeleteAJob(job._id, this.props.history)
        })
    }
    handleShow = (e, show) => {
        e.preventDefault()
        this.setState({
            show: show
        })
    }
    render() {
        let jobs = <h2>No Jobs</h2>
        // console.log("here")
        let myJobs
        if (this.props.jobs.length > 0) {
            // console.log("here")
            // myJobs = this.props.jobs.filter(job => job.creator === this.props.user._id)
            // jobs = myJobs.map((job, index) => {
            //     return <div key={index}><Job title={job.title} type={job.type} description={job.description} key={index} /> <Link to={{ pathname: `/jobs/${job._id}`, state: { jobId: job._id } }}>Go to Job's Page</Link></div >
            // })
            switch (this.state.show) {
                case "all":
                    // console.log("here")
                    myJobs = [...this.state.allJobs];
                    break;
                case "open":
                    // console.log("here")
                    myJobs = [...this.state.openJobs];
                    break;
                case "assigned":
                    // console.log("here")
                    myJobs = [...this.state.assigned];
                    break;
                case "canceled":
                    // console.log("here")
                    myJobs = [...this.state.canceled];
            }
            // console.log("here", myJobs)
            jobs = myJobs.map((job, index) => {
                let jobSt
                switch (job.status) {
                    case 0:
                        jobSt = "open";
                        break;
                    case 1:
                        jobSt = "assigned";
                        break;
                    case 2:
                        jobSt = "canceled";
                }
                return <div class="col-sm-6" key={index}><div className="card" key={index}><Job title={job.title} type={job.type} description={job.description} key={index} />            Job Status: {jobSt}
                    <Link to={{ pathname: `/jobs/${job._id}`, state: { jobId: job._id } }}>Go to Job's Page</Link></div ></div>
            });
        }
        const buttons = <div>
            <button onClick={(e) => this.handleShow(e, "all")}>All</button>
            <button onClick={(e) => this.handleShow(e, "open")}>Open</button>
            <button onClick={(e) => this.handleShow(e, "assigned")}>Assigned</button>
            <button onClick={(e) => this.handleShow(e, "canceled")}>Canceled</button>
        </div>
        return (
            <div>
                <h1 className='title-section'>My Jobs</h1>
                <div >{buttons}
                    <button onClick={this.props.history.goBack}>Back</button>
                    <button onClick={(e) => this.handleDeleteAll(e, myJobs)}>Delete All</button>
                </div>
                <div className='row'>
                    {jobs}
                </div>
            </div>
        )
    }
}
export default withRouter(MyJobs)
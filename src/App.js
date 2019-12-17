import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AlertDismissible from './auth/components/AlertDismissible'
import Test from './test'
//job related imports
import { createNewJob, updateAJob, showAllJobs, deleteAJob } from './job/api'
import JobsContainer from '../src/job/components/jobsContainer'
import MyJobs from './job/components/myJobs'
import SingleJob from '../src/job/components/singleJob'
import JobForm from '../src/job/components/jobForm'
//bid related imports
import BidForm from '../src/bid/components/bidForm'
import MyBids from './bid/components/myBids'
import JobBids from './bid/components/jobBids'
import SingleBid from './bid/components/singleBid'
import { createNewBid, getAllBids, deleteABid, updateBid } from './bid/api'

class App extends Component {
  constructor() {
    super()
    this.deleteBid = this.deleteBid.bind(this)
    this.bidSubmit = this.bidSubmit.bind(this)
    this.jobStatus = this.jobStatus.bind(this)
    this.state = {
      user: null,
      alerts: [],
      jobs: [],
      job: {},
      bids: [],
      jobId: 0,
      bidId: 0,
      ownBids: [],
      requester: "Owner",
    }
  }
  componentDidMount() {
    console.log("didmount")
    showAllJobs()
      .then((response) => {
        this.setState({
          jobs: [...response.data]
        })
      })
      .catch((error) => {
        console.log(error)
      })
    getAllBids()
      .then(response => {
        console.log(response.data)
        // let ownBids = []
        // if (this.state.user) {
        //   ownBids = response.data.filter(bid => bid.bidder == this.state.user._id)
        // }
        this.setState({
          bids: [...response.data],
          // ownBids: [...ownBids]
        })
      })
      .catch(error => console.log(error))
  }
  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }
  setJobs = (jobs) => {
    this.setState({
      jobs: [...jobs],
    })
  }
  setJobId = (jobId) => {
    this.setState({
      jobId: jobId
    })
  }
  jobStatus=(jobId, status)=>{
    const job = {
      status: status
    }
    updateAJob(job, this.state.user, jobId)
    .then((response) => {
      let jobs = [...this.state.jobs]
      const jobIndex = jobs.findIndex(job => job._id === jobId)
      jobs[jobIndex].status = job.status
      this.setState({
        jobs:[...jobs]
      })
    })
    .catch((error) => console.log(error))
  }

  setBidId = (bidId) => {
    this.setState({
      bidId: bidId
    })
  }
  jobFormSubmit = (user, jobId, job, history) => {
    if (jobId != 0) {
      updateAJob(job, user, jobId)
        .then((response) => {
          let jobs = [...this.state.jobs]
          const jobIndex = jobs.findIndex(job => job._id === jobId)
          jobs[jobIndex] = job
          this.setJobs(jobs)
          history.push(`/jobs/${jobId}`)
        })
        .catch((error) => console.log(error))
    }
    else {
      createNewJob(job, user)
        .then((response) => {
          const jobs = [...this.state.jobs]
          jobs.push(response.data.job)
          this.setJobs(jobs)
          console.log(history)
          history.push(`/jobs/${response.data.job._id}`)
        })
        .catch((error) => console.log(error))
    }
  }
  handleDeleteAJob = (jobId, history) => {
    deleteAJob(this.state.user, jobId)
      .then((response) => {
        console.log(response)
        const jobs = [...this.state.jobs]
        const jobIndex = jobs.findIndex(job => job._id === jobId)
        const bids = this.state.bids.filter(bid=> bid.jobId== jobId)
        console.log(bids)
        jobs.splice(jobIndex, 1)
        this.setJobs(jobs)
        history.push('/')
      })
      .catch(error => console.log(error))
  }
  deleteBid = (bidId, history)=>{
    deleteABid(this.state.user, bidId)
      .then((response) => {
        console.log(response)
        const bids = [...this.state.bids]
        const bidIndex = bids.findIndex(bid => bid._id === bidId)
        const jobId= bids[bidIndex].jobId
        bids.splice(bidIndex, 1)
        this.setState({
          bids:[...bids]
        })
        console.log("after the state", jobId)
        history.push(`/jobs/${jobId}`)
      })
      .catch(error => console.log(error))
  }
  bidSubmit(bid, history) {
    createNewBid(bid, this.state.user)
      .then((response) => {
        const bids = [...this.state.bids]
        bids.push(response.data.bid)
        this.setState({
          bids: [...bids]
        })
        console.log("in the create response", response)
        history.push(`/jobs/${response.data.bid.jobId}`)
      })
      .catch((error) => console.log(error))
  }
  setRequester = (requester) => {
    this.setState({
      requester: requester
    })
  }
  bidStatus=(status, bidId)=>{
    const bid={
      status:status
    }
    updateBid(bid,this.state.user, bidId)
    .then(()=>{
      const bids = [...this.state.bids]
      const bidIndex = this.state.bids.findIndex(bid=>bid._id==bidId);
      bids[bidIndex].status= status
      this.setState({
        bids:[...bids]
      })
    })
    .catch(error=>console.log(error))
  }
  render() {
    const { alerts, user, jobs } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route exact path='/jobs/:id' render={(props) => (
            <SingleJob {...props} alert={this.alert} setUser={this.setUser} user={user} jobs={this.state.jobs} setJobs={this.setJobs} setJobId={this.setJobId} handleDeleteAJob={this.handleDeleteAJob} jobStatus={this.jobStatus} setBidId={this.setBidId} bids={this.state.bids} deleteBid={this.deleteBid} setRequester={this.setRequester} />
          )} />
          <Route exact path='/' render={() => (
            <JobsContainer alert={this.alert} setUser={this.setUser} user={user} jobs={this.state.jobs} />
          )} />
          <AuthenticatedRoute exact user={user} path='/own-jobs' render={() => (
            <MyJobs alert={this.alert} user={user} setUser={this.setUser} jobId={this.state.jobId} jobs={jobs} handleDeleteAJob={this.handleDeleteAJob} />
          )} />
          <AuthenticatedRoute user={user} path='/test' render={() => (
            <Test alert={this.alert} user={user} setUser={this.setUser} jobId={this.state.jobId} />
          )} />
          <AuthenticatedRoute user={user} path='/job-form/:jobId' render={(props) => (
            <JobForm {...props} alert={this.alert} user={user} setUser={this.setUser} job={this.state.job} jobs={this.state.jobs} jobId={this.state.jobId} setJobs={this.setJobs} setJobId={this.setJobId} jobFormSubmit={this.jobFormSubmit} />
          )} />
          {/* BIDS ROUTES */}
          <AuthenticatedRoute user={user} path='/bid-form' render={(props) => (
            <BidForm alert={this.alert} user={user} jobId={this.state.jobId} setJobs={this.setJobs} bidSubmit={this.bidSubmit} />
          )} />
          {/* <AuthenticatedRoute user={user} path='/bid' render={(props) => (
            <SingleBid alert={this.alert} user={user} jobId={this.state.jobId} bidId={this.state.bidId} setBidId={this.setBidId} deleteBid={this.deleteBid} setRequester={this.setRequester} />
          )} /> */}
          <Route user={user} path='/job-bids' render={(props) => (
            <JobBids {...props} alert={this.alert} user={user} jobId={this.state.jobId} setBidId={this.setBidId} deleteBid={this.deleteBid} bids={this.state.bids} requester={this.state.requester} setRequester={this.setRequester} />
          )} />
            <AuthenticatedRoute user={user} path='/own-bids' render={(props) => (
            <MyBids {...props} alert={this.alert} user={user} jobId={this.state.jobId} setBidId={this.setBidId} bids={this.state.bids} deleteBid={this.deleteBid} requester={this.state.requester} setRequester={this.setRequester} />
          )} />
            <AuthenticatedRoute user={user} path='/single-bid/:bidId' render={(props) => (
            <SingleBid {...props} alert={this.alert} user={user} jobId={this.state.jobId}  jobs={this.state.jobs} setBidId={this.setBidId} bids={this.state.bids} deleteBid={this.deleteBid} requester={this.state.requester} bidStatus={this.bidStatus} bidId={this.state.bidId} setRequester={this.setRequester} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} jobs={this.state.jobs} bids={this.state.bids} deleteBid={this.deleteBid}/>
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App

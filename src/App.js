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
import { showAllJobs } from './job/api'
import JobsContainer from '../src/job/components/jobsContainer'
import SingleJob from '../src/job/components/singleJob'
import JobForm from '../src/job/components/jobForm'
import BidForm from '../src/bid/components/bidForm'
import SingleBid from '../src/bid/components/singleBid'
import Bids from '../src/bid/components/bids'
class App extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      alerts: [],
      jobs: [],
      job: {},
      bids:[],
      jobId: 0,
      bidId: 0,
      requester: "Owner"
    }
  }
  componentDidMount(){
    showAllJobs()
    .then((response) => {
        this.setState({
            jobs: [...response.data]
        })
    })
    .catch((error) => {
        console.log(error)
    })
    // showAllBids()
    // .then((response) => {
    //     this.setState({
    //         bids: [...response.data]
    //     })
    // })
    // .catch((error) => {
    //     console.log(error)
    // })
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
  setBidId = (bidId) => {
    this.setState({
      bidId: bidId
    })
  }
  setRequester = (requester) => {
    this.setState({
      requester: requester
    })
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
            <SingleJob {...props} alert={this.alert} setUser={this.setUser} user={user} jobs={this.state.jobs} setJobs={this.setJobs} setJobId={this.setJobId} setBidId={this.setBidId} setRequester={this.setRequester}/>
          )} />
          <Route exact path='/' render={() => (
            <JobsContainer alert={this.alert} setUser={this.setUser} user={user} jobs={this.state.jobs} />
          )} />
          <AuthenticatedRoute user={user} path='/test' render={() => (
            <Test alert={this.alert} user={user} setUser={this.setUser} jobId={this.state.jobId} />
          )} />
          <AuthenticatedRoute user={user} path='/job-form/:jobId' render={(props) => (
            <JobForm {...props} alert={this.alert} user={user} setUser={this.setUser} job={this.state.job} jobs={this.state.jobs} jobId={this.state.jobId} setJobs={this.setJobs} setJobId={this.setJobId} />
          )} />
          <AuthenticatedRoute user={user} path='/bid-form' render={(props) => (
            <BidForm alert={this.alert} user={user} jobId={this.state.jobId} setJobs={this.setJobs} />
          )} />
          <AuthenticatedRoute user={user} path='/bid' render={(props) => (
            <SingleBid alert={this.alert} user={user} jobId={this.state.jobId} bidId={this.state.bidId} setBidId={this.setBidId} setRequester={this.setRequester}/>
          )} />
          <AuthenticatedRoute user={user} path='/bids' render={(props) => (
            <Bids alert={this.alert} user={user} jobId={this.state.jobId} setBidId={this.setBidId} requester={this.state.requester} setRequester={this.setRequester}/>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
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

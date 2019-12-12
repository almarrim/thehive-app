/*************************************************
 * ********** API Functions Request **************
 * This is where jobs api functions are written
 * They get exported and used with job components
 *************************************************/

import axios from 'axios';
import apiUrl from '../apiConfig';




/**
 * Method:      GET
 * URI:         /api/jobs
 * Description: Show all Jobs
 */
export const showAllJobs = function () {
    // return axios({
    //     url: apiUrl + '/api/jobs',
    //     method: 'GET',
    // })
    return axios.get(`${apiUrl}/api/jobs`);
}

/*API POST request that creates a new job post
//It takes two params. newJob: Object & user: Object
//it sends the data expected by the api in the backend 
//as newJob in the body of the request. 
//Also, it sends the user.token as this actions 
//requires a signed in user. */
export const createNewJob = function (newJob, user) {
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
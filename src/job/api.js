/*************************************************
 * ********** API Functions Request **************
 * This is where jobs api functions are written
 * They get exported and used with job components
 *************************************************/

import axios from 'axios';
import apiUrl from '../apiConfig';




/**
 * INDEX
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
/**
 * SHOW
 * Method:      GET
 * URI:         /api/jobs/:id
 * Description: Show a Job
 */
export const showAJob = function (id) {
    return axios.get(`${apiUrl}/api/jobs/${id}`)
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
/**
 * EDIT
 * Method:      PUT
 * URI:         /api/jobs/:id
 * Description: Update a Job
 */
export const updateAJOB = function (newJob, user, jobId) {
    return axios({
        url: `${apiUrl}/api/jobs/${jobId}`,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }, data: {
            job: newJob
        }
    });
}
/**
 * DELETE
 * Method:      DELETE
 * URI:         /api/jobs/:id
 * Description: Delete a Job
 */
export const deleteAJOB = function (id) {
    return axios.delete(`${apiUrl}/api/jobs/${id}`)
}

import axios from 'axios';
import apiUrl from '../apiConfig';


export const getAllBids = function () {
    return axios({
        url: apiUrl + '/api/bids',
        method: 'GET',
    });
}
export const deleteABid = function (user, bidId) {
    return axios({
        url: apiUrl + '/api/bids/' + bidId,
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    });
}
export const createNewBid = function (newBid, user) {
    return axios({
        url: apiUrl + '/api/bids',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }, data: {
            bid: newBid
        }
    });
}
export const updateBid = function (bid, user, bidId){
    return axios({
        url: `${apiUrl}/api/bids/${bidId}`,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }, data: {
            bid: bid
        }
    });
}
//Comments API calls
export const getComments = function(user, bidId){
    return axios({
        url: `${apiUrl}/api/bids/${bidId}/comments`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    });
}
export const createComment = function (bidId, user, content) {
    return axios({
        url: `${apiUrl}/api/bids/${bidId}/comments`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }, data: {
            comment: {
                content: content
            }
        }
    });
}
import axios from 'axios';
import apiUrl from '../apiConfig';



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
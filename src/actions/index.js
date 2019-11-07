import API from '../apis';
import axios from 'axios';

export const fetchComments =  () => async dispatch => {
    const response = await  axios({
        method: 'get',
        url: 'http://localhost:3443/api/v1/user/comment',
        headers:{
            "user_auth":JSON.parse(localStorage.getItem('user_auth'))
        }
    })
    dispatch({type: 'FETCH_COMMENTS' , payload:response.data})
}

export const checkComments =  () => async dispatch => {
    const response = await  API.get('user/comment');
    dispatch({type: 'FETCH_COMMENTS' , payload:response.data.comments.comments})
}
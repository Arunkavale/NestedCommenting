import API from '../apis';

export const fetchComments =  () => async dispatch => {
    const response = await  API.get('user/comment');
    dispatch({type: 'FETCH_COMMENTS' , payload:response.data})
}

export const checkComments =  () => async dispatch => {
    const response = await  API.get('user/comment');
    dispatch({type: 'FETCH_COMMENTS' , payload:response.data.comments.comments})
}
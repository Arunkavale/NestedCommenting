import React from 'react';

const CommentAction = (props) =>{
    let user = JSON.parse(localStorage.getItem('user'));
    if(user._id === props.user._id){
        return (
            <div className="actions">
                  <a className="reply">Reply</a>
                  <a className="edit">Edit</a>
                  <a className="delete">Delete</a>
            </div>
        )
    }else{
        return (
        <div className="actions">
            <a className="reply">Reply</a>
        </div>);
    }
    
}

export default CommentAction;
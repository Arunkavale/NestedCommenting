import React from 'react';
import CommentAction from './commentAction';

import moment from 'moment'



const CommentDetail = (props) =>{
    return (
        <div >
            <a href="/" className="avatar">
            <img alt="avatar" src={props.comment.user.avatar} />
            </a>
            <div className="content">
                <a href="/" className="author">
                    &nbsp;&nbsp;&nbsp;&nbsp;{props.comment.user.username}
                </a>
                <div className="metadata">
                    <span className="date">
                        {getDateText(props.comment.createdDate)}
                    </span>
                </div>
                <div className="text"> &nbsp;&nbsp;&nbsp;&nbsp;{props.comment.comment}</div>
                <CommentAction comment={props.comment}></CommentAction>
            </div>
         </div>
    )
}


function getDateText(date){
    if( !moment.isMoment(date) ){
      date = moment(date); // ok for js date, milliseconds or string in ISO format
    }
    
    if( date.isSame(moment(), 'day') ){
      return date.format('hh:mm a');
    } else if( date.isSame(moment().subtract(1, 'd'), 'day') ){
      return 'Yesterday';
    } else if( date.isSame(moment(), 'week') ){
      return date.format('dddd');
    } else {
      return date.format('DD/MM/YYYY');
    }
  }
  

export default CommentDetail;
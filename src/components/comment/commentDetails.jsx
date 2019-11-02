import React from 'react';
import { tsPropertySignature } from '@babel/types';
import CommentAction from './commentAction';

import moment from 'moment'



const CommentDetail = (props) =>{
    console.log(props);
    
    return (
        <div >
            <a href="/" className="avatar">
            <img alt="avatar" src={props.author.avatar} />
            </a>
            <div className="content">
                <a href="/" className="author">
                    &nbsp;&nbsp;&nbsp;&nbsp;{props.author.username}
                </a>
                <div className="metadata">
                    <span className="date">
                        {getDateText(props.timeAgo)}
                    </span>
                </div>
                <div className="text"> &nbsp;&nbsp;&nbsp;&nbsp;{props.comment}</div>
                <CommentAction user={props.author} comment={props.comment}></CommentAction>
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
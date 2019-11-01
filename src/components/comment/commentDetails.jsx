import React from 'react';
import { tsPropertySignature } from '@babel/types';
import CommentAction from './commentAction';

const CommentDetail = (props) =>{

    return (
        <div className="comment">
            <a href="/" className="avatar">
            <img alt="avatar" src={props.author.avatar} />
            </a>
            <div className="content">
                <a href="/" className="author">
                    {props.author.username}
                </a>
                <div className="metadata">
                    <span className="date">
                    {props.timeAgo}
                    </span>
                </div>
                <div className="text">{props.comment}</div>
                <CommentAction user={props.author}></CommentAction>
            </div>
        </div>
    )
}

export default CommentDetail;
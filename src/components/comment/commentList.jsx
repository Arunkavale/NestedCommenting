import React from 'react';
import CommentDetail from './commentDetails';
import uuidv4 from  'uuid/v4';

class CommentList extends React.Component {
    constructor(props){
        super(props);
    }

    generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }
    render(){
        const comments = this.props.comments.map((comment)=>{
            return <CommentDetail comment={comment.comment} key={uuidv4()}  author = {comment.user} timeAgo={comment.createdDate}></CommentDetail>
        })
        return (
            <div >
               {comments}
            </div >
        )
    }
}

export default CommentList;
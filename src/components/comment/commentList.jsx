import React from 'react';
import CommentDetail from './commentDetails';

class CommentList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            username:"",
            password: "",
            avatar :"",
            errors: {}
        };
    }
    
    renderComments = (comments) => (
        comments.map(comment=>{
            if(comment.children.length > 0){
                return(
                <div className="comment" key={comment._id}>
                    <CommentDetail   comment={comment.comment} key={comment._id}  author = {comment.user} timeAgo={comment.createdDate}/>
                    <div className="comments" >{this.renderComments(comment.children)}</div>
                </div>)
            }else{
                return(
                <div className="comment" key={comment._id}>
                    <CommentDetail  key={comment._id} comment={comment.comment} key={comment._id}  author = {comment.user} timeAgo={comment.createdDate} />
                </div>)
            }
          
        })
    )
  
    render(){
        return <div>{this.renderComments(this.props.comments)}</div>
    }
    
}

export default CommentList;
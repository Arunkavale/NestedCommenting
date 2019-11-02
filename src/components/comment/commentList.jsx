import React from 'react';
import CommentDetail from './commentDetails';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions';

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
    
    componentDidMount() {
        this.props.fetchComments();
    }

    
    renderComments = (comments) => {
        if(comments){
            return comments.map(comment=>{
                if(comment.children.length > 0){
                    return(
                    <div className="comment" key={comment._id}>
                        <CommentDetail   comment={comment} key={comment._id}/>
                        <div className="comments" >{this.renderComments(comment.children)}</div>
                    </div>)
                }else{
                    return(
                        <div className="comment" key={comment._id}>
                            <CommentDetail comment={comment} key={comment._id}  />
                        </div>)
                }
            });
        }
        return null;
    }
    render(){
        return <div>{this.renderComments(this.props.comments.comments)}</div>
    }
}

const mapStateToProps = state =>{
    return { comments : state.comments }
}

export default connect(mapStateToProps,{fetchComments})(CommentList);
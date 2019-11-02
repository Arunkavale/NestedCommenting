import React from 'react';
import CommentInputBox from './commentInputBox';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../../apis";

class CommentAction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isReplay: false,
            isEdit:false
        };
    }

    isReplyChangeState=()=>{
        this.setState({isReplay:true , isEdit:false})
    }

    isEditChangeState=()=>{
        this.setState({isReplay:false , isEdit:true})
    }

    notify = (msg) => toast.success(msg);

    deleteComment = async (id)=>{
        let response = await API.delete('user/comment/'+id);
        if(response.data.statusCode === 0 ){
            this.props.fetchComments();
        }
        this.notify(response.data.message);
    }

    cancleClick=()=>{
        this.setState({isReplay:false , isEdit:false})
    }
    render(){
        let user = JSON.parse(localStorage.getItem('user'));
        if(user._id === this.props.comment.user._id){
            return (
                <div className="actions">
                      <a className="reply" onClick={this.isReplyChangeState}>Reply</a>
                      {this.state.isReplay ? <CommentInputBox btnText="Reply" type="text" closeButton="true" parentId={this.props.comment._id} cancleClick ={this.cancleClick}></CommentInputBox>:null}
                      <a className="edit" onClick={this.isEditChangeState}>Edit</a>
                      {this.state.isEdit ? <CommentInputBox btnText="Update" type="text" closeButton="true" commentId={this.props.comment._id} comment={this.props.comment.comment} cancleClick ={this.cancleClick}></CommentInputBox>:null}
                      <a className="delete" onClick={()=> this.deleteComment(this.props.comment._id) }>Delete</a>
                      <ToastContainer />
                </div>
            )
        }else{
            return (
                <div className="actions">
                    <a className="reply" onClick={this.isReplyChangeState}>Reply</a>
                      {this.state.isReplay ? <CommentInputBox btnText="Reply" type="text" closeButton="true" parentId={this.props.comment._id} cancleClick ={this.cancleClick}></CommentInputBox>:null}
                      <ToastContainer />
                </div>);
        }
    }
}

const mapStateToProps = state =>{
    return { comments : state.comments }
}

export default connect(mapStateToProps,{fetchComments})(CommentAction);
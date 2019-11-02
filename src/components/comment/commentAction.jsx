import React from 'react';
import CommentInputBox from './commentInputBox';

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

    cancleClick=()=>{
        this.setState({isReplay:false , isEdit:false})
    }
    render(){
        let user = JSON.parse(localStorage.getItem('user'));
        if(user._id === this.props.user._id){
            return (
                <div className="actions">
                      <a className="reply" onClick={this.isReplyChangeState}>Reply</a>
                      {this.state.isReplay ? <CommentInputBox btnText="Reply" type="text" closeButton="true" cancleClick ={this.cancleClick}></CommentInputBox>:null}
                      <a className="edit" onClick={this.isEditChangeState}>Edit</a>
                      {this.state.isEdit ? <CommentInputBox btnText="Update" type="text" closeButton="true" comment={this.props.comment} cancleClick ={this.cancleClick}></CommentInputBox>:null}
                      <a className="delete">Delete</a>
                </div>
            )
        }else{
            return (
                <div className="actions">
                    <a className="reply" onClick={this.isReplyChangeState}>Reply</a>
                      {this.state.isReplay ? <CommentInputBox btnText="Reply" type="text" closeButton="true" cancleClick ={this.cancleClick}></CommentInputBox>:null}
                      
                </div>);
        }
    }
}

export default CommentAction;
import React from 'react';
// import API from "../../apis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions';
import axios from 'axios';



class CommentInputBox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          comment:""
        };
        this.response = null;
      }

    notify = (msg) => toast.success(msg);

 

    submitComment =async (e)=>{
        e.preventDefault();
        if(this.props.btnText === 'Reply'){
          let commentData={
            comment:this.state.comment,
            parentId:this.props.parentId
          }
          this.props.cancleClick();
          this.saveComment(commentData);
        }else if(this.props.btnText === 'Update'){
          let commentData={
            comment:this.state.comment
          }
          // let response = await API.put('user/comment/'+this.props.commentId,commentData);
          const response = await  axios({
              method: 'put',
              url: 'http://localhost:3443/api/v1/user/comment/'+this.props.commentId,
              data:commentData,
              headers:{
                  "user_auth":JSON.parse(localStorage.getItem('user_auth'))
              }
            })
          
          
          if(response.data.statusCode === 0 ){
              this.props.fetchComments();
              this.props.cancleClick();
          }
          console.log('update response' , response);
          
        }else{
          let commentData={
            comment:this.state.comment
          }
          this.saveComment(commentData);
      } 
    }

    saveComment =async (commentData) =>{
        // let response = await API.post('user/comment',commentData);
        const response = await  axios({
          method: 'post',
          url: 'http://localhost:3443/api/v1/user/comment',
          data:commentData,
          headers:{
              "user_auth":JSON.parse(localStorage.getItem('user_auth'))
          }
        })
        if(response.data.statusCode === 0 ){
            this.props.fetchComments();
            this.setState({comment:""});
        }
    }

  
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentDidMount = () => {
      if(this.props.comment && this.props.btnText ==="Update"){
        this.setState({comment:this.props.comment});
      }
    }

    render(){
        return (
            <form className="ui form" onSubmit={this.submitComment}>
              <div className="field">
                  <div className="ui fluid action input">
                    <input type="text" placeholder="Write your comment here " id="comment" onChange={this.onChange} value={this.state.comment}></input>
                    <div className="ui button" onClick={this.submitComment}>
                    { this.props.btnText? this.props.btnText:"Comment"}
                    </div>
                    { this.props.closeButton?<div className="ui button" onClick={this.props.cancleClick}>cancel</div>:null}
                  </div>
                  <ToastContainer />
              </div>
            </form>
        )
    }
}

const mapStateToProps = state =>{
  return { comments : state.comments }
}

export default connect(mapStateToProps,{fetchComments})(CommentInputBox);
// export default CommentInputBox;
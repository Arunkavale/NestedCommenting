import React from 'react';
import API from "../../apis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions';



class CommentInputBox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          comment:""
        };
        this.response = null;
      }

    notify = (msg) => toast.success(msg);

 

    submitComment =async ()=>{
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
          let response = await API.put('user/comment/'+this.props.commentId,commentData);
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
        let response = await API.post('user/comment',commentData);
        if(response.data.statusCode === 0 ){
            this.notify(response.data.message);
            this.props.fetchComments();
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
            <form className="ui form">
              <div className="field">
                  <div className="ui fluid action input">
                    <input type="text" placeholder="Write your comment here " id="comment" onChange={this.onChange} value={this.state.comment}></input>
                    <div className="ui button" onClick={this.submitComment}>
                    { this.props.btnText? this.props.btnText:"Comment"}
                    </div>
                    { this.props.closeButton?<div className="ui button" onClick={this.props.cancleClick}>cancle</div>:null}
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
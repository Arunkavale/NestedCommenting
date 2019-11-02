import React from 'react';
import API from "../../apis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class CommentInputBox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          comment:""
        };
        this.response = null;
      }

    notify = () => toast("Wow so easy !");

    submitComment =async ()=>{
        if(this.props.btnText){
          console.log(this.props.comment);
        }else{
          let commentData={
            comment:this.state.comment,
            user: JSON.parse(localStorage.getItem('user')) 
        }
        this.saveComment(commentData);
      } 
    }

    saveComment =async (commentData) =>{
        this.response = await API.post('user/comment',commentData);
        if(this.response.data.statusCode === 0 ){
            let toast = this.notify;
            this.props.checkComment();
        }
    }

  
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentDidMount = () => {
      console.log(this.props.commentList);
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
              </div>
            </form>
        )
    }
}

export default CommentInputBox;
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
      }

      notify = () => toast("Wow so easy !");
 

    submitComment =async ()=>{
        let commentData={
            comment:this.state.comment,
            user: JSON.parse(localStorage.getItem('user')) 
        }
      this.saveComment(commentData);
    }

    saveComment =async (commentData) =>{
        let response = await API.post('user/comment',commentData);
        if(response.data.statusCode === 0 ){
            // alert("Comment added successfully");
            let toast = this.notify;
            this.props.checkComment();
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render(){
        return (
            <form className="ui form">
              <div className="field">
                  <div className="ui fluid action input">
                    <input type="text" placeholder="Write your comment here " id="comment" onChange={this.onChange} value={this.state.comment}></input>
                    <div className="ui button" onClick={this.submitComment}>Comment</div>
                  </div>
              </div>
            </form>
        )
    }
}

export default CommentInputBox;
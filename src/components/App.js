import React from "react";
import "./App.scss";
import { Login, Register } from "./login/index";
import faker from 'faker';
import API from "./../apis";
import CommentInputBox from './comment/commentInputBox';
import CommentList from './comment/commentList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      isLoggedinUser:false,
      comment:"",
      commentList :[]
    };
  }

  async componentDidMount() {
    this.rightSide.classList.add("right");
    if(localStorage.getItem('user_auth')){
      this.setState({isLoggedinUser:true});
      this.getComment();
    }
  }

   getComment = async ()=>{
    let comments = await API.get('user/comment');
    this.setState({commentList:comments.data.comments});
  }

  callLogin = () =>{
    this.setState({isLogginActive:true});
  }

  successLogin = ()=>{
    this.setState({isLoggedinUser:true});
  }

  changeState=()=> {
    const { isLogginActive } = this.state;
    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }


  

  loginComponents =()=>{
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} onLogin = {this.successLogin} />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)}  onRegister = {this.callLogin} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }



  commentComponent(){
    return(
      <div className="ui raised segment">
        <CommentInputBox checkComment={this.getComment}></CommentInputBox>
        <div className="ui comments">
          <CommentList comments = {this.state.commentList}></CommentList>
        {/* <div className="comment">
          <a className="avatar">
          <img alt="avatar" src={faker.image.avatar()}></img>
          </a>
          <div className="content">
            <a className="author">Matt</a>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">
              How artistic!
            </div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
          </div>
        </div>
        <div className="comment">
          <a className="avatar">
          <img alt="avatar" src={faker.image.avatar()}></img>

          </a>
          <div className="content">
            <a className="author">Elliot Fu</a>
            <div className="metadata">
              <span className="date">Yesterday at 12:30AM</span>
            </div>
            <div className="text">
              <p>This has been very useful for my research. Thanks as well!</p>
            </div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
          </div>
          <div className="comments">
            <div className="comment">
              <a className="avatar">
                <img alt="avatar" src={faker.image.avatar()}></img>

              </a>
              <div className="content">
                <a className="author">Jenny Hess</a>
                <div className="metadata">
                  <span className="date">Just now</span>
                </div>
                <div className="text">
                  Elliot you are always so right 
                </div>
                <div className="actions">
                  <a className="reply">Reply</a>
                </div>
              </div>
            </div>

            <div className="comments">
            <div className="comment">
              <a className="avatar">
                <img alt="avatar" src={faker.image.avatar()}></img>

              </a>
              <div className="content">
                <a className="author">Jenny Hess</a>
                <div className="metadata">
                  <span className="date">Just now</span>
                </div>
                <div className="text">
                  Elliot you are always so right 
                </div>
                <div className="actions">
                  <a className="reply">Reply</a>
                  <a className="reply">Delete</a>
                </div>
              </div>
            </div>
</div>



          </div>
        </div>
        <div className="comment">
          <a className="avatar">
          </a>
          <div className="content">
            <a className="author">Joe Henderson</a>
            <div className="metadata">
              <span className="date">5 days ago</span>
            </div>
            <div className="text">
              Dude, this is awesome. Thanks so much
            </div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
            </div>
          </div>*/}
        </div> 
      </div>
    )
  }


  render() {
    if(!this.state.isLoggedinUser){
      return this.loginComponents();
    }else{
      return this.commentComponent();
    }
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;

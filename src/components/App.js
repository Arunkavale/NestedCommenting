import React from "react";
import "./App.scss";
import { Login, Register } from "./login/index";
import faker from 'faker';
import API from "./../apis";
import CommentInputBox from './comment/commentInputBox';
import CommentList from './comment/commentList';
import { fetchComments } from '../actions';

import { Provider } from 'react-redux';
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
    this.getComment();
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
      <Provider store={store}>
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
      </Provider>
    );
  }



  commentComponent(){
    return(
      <div className="ui raised segment">
        <CommentInputBox commentList={this.state.commentList} checkComment={this.getComment}></CommentInputBox>
        <div className="ui comments">
          <CommentList comments = {this.state.commentList}></CommentList>
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

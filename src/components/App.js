import React from "react";
import "./App.scss";
import {  Register } from "./login/index";
import Login from './login/login';
import Navbar from "../components/comment/navbar";
import CommentInputBox from './comment/commentInputBox';
import CommentList from './comment/commentList';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';
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
      // this.props.fetchComments();
    }
  }

  logout=()=>{
    localStorage.removeItem('user_auth');
    localStorage.removeItem('user');
    this.setState({isLoggedinUser:false});
    this.setState({isLogginActive:true});
  }

  getComment = async ()=>{
    this.props.fetchComments();
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
      <div>
      <div className="ui raised segment commentBox">
      <Navbar logout={this.logout}></Navbar>
        <CommentInputBox commentList={this.state.commentList} checkComment={this.getComment}></CommentInputBox> 
        <div className="ui comments">
          <CommentList commentList={this.state.commentList}></CommentList>
        </div> 
      </div>
      </div>
    )
  }


  render() {
    if(!this.state.isLoggedinUser){ // cheing if user is logged in or not
      return this.loginComponents(); // if not then showing login and register component
    }else{
      return this.commentComponent(); // else showing comment box component
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


const mapStateToProps = state =>{
  return { comments : state.comments }
}

export default connect(mapStateToProps,{fetchComments})(App);
// export default App;

import React from "react";
import "./App.scss";
import { Login, Register } from "./login/index";
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
      this.props.fetchComments();
    }
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
      <Navbar></Navbar>
      <div className="ui raised segment commentBox">
        <CommentInputBox commentList={this.state.commentList} checkComment={this.getComment}></CommentInputBox>
        <div className="ui comments">
          <CommentList commentList={this.state.commentList}></CommentList>
        </div> 
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


const mapStateToProps = state =>{
  return { comments : state.comments }
}

export default connect(mapStateToProps,{fetchComments})(App);
// export default App;

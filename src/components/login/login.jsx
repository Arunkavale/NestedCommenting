import React from "react";
import loginImg from "../../assets/login.svg";
import API from "../../apis";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  loginUser = async userData =>{
    const response = await API.post('user/login',userData);
    if(response.data.statusCode === 0){
      alert("User logged in Successfully");
      localStorage.setItem('user',JSON.stringify(response.data.data));
      localStorage.setItem('user_auth',JSON.stringify(response.headers.user_auth));
      this.props.onLogin();
    }else{
      alert(response.data.message);
    }
  }
  
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.loginUser(userData);
  };



  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" id="username" onChange={this.onChange} value={this.state.username} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" id="password" onChange={this.onChange} value={this.state.password}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.onSubmit}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

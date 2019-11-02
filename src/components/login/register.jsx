import React from "react";
import loginImg from "../../assets/login.svg";
import API from "../../apis";
import faker from 'faker';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username:"",
      password: "",
      avatar :"",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  registerUser = async userData =>{
    const response = await API.post('user/register',userData);
    if(response.data.statusCode === 0){
      alert("User Registered Successfully")
      this.props.onRegister();
    }else{
      alert(response.data.message);
    }
  }
  
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      avatar : faker.image.avatar()
    };
    this.registerUser(userData);
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
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
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" id="email" onChange={this.onChange} value={this.state.email}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" id="password" onChange={this.onChange} value={this.state.password}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.onSubmit}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

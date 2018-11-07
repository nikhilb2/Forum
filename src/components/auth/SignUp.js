import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      firstName:'',
      lastName:''
      }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleChange(e) {

    this.setState({[e.target.id]:e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.signUp(this.state)
        console.log(this.props.authError)
  }
  render() {

    const { auth, authError } = this.props
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className='white'>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input id='email' type='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">password</label>
            <input id='password' type='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input id='firstName' type='text' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input id='lastName' type='text' onChange={this.handleChange} />
          </div>
          <div>
            <button className='btn pink lighten-1 z-depth-0'>Sign Up</button>
          </div>
          <div className="red-text center">
            {authError? <p> {authError}</p>:null}
          </div>
        </form>
      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {auth: state.firebase.auth,
  authError:state.auth.authError}
}
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
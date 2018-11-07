import React, { Component } from 'react';
import {createProject} from '../../store/actions/projectActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class CreateProject extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      content:''  }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleChange(e) {

    this.setState({[e.target.id]:e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createProject(this.state)
    this.props.history.push('/')
  }
  render() {
    const {auth} = this.props
    if (!auth.uid) return <Redirect to='/signin'/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className='white'>
          <h5 className="grey-text text-darken-3">New Post</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input id='title' type='Text' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea id='content' type='text' className='materialize-textarea' onChange={this.handleChange}></textarea>
          </div>
          <div>
            <button className='btn pink lighten-1 z-depth-0' onClick={this.handleSubmit}>Create New</button>
          </div>
        </form>
      </div>
    );
  }

}
const mapDispatchToProps = (dispatch) => {
  return{
    createProject:(project) => dispatch(createProject(project))
  }
}
const mapStateToProps = (state) => {
  return{
    auth:state.firebase.auth
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

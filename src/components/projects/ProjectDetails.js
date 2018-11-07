import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import Comment from './projectComments'
const ProjectDetails = (props) => {
  const {project,auth,user,projectId} = props
  //const projectId=window.location.href.slice(30)
//  const id=Object.keys(project.project.authorId)
  //console.log(window.location.href.slice(30))
  if (!auth.uid) return <Redirect to='/signin'/>

  if (project){
    return(
      <div className="container project-details">
      <div className='card z-depth-0'>
        <div className='card-content'>
          <span className="card-title">{project.title}</span>
          <p>{project.content}</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
          <div>{moment(project.createrOn.toDate()).calendar()}</div>
        </div>
      </div>
      <Comment project={project} projectId={projectId} auth={auth} user={user} />
    </div>
  )
} else {return(<div className='container center'>Loading Project</div>)}
};

const mapStateToProps=(state,ownProps) => {
//  console.log(state)
  const id = ownProps.match.params.id
  const projects = state.firestore.data.projects
  const project = projects?projects[id]:null
  return {
    project:project,
    auth:state.firebase.auth,
    user: state.firestore.data.users,
    projectId: id
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection:'projects'},
    {collection:'users'}
  ])
)(ProjectDetails);

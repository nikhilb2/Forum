
export const createProject = (project) => {

  return(dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile
    const authorId = getState().firebase.auth.uid
    console.log(getState())
    firestore.collection('projects').add({
      ...project,
      authorFirstName:profile.firstName,
      authorLastName:profile.lastName,
      authorId:authorId,
      createrOn: new Date(),
    }).then(()=> {
      dispatch({
        type:'CREATE_PROJECT',
        project
      })
    }).catch((err)=>{
      dispatch({type:'CREATE_PROJECT_ERROR',err})
    })

  }
}

export const postComment = (project) => {
  return(dispatch,getState,{getFirestore}) =>{
  const firestore = getFirestore()
  firestore.collection('projects').doc(project.projectId).update({
    comment: firestore.FieldValue.arrayUnion({
      comment:project.comment,
      authorId:project.authorId,
    time: new Date()})
  }).then(()=>{
    dispatch({
      type:'POST_COMMENT',
      project
    })
  }).catch((err)=>{
    dispatch({type:'POST_COMMENT_ERROR'})
  })
}}

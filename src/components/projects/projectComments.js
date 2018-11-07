import React, { Component } from "react";
import { postComment } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import moment from "moment";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      authorId: "",
      projectId: ""
    };
    this.handleContent = this.handleContent.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }
  handleContent(e) {
    this.setState({
      comment: e.target.value,
      projectId: this.props.projectId,
      authorId: this.props.auth.uid
    })
    ;
  }
  handlePost() {
    this.props.postComment(this.state);
    this.refs.comment.value=""
  }

  render() {
    console.log(this.props)
    const { user, project } = this.props;
    return user ? (
      <div className="container">
        {project.comment &&
          project.comment.map(comment => {
            const authorId = comment.authorId;
            return (
              <div className="container project-details">
                <div className="card z-depth-0">
                  <div className="card-content">
                    {comment.comment}
                    <div className="card-action grey lighten-4 grey-text">
                      {user[authorId] ? user[authorId].firstName : authorId}
                      {" "}{user[authorId] ? user[authorId].lastName : authorId}
                      <div>{comment.time ? moment(comment.time.toDate()).calendar():authorId}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="card z-depth-0">
          <div className="card-content">
            <div className="input-field">
              <label htmlFor="comment">Type Comment</label>
              <textarea
                id="comment"
                ref="comment"
                type="text"
                className="materialize-textarea"
                onChange={this.handleContent}
              />
            </div>
            <button
              className="btn pink lighten-1 z-depth-0"
              onClick={this.handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    ) : null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postComment: project => dispatch(postComment(project))
  };
};


export default connect(
    null,
    mapDispatchToProps
  )(Comment);

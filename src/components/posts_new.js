import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

  renderField(field)
  {
    const {
      meta: {
        touched,
        error
      }
    } = field;
    const className = `form-group ${touched && error
      ? 'has-danger'
      : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input}/>
        <div className="text-help">
          {touched
            ? error
            : ''}
        </div>
      </div>

    );
  }

  onSubmit(values) {

    this.props.createPost(values,()=>{
    this.props.history.push('/');  
    });

  }

  render()
  {

    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Title" name="title" component={this.renderField}/>
        <Field label="Categories" name="categories" component={this.renderField}/>
        <Field label="Post Content" name="content" component={this.renderField}/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-warning-outline mx-auto" to="/">Go Back</Link>
      </form>

    );

  }

}

function validate(values) {

  const error = {};
  if (!values.title || values.title.length < 3) {
    error.title = "Length must be atleast three characters";
  }
  if (!values.categories) {
    error.categories = "Please Enter some categories";
  }
  if (!values.content) {
    error.content = "Please Enter some content";
  }

  return error;

}

export default reduxForm({validate, form: 'PostsNewForm'})(connect(null, {createPost})(PostsNew));

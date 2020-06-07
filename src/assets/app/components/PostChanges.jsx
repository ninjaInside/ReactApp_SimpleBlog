import React from 'react';
import styles from '../styles/main.sass'
import axios from 'axios'
import { Formik } from 'formik'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import ModificationPosts from './ModificationPosts.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import FormPost from './FormPost.jsx'

class AddingPost extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currentPostId: null
		}

		this.handleAddPost = this.handleAddPost.bind(this)
		this.handleChangePostId = this.handleChangePostId.bind(this)
	}

	handleChangePostId(postId) {
		this.setState({
			currentPostId: postId
		})
	}

	handleAddPost(values, {setSubmitting}) {
		values.tags = values.tags.split(' ')

		axios({
			method: 'post',
			url: 'https:\/\/govnoblog.herokuapp.com/api/v1/posts/',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('AuthKey')}`
			},
			data: values
		})
		.then((response) => {
			location.reload()
		})
	}

	render() {
		return (
			<div className={styles.addingPostField}>
				<div className={styles.addingPostField__btns}>
					<Link
						className={styles.addingPostField__closeBtn}
						to={'/'}>Close</Link>
					<Link 
						className={styles.addingPostField__modificateBtn}
						to={'/postChanges/modificate/'}>Change my posts</Link>				
				</div>
				
				<Switch>
					<Route exact path='/postChanges'>
						<FormPost 
							responseFunction={this.handleAddPost} />
					</Route>

					<Route path='/postChanges/modificate/' component={ModificationPosts} />
				</Switch>
			</div>
		)
	}
}

export default AddingPost
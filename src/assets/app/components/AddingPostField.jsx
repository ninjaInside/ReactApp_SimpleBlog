import React from 'react';
import styles from '../styles/main.sass'
import axios from 'axios'
import {Formik} from 'formik'

import ModificationPosts from './ModificationPosts.jsx'
import ErrorMessage from './ErrorMessage.jsx'

class AddingPostField extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			valueTag: '',
			modificateField: null
		}

		this.handleCloseField = this.handleCloseField.bind(this)
		this.handleUpdateValue = this.handleUpdateValue.bind(this)
		this.handleAddPost = this.handleAddPost.bind(this)
	}

	handleAddPost() {

	}

	handleUpdateValue() {

	}

	handleCloseField() {

	}

	render() {
		let render

		if (!this.state.modificateField) {
			render = <Formik
					initialValues={{
						title: '', 
						tags: [], 
						body: '', 
					}}
					validate={values => {
						let errors = {}

						if (values.body.length < 15) {
							errors.body = 'В тексте должно быть как минимум больше одного символа'
						}

						if (values.title.length <= 0) {
						
							errors.title = 'В заголовке должно быть как минимум больше одного символа'
						
						} else if (values.title.length > 150) {

							errors.title = 'В заголовке НЕ должно быть больше 150 символов'

						} 
						
						return errors
					}}
					onSubmit={(values, {setSubmitting}) => {
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
					}}
				>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting
				}) => (
						<form onSubmit={handleSubmit} className={styles.addingPostField__form}>
							<input 
								type='text'
					            name='title'
					            onChange={handleChange}
					            onBlur={handleBlur}
					            value={values.title}
					            className={styles.addingPostField__title}
					            placeholder='Title'/>
							<input 
								type='text'
					            name='tags'
					            onChange={handleChange}
					            onBlur={handleBlur}
					            value={values.tag}
					            className={styles.addingPostField__tag}
					            placeholder='Tag'/>
							<textarea
								type='text'
					            name='body'
					            onChange={handleChange}
					            onBlur={handleBlur}
					            value={values.text}
					            className={styles.addingPostField__text}
					            placeholder='Text'></textarea>
					        {errors.body && touched.body ? <ErrorMessage text={errors.body} /> : ''}
					        {errors.title && touched.title ? <ErrorMessage text={errors.title} /> : ''}
							<button
								type='submit'
								className={styles.addingPostField__createBtn}>Create</button>

						</form>	
					)}
				</Formik>
		} else {
			render = <ModificationPosts />
		}

		return (
			<div className={styles.addingPostField}>
				<div className={styles.addingPostField__btns}>
					<button 
						className={styles.addingPostField__closeBtn}
						onClick={this.props.closeField.bind(this, null)}>Close</button>
					<button 
						className={styles.addingPostField__modificateBtn}
						onClick={() => {
							this.setState((state) => {
								return {
									modificateField: !state.modificateField
								}
							})
						}}>Modification my posts</button>				
				</div>
				{render}
			</div>
		)
	}
}

export default AddingPostField
import React from 'react';
import styles from 'Styles/main.sass'
import {Formik} from 'formik'
import axios from 'axios'

import ErrorMessage from './ErrorMessage.jsx'

class FormPost extends React.Component {
	render() {
		return (
			<Formik
				initialValues={{
					title: this.props.title || '', 
					tags: this.props.tags || '', 
					body: this.props.body || '', 
				}}
				validate={values => {
					let errors = {}

					if (values.body.length < 15) {
						errors.body = 'Text should contain 15 letter'
					}

					if (values.title.length <= 5) {
					
						errors.title = 'Title should contain 5 letter'
					
					} else if (values.title.length > 150) {

						errors.title = 'Title not should contain 150 letter'

					} 

					if (values.tags.split(' ').length > 5) {
						errors.tags = 'Quantity tag\s not should exceed 5'
					}
					
					return errors
				}}
				onSubmit={this.props.responseFunction}
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
				        {errors.title && touched.title ? <ErrorMessage text={errors.title} /> : ''}
						<input 
							type='text'
				            name='tags'
				            onChange={handleChange}
				            onBlur={handleBlur}
				            value={values.tags}
				            className={styles.addingPostField__tag}
				            placeholder='Tag'/>
				        {errors.tags && touched.tags ? <ErrorMessage text={errors.tags} /> : ''}
						<textarea
							type='text'
				            name='body'
				            onChange={handleChange}
				            onBlur={handleBlur}
				            value={values.body}
				            className={styles.addingPostField__text}
				            placeholder='Text'></textarea>
				        {errors.body && touched.body ? <ErrorMessage text={errors.body} /> : ''}
						<button
							type='submit'
							className={styles.addingPostField__createBtn}>Create</button>

					</form>	
				)}
			</Formik>
		)
	}
}

export default FormPost


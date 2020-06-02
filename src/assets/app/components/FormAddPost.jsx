import React from 'react';
import styles from '../styles/main.sass'
import {Formik} from 'formik'
import axios from 'axios'

import ErrorMessage from './ErrorMessage.jsx'

class FormAddPost extends React.Component {
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
						errors.body = 'В тексте должно быть как минимум больше 15 символов'
					}

					if (values.title.length <= 0) {
					
						errors.title = 'В заголовке должно быть как минимум больше одного символа'
					
					} else if (values.title.length > 150) {

						errors.title = 'В заголовке НЕ должно быть больше 150 символов'

					} 

					if (values.tags.split(' ').length > 5) {
						errors.tags = 'Количество тегов не должно превышать 5'
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
						<input 
							type='text'
				            name='tags'
				            onChange={handleChange}
				            onBlur={handleBlur}
				            value={values.tags}
				            className={styles.addingPostField__tag}
				            placeholder='Tag'/>
						<textarea
							type='text'
				            name='body'
				            onChange={handleChange}
				            onBlur={handleBlur}
				            value={values.body}
				            className={styles.addingPostField__text}
				            placeholder='Text'></textarea>
				        {errors.body && touched.body ? <ErrorMessage text={errors.body} /> : ''}
				        {errors.title && touched.title ? <ErrorMessage text={errors.title} /> : ''}
				        {errors.tags && touched.tags ? <ErrorMessage text={errors.tags} /> : ''}
						<button
							type='submit'
							className={styles.addingPostField__createBtn}>Create</button>

					</form>	
				)}
			</Formik>
		)
	}
}

export default FormAddPost


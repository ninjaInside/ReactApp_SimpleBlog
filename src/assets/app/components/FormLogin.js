import React from 'react'
import styles from '../styles/main.sass'
import {Formik} from 'formik'
import axios from 'axios'

class FormLogin extends React.Component {
	render() {
		return (<Formik
					initialValues={{
						username: '', 
						email: '', 
						password: '', 
					}}
					validate={values => {
						let errors = {}

						if (values.username.length > 15) {

							errors.username = 'Слишком длинное имя'

						} else if (!values.username) {

							errors.username = 'Нет имени'

						}

						if (!values.email) {

							errors.email = 'Нет почты'

						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {

							errors.email = 'Почта неверна'						

						}

						if (!values.password) {
						
							errors.password = 'Нет пароля'
							
						}
						
						return errors
					}}
					onSubmit={(values, {setSubmitting}) => {
						axios({
							method: 'post',
							url: 'http://localhost:8000/api/v1/auth/login/',
							headers: {
								'Content-type': 'application/json'
							},
							data: values
						})
						.then((response) => {
							if (response.status === 200) {
								return localStorage.setItem('AuthKey', response.data.key)
							} 

							throw new Error()
						})
						.catch((e) => {
							console.log('error')
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
						<form onSubmit={handleSubmit} className={styles.authField__form}>
							<input
								type='text'
					            name='username'
					            onChange={handleChange}
					            onBlur={handleBlur}
					            value={values.text}
					            className={styles.authField__input}
							/>
							{errors.username && touched.username && errors.username}
							<input
								type='email'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								className={styles.authField__input}
							/>
							{errors.email && touched.email && errors.email}
							<input
								type='password'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								className={styles.authField__input}
							/>
							{errors.password && touched.password && errors.password}
							<button
								type='submit'
							>Sign in</button>
						</form>	
					)}
				</Formik>)
	}
}

export default FormLogin
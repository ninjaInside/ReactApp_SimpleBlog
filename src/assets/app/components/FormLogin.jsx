import React from 'react'
import styles from '../styles/main.sass'
import {Formik} from 'formik'
import axios from 'axios'

import ErrorMessage from './ErrorMessage.jsx'

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
								localStorage.setItem('AuthKey', response.data.key)
								localStorage.setItem('Login', values.username)
								localStorage.setItem('Email', values.email)

								return 
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
					            placeholder='Username'
							/>
							{errors.username && touched.username ? <ErrorMessage text={errors.username} /> : ''}
							<input
								type='email'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								className={styles.authField__input}
								placeholder='Email'
							/>
							{errors.email && touched.email ? <ErrorMessage text={errors.email} /> : ''}
							<input
								type='password'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								className={styles.authField__input}
								placeholder='Password'
							/>
							{errors.password && touched.password ? <ErrorMessage text={errors.password} /> : ''}
							<button
								type='submit'
								className={styles.authField__btn}
							>Sign in</button>
						</form>	
					)}
				</Formik>)
	}
}

export default FormLogin
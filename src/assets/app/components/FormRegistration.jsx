import React from 'react'
import styles from '../styles/main.sass'
import {Formik} from 'formik'
import axios from 'axios'

import ErrorMessage from './ErrorMessage.jsx'
import { Link } from 'react-router-dom'

class FormRegistration extends React.Component {
	render() {
		return (<Formik
					initialValues={{
						username: '', 
						email: '', 
						password1: '', 
						password2: '',
					}}
					validate={values => {
						let errors = {}

						if (values.username.length > 15) {

							errors.username = 'Too long username'

						} else if (!values.username) {

							errors.username = 'No username'

						}

						if (!values.email) {

							errors.email = 'No email'

						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {

							errors.email = 'Wrong email'						

						}

						if (!values.password1) {
						
							errors.password = 'No password'
							

						} else if (values.password1 !== values.password2) {

							errors.password1 = 'Пароли не совпадают'

						} else if (values.password1.length < 8) {

							errors.password1 = 'Пароль слишком короткий'

						} else if (/(.)\1\1/g.test(values.password1)) {

							errors.password1 = 'В пароле не должно быть знаков которые повторяются 3 раза'

						}

						return errors
					}}
					onSubmit={(values, {setSubmitting}) => {
						axios({
							method: 'post',
							url: 'https:\/\/govnoblog.herokuapp.com/api/v1/auth/registration/',
							headers: {
								'Content-type': 'application/json'
							},
							data: values
						})
						.then((response) => {
							if (response.status === 201) {
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
						<>
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
									name='password1'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									className={styles.authField__input}
									placeholder='Password'
								/>
								<input
									type='password'
									name='password2'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.allowPassword}
									className={styles.authField__input}
									placeholder='Allow Passord'
								/>
								{errors.password1 && touched.password1 ? <ErrorMessage text={errors.password1} /> : ''}
								<button
									type='submit'
									className={styles.authField__btn}
								>Sign up</button>
							</form>

							<Link 
								className={styles.authField__toggleBtn}
								to={'/users/login'}>
								Already registration?
							</Link>
						</>
					)}
				</Formik>)
	}
}

export default FormRegistration
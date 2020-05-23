import React from 'react'
import styles from '../styles/main.sass'
import {Formik} from 'formik'
import axios from 'axios'

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

							errors.username = 'Слишком длинное имя'

						} else if (!values.username) {

							errors.username = 'Нет имени'

						}

						if (!values.email) {

							errors.email = 'Нет почты'

						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {

							errors.email = 'Почта неверна'						

						}

						if (!values.password1 || !values.password2) {
						
							errors.password = 'Нет пароля'
							

						} else if (values.password1 !== values.password2) {

							errors.password1 = 'Пароли не совпадают'

						} else if (values.password1.length < 8) {

							errors.password1 = 'Пароль слишком короткий'

						} else if (!/[0-9]{3}/g.test(values.password1)) {

							errors.password1 = 'Пароль должен содержать как минимум три разных цифры'

						} else if (/(.)\1\1/g.test(values.password1)) {

							errors.password1 = 'В пароле не должно быть знаков которые повторяются 3 раза'

						}

						return errors
					}}
					onSubmit={(values, {setSubmitting}) => {
						axios({
							method: 'post',
							url: 'http://localhost:8000/api/v1/auth/registration/',
							headers: {
								'Content-type': 'application/json'
							},
							data: values
						})
						.then((response) => {
							if (response.status === 201) {
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
								name='password1'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								className={styles.authField__input}
							/>
							<input
								type='password'
								name='password2'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.allowPassword}
								className={styles.authField__input}
							/>
							{errors.password1 && touched.password1 && errors.password1}
							<button
								type='submit'
							>Sign up</button>
						</form>	
					)}
				</Formik>)
	}
}

export default FormRegistration
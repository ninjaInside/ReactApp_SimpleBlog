import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/main.sass'

class AuthorizationButton extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			token: this.props.token,
			isToggle: true
		}

		this.handleToggleBtnList = this.handleToggleBtnList.bind(this)
	} 

	handleToggleBtnList(e) {
		e.stopPropagation()

		let _ = this

		document.documentElement.addEventListener('click', function handleHideButton(e) {
			if (e.target.className !== '_3ujDIxQN2zoK3sTK9PfSJL'
				&& e.currentTarget.className !== '_3ujDIxQN2zoK3sTK9PfSJL'
				) {

				_.setState({
					isToggle: true 
				})

			}

			document.documentElement.removeEventListener('click', handleHideButton)
		})

		

		this.setState((state) => {
			return {
				isToggle: !this.state.isToggle
			}
		})

	}

	render() {
		let buttonList

		if (!this.state.token) {

			buttonList = (
				<>
					<li className={styles.authButton__buttonItem}> <a href="//">S</a> </li>
					<li className={styles.authButton__buttonItem}> <a href="//">S</a> </li>
				</>
			)

		} else {

			buttonList = (
				<>
					<li className={styles.authButton__buttonItem}> <a href="//">A</a> </li>
					<li className={styles.authButton__buttonItem}> <a href="//">E</a> </li>
					<li className={styles.authButton__buttonItem}> <a href="//">L</a> </li>
					<li className={styles.authButton__buttonItem}> <a href="//">P</a> </li>
				</>
			)

		}

		return (
			<div className={styles.authButton}>
				<div className={styles.authButton__user}>
					<button className={styles.authButton__buttonUser} onClick={this.handleToggleBtnList}>U</button>
				</div>
				<nav className={styles.authButton__nav}>
					<ul className={styles.authButton__buttonList}>
						{this.state.isToggle ? '' : buttonList}
					</ul>
				</nav>
			</div>
		)
	}
}

export default AuthorizationButton



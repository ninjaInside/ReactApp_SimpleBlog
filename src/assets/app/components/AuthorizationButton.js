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
		this.handleBlurHideBtn = this.handleBlurHideBtn.bind(this)
	} 

	handleToggleBtnList(e) {
		this.setState((state) => {
			return {
				isToggle: !this.state.isToggle
			}
		})

	}

	handleBlurHideBtn() {
		this.setState({
			isToggle: true
		})
	}

	render() {
		let buttonList

		if (!this.state.token) {

			buttonList = (
				<>
					<li className={styles.authButton__buttonItem}> <a href="./users.html">S</a> </li>
					<li className={styles.authButton__buttonItem}> <a href="./users.html">S</a> </li>
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
					<button 
						className={styles.authButton__buttonUser} 
						onClick={this.handleToggleBtnList} 
						onBlur={this.handleBlurHideBtn}>U</button>
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



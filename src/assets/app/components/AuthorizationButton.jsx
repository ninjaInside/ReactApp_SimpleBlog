import React from 'react';
import styles from '../styles/main.sass'

class AuthorizationButton extends React.Component {
	constructor(props) {
		super(props)

		this.toggleButtonREF = React.createRef()

		this.state = {
			token: this.props.token,
			isToggle: false
		}

		this.handleToggleBtnList = this.handleToggleBtnList.bind(this)
		this.handleBlurHideBtn = this.handleBlurHideBtn.bind(this)
		this.handleToggleMenu = this.handleToggleMenu.bind(this)
	} 

	handleToggleBtnList(e) {
		this.setState((state) => {
			return {
				isToggle: !this.state.isToggle
			}
		})

	}

	handleBlurHideBtn(e) {
		setTimeout(() => {
			this.setState({
				isToggle: true
			})
		}, 200)
	}

	handleToggleMenu(list) {
		console.log(this.toggleButtonREF.current)
		if (this.state.isToggle) return list 
		return ''
	}

	render() {
		let buttonList

		if (!this.state.token) {

			buttonList = (
				<nav className={styles.authButton__nav} ref={this.toggleButtonREF}>
					<ul className={styles.authButton__buttonList}>
						<li className={styles.authButton__buttonItem}> <a href="users.html">S</a> </li>
					</ul>
				</nav>
			)

		} else {

			buttonList = (
				<nav className={styles.authButton__nav} ref={this.toggleButtonREF}>
					<ul className={styles.authButton__buttonList}>
						<li className={styles.authButton__buttonItem}> 
						<button 
							onClick={this.props.toggleFieldAdd.bind(this, true)}>A</button> 
						</li>
						<li className={styles.authButton__buttonItem}> <a href="//">E</a> </li>
					</ul>
				</nav>
			)

		}

		return (
			<div className={styles.authButton} onBlur={this.handleBlurHideBtn}>
				<div className={styles.authButton__user}>
					<button 
						className={styles.authButton__buttonUser} 
						onClick={this.handleToggleBtnList} 
						>U</button>
				</div>
				{this.handleToggleMenu(buttonList)}
			</div>
		)
	}
}

export default AuthorizationButton



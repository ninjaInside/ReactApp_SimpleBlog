import React from 'react';
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

	handleBlurHideBtn(e) {
		setTimeout(() => {
			this.setState({
				isToggle: true
			})
		}, 200)
	}

	render() {
		let buttonList

		if (!this.state.token) {

			buttonList = (
				<>
					<li className={styles.authButton__buttonItem}> <a href="users.html">S</a> </li>
				</>
			)

		} else {

			buttonList = (
				<>
					<li className={styles.authButton__buttonItem}> 
					<button 
						onClick={this.props.toggleFieldAdd.bind(this, true)}>A</button> 
					</li>
					<li className={styles.authButton__buttonItem}> <a href="//">E</a> </li>
					<li className={styles.authButton__buttonItem}> <a href="//">L</a> </li>
				</>
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



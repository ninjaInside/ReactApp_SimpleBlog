import React from 'react';
import styles from 'Styles/main.sass'
import { Link } from 'react-router-dom'

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
	} 

	handleToggleBtnList(e) {
		let buttonListREF = this.toggleButtonREF.current

		buttonListREF.classList.toggle(styles.authButton_menuOpen)
	}

	handleBlurHideBtn(e) {
		let buttonListREF = this.toggleButtonREF.current

		setTimeout(() => {
			buttonListREF.classList.remove(styles.authButton_menuOpen)
		}, 0)
	}

	render() {
		let buttonList

		if (!this.state.token) {

			buttonList = (
				<>
					<li className={styles.authButton__buttonItem}> <Link to={'/'}>H</Link> </li>
					<li className={styles.authButton__buttonItem}> <Link to={'/users'}>R</Link> </li>
				</>
			)

		} else {

			buttonList = (
				<>
					<li className={styles.authButton__buttonItem}> 
						<Link to={'/'}>H</Link> 
					</li>
					<li className={styles.authButton__buttonItem}> 
						<Link to={'/postChanges'}>A</Link> 
					</li>
					<li className={styles.authButton__buttonItem}> 
						<Link to={'/users'}>R</Link> 
					</li>
				</>
			)

		}

		return (
			<div className={styles.authButton} onBlur={this.handleBlurHideBtn}>
				<div className={styles.authButton__user}>
					<button 
						className={styles.authButton__buttonUser} 
						onClick={this.handleToggleBtnList} 
						>{this.props.username}</button>
				</div>
				<nav className={styles.authButton__nav}>
					<ul className={styles.authButton__buttonList} ref={this.toggleButtonREF}>
						{buttonList}
					</ul>
				</nav>
			</div>
		)
	}
}

export default AuthorizationButton



import React from 'react';
import styles from '../styles/main.sass'
import axios from 'axios'

import ModificationPosts from './ModificationPosts'

class AddingPostField extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			valueTag: '',
			modificateField: null
		}

		this.handleCloseField = this.handleCloseField.bind(this)
		this.handleUpdateValue = this.handleUpdateValue.bind(this)
		this.handleAddPost = this.handleAddPost.bind(this)
	}

	handleAddPost() {

	}

	handleUpdateValue() {

	}

	handleCloseField() {

	}

	render() {
		let render

		if (!this.state.modificateField) {
			render = <form>
						<input type="text" placeholder="Title" className={styles.addingPostField__title} />
						<input type="text" placeholder="Tag" className={styles.addingPostField__tag} />
						<textarea placeholder="Text" className={styles.addingPostField__text}></textarea>
						<button className={styles.addingPostField__createBtn}>Create</button>
					</form>
		} else {
			render = <ModificationPosts />
		}

		return (
			<div className={styles.addingPostField}>
				<div className={styles.addingPostField__btns}>
					<button 
						className={styles.addingPostField__closeBtn}
						onClick={this.props.closeField.bind(this, null)}>Close</button>
					<button 
						className={styles.addingPostField__modificateBtn}
						onClick={() => {
							this.setState((state) => {
								return {
									modificateField: !state.modificateField
								}
							})
						}}>Modification my posts</button>				
				</div>
				{render}
			</div>
		)
	}
}

export default AddingPostField
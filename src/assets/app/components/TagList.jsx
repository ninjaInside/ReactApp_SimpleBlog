import React from 'react';
import styles from '../styles/main.sass'

import TagItem from './TagItem.jsx'
import WarningMessage from './WarningMessage.jsx'

class TagList extends React.Component {
	render() {
		return (
			<div className={styles.appField__tagList}>
				<TagItem text='all' key='all' handleSortByTag={this.props.handleSortByTag.bind(this, null)} />
				{this.props.tagList.map(item => {
					return <TagItem 
								text={item.name} 
								key={item.name} 
								handleSortByTag={this.props.handleSortByTag.bind(this, item.slug)} />
				})}
			</div>
		)
	}
}

export default TagList

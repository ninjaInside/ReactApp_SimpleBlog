import React from 'react'; 

class Wrraper extends React.Component {
	render() {
		return (
			<div className={this.props.selectorName}>
				{this.props.children}
			</div>
		)
	}
}

export default Wrraper
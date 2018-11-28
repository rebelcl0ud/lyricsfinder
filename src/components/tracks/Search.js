// remember to bring in Component on React import; extends component will error out
import React, { Component }from 'react';
import axios from 'axios';
// needing to access global state we import Consumer from context file
import { Consumer } from '../../context';

class Search extends Component {
	// this will be a type of form, usually in react each input to have its own state
	// you want 'name' on form to match state, ie: trackTitle
	// onChange is needed; wont allow typing, controlled component
	state = {
		trackTitle: '',
	}

	// = (e) => will remove the need to place bind in input prop ex: onChange={this.onChange.bind(this)}
	onChange = (e) => {
		this.setState({trackTitle: e.target.value})
	}

	render() {
		// value snags the text as set up in context file
		return (
			<Consumer>
			{value => {
				return (
					<div className='card card-body mb-4 p-4'>
						<h1 className='display-4 text-center'>
							<i className='fas fa-glasses'></i> Search for Song
						</h1>
						<p className='lead text-center'>Snag Lyrics</p>
						<form>
							<div className='form-group'>
								<input 
									type='text' 
									className=' form-control form-control-lg' 
									placeholder='enter song'
									name='trackTitle'
									value={this.state.trackTitle} 
									onChange={this.onChange}
								/>
							</div>
						</form>
					</div>
				)
			}}
			</Consumer>
		)
	}
}

export default Search;
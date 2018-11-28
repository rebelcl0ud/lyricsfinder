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
	/**
	trackTitle; if there were to be multiple input forms sep onChange for each would be >_<
	workaround would be to swap {trackTitle: e.target.value} to {[e.target.name]: e.target.value}
	where it will be snagging name from name prop in input below
	**/
	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	findTrack = (dispatch, e) => {
		e.preventDefault();

		axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MMKEY}`)
			.then((res) => {
				/**
					data fetched, put into payload which will be used as stated in context file 
					once type is checked and matched it will return updated state, display accordingly
				**/
				dispatch({
					type: 'SEARCH_TRACKS',
					payload: res.data.message.body.track_list
				})
				// clears search input after form search submit
				this.setState({trackTitle: ''})
			})
			.catch((err) => {
				console.error(err);
			})

	}

	render() {
		// value snags the text as set up in context file
		return (
			<Consumer>
			{value => {
				// checking for dispatch fn access, placed in context, which will run when form is submitted, bind
				// console.log(value)
				
				// destructuring to snag dispatch, used in form onSubmit below
				const { dispatch } = value;
				
				return (
					<div className='card card-body mb-4 p-4'>
						<h1 className='display-4 text-center'>
							<i className='fas fa-glasses'></i> Search for Song
						</h1>
						<p className='lead text-center'>Snag Lyrics</p>
						<form onSubmit={this.findTrack.bind(this, dispatch)}>
							<div className='form-group'>
								<input 
									type='text' 
									className=' form-control form-control-lg mb-4' 
									placeholder='enter song'
									name='trackTitle'
									value={this.state.trackTitle} 
									onChange={this.onChange}
								/>
								<button type='submit' className='btn btn-info btn-lg btn-block mb-5'>submit</button>
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
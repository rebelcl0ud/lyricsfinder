import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layouts/Spinner';
// 'go back' button; link needed from react-router
import { Link } from 'react-router-dom';
// react-moment instead of moment
// https://momentjs.com/
// https://www.npmjs.com/package/react-moment
import Moment from 'react-moment';

class Lyrics extends Component {
	// only need this data for this particular component; comp state vs app level state
	state = {
		track: {},
		lyrics: {},
	}

	componentDidMount() {
		axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MMKEY}`)
			.then((res) => {
				// console.log(res.data);
				this.setState({ lyrics: res.data.message.body.lyrics })

				// to snag now track info to add to lyrics page
				return axios
					.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MMKEY}`)		
			})
			.then((res) => {
				// because 2nd call is returned in prev then, another then is chained to snag results from return above
				console.log(res.data);
				this.setState({ track: res.data.message.body.track })
			})
			.catch((err) => {
				console.error(err)
			});
	}

	render() {
		const { track, lyrics } = this.state;

		if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
			return <Spinner/>
		}
		else {
			return (
				<React.Fragment>
					<Link to='/' className='btn btn-dark btn-small mb-4'>go back</Link>
					<div className='card'>
						<h5 className='card-header'>
							{track.track_name} | <span className='text-secondary'>{track.artist_name}</span>
						</h5>
						<div className='card-body'>
							<p className='card-text'>{lyrics.lyrics_body}</p>
						</div>
						<div className='card-footer'>
							<ul className='list-group list-group-flush'>
								<li className='list-group-item'><strong>Album: </strong>{track.album_name}</li>
								<li className='list-group-item'><strong>Genre: </strong>{track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</li>
								<li className='list-group-item'>
									<strong>Explicit: </strong>
									{track.explicit === 0 ? 'No' : 'Yes'}
								</li>
								<li className='list-group-item'><strong>Release Date: </strong><Moment format='DD MMM YYYY'>{track.first_release_date}</Moment></li>

							</ul>	
						</div>
					</div>
				</React.Fragment>
			)
		}
	}
}

export default Lyrics;
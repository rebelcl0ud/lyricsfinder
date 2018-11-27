import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

/**
global type state
Provider will wrap around every other component
w.e state put in this Provider will be able to be accessed using 'consumer' 
**/

export class Provider extends Component {
	state = {
		track_list: [],
		heading: 'Top 10 Tracks',
	}

	componentDidMount() {
		axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MMKEY}`)
			.then((res) => {
				// console.log(res.data);
				this.setState({track_list: res.data.message.body.track_list})
			})
			.catch((err) => {
				console.error(err)
			});
	}

	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		)
	}
}

// similar to redux/connect
export const Consumer = Context.Consumer;
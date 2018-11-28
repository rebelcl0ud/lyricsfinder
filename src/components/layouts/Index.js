// this component file will hold components for API
import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';

// functional component
const Index = () => {
	return (
		<React.Fragment>
			<Search />
			<Tracks />
		</React.Fragment>
	)
}

export default Index;
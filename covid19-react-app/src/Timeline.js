import React from 'react';
import './index.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
        };
    }

    componentDidMount() {
        const url = 'https://pomber.github.io/covid19/timeseries.json';

        fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({
                countries: data,
            })
        })
        .catch((error) => console.log(error));


    }

    render() {
        return <div/>
    }
}

export default Timeline;

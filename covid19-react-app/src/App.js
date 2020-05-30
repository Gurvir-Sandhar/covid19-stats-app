import React from "react";
import GlobalStats from './GlobalStats.js';
import './index.css';

//main app code
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            global: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        const url = 'https://api.covid19api.com/summary'

        fetch(url)
        .then(response => response.json())
        .then((data) => {
            //console.log((data));
            this.setState({
                countries: data.Countries,
                global: data.Global,
                isLoaded: true,
            });
            //console.log(this.state.countries);
            //console.log(this.state.global);
        })
        .catch((error) => console.log(error))
    }

    render() {
        if(!this.state.isLoaded) {
            return <div/>
        }
        const {countries, global, isLoaded} = this.state;
        return (
            <div className="App">
                <header className="header">
                    <h1>COVID-19 STATISTICS</h1>
                </header>
                <GlobalStats data={global} />
            </div>
        );
    };
}

export default App;
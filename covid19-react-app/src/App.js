import React from "react";
import GlobalStats from './GlobalStats.js';
import CountryDD from './CountryDD.js';
import Timeline from './Timeline.js';
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
        const url = 'https://api.covid19api.com/summary';

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
                    <h1><b>COVID-19 STATISTICS</b></h1>
                </header>
                <div className="components">
                    <GlobalStats data={global} />
                    <CountryDD data={countries} />
                    {/*<Timeline />*/}
                </div>
            </div>
        );
    };
}

export default App;
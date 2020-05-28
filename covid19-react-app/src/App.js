import React from "react";
import './index.css';

/*function App() {
    return (
        <div className="App">
            <header>Hello World</header>
        </div>
    );
}

export default App; */

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        const url = 'https://api.covid19api.com/summary'

        fetch(url)
        .then(response => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    }
    render() {
        return (
            <div className="App">
                <header className="header">
                    <h1>COVID-19 STATISTICS</h1>
                </header>
            </div>
        )
    }
}

export default App;
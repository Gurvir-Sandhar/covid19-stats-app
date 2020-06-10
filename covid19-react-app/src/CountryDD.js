import React from "react";
import Chart from 'chart.js';
import Timeline from './Timeline.js';
import './index.css';

// -CountryDD takes in individual country data as props
// -creates a drop down menu of all countries
// -called from App.js in render function
// -passes data to Timeline component 
//  
class CountryDD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            data: [],
            countryVal: "",
            isLoaded: false,
        };

        this.displayCountry = this.displayCountry.bind(this);
    }

    componentDidMount() {
        //using prop data to create new array of country names
        //to use for the drop down menu
        let i = 0;
        var x;
        let temp = [];
        for(x in this.props.data) {
            temp[i] = this.props.data[x].Country;
            this.state.data[i] = this.props.data[x];
            i++;
        }
        this.setState ({
            names: temp,
            isLoaded: true,
        })
    }

    displayCountry() {
        //get selected country from drop down
        var country = document.getElementById('country').value;
        
        this.setState ({
            countryVal: country,
        })

        //deletes any previously rendered chart 
        //and creates new canvas for new chart
        var parent = document.getElementById('parentChart');
        var child = document.getElementById('CountryChart');
        parent.removeChild(child);
        parent.innerHTML='<canvas id="CountryChart"></canvas>';
        var ctx = document.getElementById('CountryChart');

        //setting up data to use in chart
        const myCountry = this.state.data.filter(x => x.Country === country);
        let cases = myCountry[0].TotalConfirmed;
        let recovered = myCountry[0].TotalRecovered;
        let deaths = myCountry[0].TotalDeaths;

        //create chart
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total Cases', 'Recovered', 'Deaths'],
                datasets: [{
                    label: `# of People (${country})`,
                    data: [cases, recovered, deaths],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }); 
    }

    render() {
        const {names, isLoaded} = this.state;
        if(!isLoaded) {
            return <div/>
        }
        const countrylist = names.map((name) =>
            <option key={name} value={name}>{name}</option>
        );
        return (
            <div className="CountryDD">
                <h3>Choose a Country:</h3>
                <select name="country" id="country" onChange={this.displayCountry}>
                    {countrylist}
                </select>
                <div id="parentChart">
                    <canvas id="CountryChart"></canvas>
                </div>
                <Timeline key={this.state.countryVal} data={this.state.countryVal}/>
            </div>
        );
    }
}

export default CountryDD;
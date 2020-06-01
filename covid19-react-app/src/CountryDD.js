import React from "react";
import Chart from 'chart.js';
import './index.css';

//drop down menu to choose country and render a chart of data for that country
class CountryDD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            data: [],
            isLoaded: false,
        };

        this.displayCountry = this.displayCountry.bind(this);
    }

    componentDidMount() {
        //console.log(this.props.data);
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
        //console.log(this.state.data);
    }

    displayCountry() {
        var country = document.getElementById('country').value;
        var ctx = document.getElementById('CountryChart');
        const myCountry = this.state.data.filter(x => x.Country == country);
        let cases = myCountry[0].TotalConfirmed;
        let recovered = myCountry[0].TotalRecovered;
        let deaths = myCountry[0].TotalDeaths;
        console.log(myCountry);
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total Cases', 'Recovered', 'Deaths'],
                datasets: [{
                    label: '# of People',
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
    }//end displayCountry()

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
                <canvas id="CountryChart" width="600" height="600">
                </canvas>
            </div>
        );
    }
}

export default CountryDD;
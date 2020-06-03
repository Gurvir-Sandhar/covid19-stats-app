import React from 'react';
import Chart from 'chart.js'
import './index.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            isLoaded: false,
        };

        this.displayChart = this.displayChart.bind(this);
    }

    componentDidMount() {
        const url = 'https://pomber.github.io/covid19/timeseries.json';

        fetch(url)
        .then(response => response.json())
        .then((data) => {
            //console.log(data);
            this.setState({
                countries: data,
                isLoaded: true,
            })
        })
        .catch((error) => console.log(error));
    }

    displayChart() {
         //chart code
         const {countries} = this.state;
         //data for chart
         let dates = [];
         let cases = [];
         let deaths = [];
 
         var x;
         let i = 0;
         for(x in countries.US){
             dates[i] = countries.US[x].date;
             cases[i] = countries.US[x].confirmed;
             deaths[i] = countries.US[x].deaths;
             i++;
         }
         console.log(countries.US);
         console.log(dates);
         console.log(cases);
         console.log(deaths);
         
         let parent = document.getElementsByClassName('timeline');
         parent.innerHTML='<canvas id="linechart" width="600" height="600"></canvas>';
         let ctx = document.getElementById('linechart');
         var myChart = new Chart(ctx, {
             type: 'line',
             data: {
                 labels: dates,
                 datasets: [{
                     label: "Cases",
                     data: cases,
                     borderColor: "#3e95cd",
                     fill: false
                 },
                 {
                     label: "Deaths",
                     data: deaths,
                     borderColor: "#8e5ea2",
                     fill: false
                 }]
             },
             options: {
                 title: {
                     display: true,
                     text: "timeline"
                 }
             }
         });//end chart 
    }

    render() {
        if(!this.state.isLoaded){
            return <div/>
        }
        
        const {countries} = this.state;
        let dates = [];
        let cases = [];
        let deaths = [];

        var x;
        let i = 0;
        for(x in countries.US){
            dates[i] = countries.US[x].date;
            cases[i] = countries.US[x].confirmed;
            deaths[i] = countries.US[x].deaths;
            i++;
        }

        let jan = {confirmed: 0 ,deaths: 0};
        let feb = {confirmed: 0 ,deaths: 0};
        let mar = {confirmed: 0 ,deaths: 0};
        let apr = {confirmed: 0 ,deaths: 0};
        let may = {confirmed: 0 ,deaths: 0};
        let jun = {confirmed: 0 ,deaths: 0};
        let jul = {confirmed: 0 ,deaths: 0};
        let aug = {confirmed: 0 ,deaths: 0};
        let sep = {confirmed: 0 ,deaths: 0};
        let oct = {confirmed: 0 ,deaths: 0};
        let nov = {confirmed: 0 ,deaths: 0};
        let dec = {confirmed: 0 ,deaths: 0};

        var y;
        for(y in dates){
            //string manipulation to get month
            let str = dates[y].substring(5);  
            let pos = str.search('-');
            let month = str.substring(0,pos);
            let num = parseInt(month)

            switch(num){
                case 1:
                    jan.confirmed += cases[y];
                    jan.deaths += deaths[y];
                    break;
                case 2:
                    feb.confirmed += cases[y];
                    feb.deaths =+ deaths[y];
                    break;
                case 3:
                    mar.confirmed += cases[y];
                    mar.deaths += deaths[y];
                    break;
                case 4:
                    apr.confirmed += cases[y];
                    apr.deaths += deaths[y];
                    break;
                case 5:
                    may.confirmed += cases[y];
                    may.deaths += deaths[y];
                    break;
                case 6:
                    jun.confirmed += cases[y];
                    jun.deaths += deaths[y];
                    break;
                case 7:
                    jul.confirmed += cases[y];
                    jul.deaths += deaths[y];
                    break;
                case 8:
                    aug.confirmed += cases[y];
                    aug.deaths += deaths[y];
                    break;
                case 9:
                    sep.confirmed += cases[y];
                    sep.deaths += deaths[y];
                    break;
                case 10:
                    oct.confirmed += cases[y];
                    oct.deaths += deaths[y];
                    break;
                case 11:
                    nov.confirmed += cases[y];
                    nov.deaths += deaths[y];
                    break;
                case 12:
                    dec.confirmed += cases[y];
                    dec.deaths += deaths[y];
                    break;
                default:
                    console.log("unexpected month value");
            }
        }
        console.log(jan);
        console.log(dec);
        console.log(jun);


        console.log(countries.US);
        //console.log(dates);


        return (
            <div className="timeline">

            </div>
        )
    }
}

export default Timeline;

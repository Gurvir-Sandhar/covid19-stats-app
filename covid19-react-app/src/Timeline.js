import React from 'react';
import Chart from 'chart.js'
import './index.css';

//
// -Timeline makes api call for daily data
// -takes in value of selected country as prop
// -creates line chart of monthly increase in cases/deaths
//
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
            this.displayChart();
        })
        .catch((error) => console.log(error));
    }

    displayChart() {
         const {countries} = this.state;

         //objects to keep track of data for selected country.
         //initialized with NaN values so chart does not plot
         //zero values.
         let jan = {confirmed: NaN ,deaths: NaN};
         let feb = {confirmed: NaN ,deaths: NaN};
         let mar = {confirmed: NaN ,deaths: NaN};
         let apr = {confirmed: NaN ,deaths: NaN};
         let may = {confirmed: NaN ,deaths: NaN};
         let jun = {confirmed: NaN ,deaths: NaN};
         let jul = {confirmed: NaN ,deaths: NaN};
         let aug = {confirmed: NaN ,deaths: NaN};
         let sep = {confirmed: NaN ,deaths: NaN};
         let oct = {confirmed: NaN ,deaths: NaN};
         let nov = {confirmed: NaN ,deaths: NaN};
         let dec = {confirmed: NaN ,deaths: NaN};

         let selectedData;
         //get data for selected country
         if(this.props.data == "United States of America") {
         //special case since we are using 2 different apis and the drop
         //down menu country names do not all match with this apis names.
         //problem occurs with mutli-worded countries, but not all.
            selectedData = countries["US"];
         }
         else {
            selectedData = countries[this.props.data]; 
         }

         //go through selected data and find end of month totals 
         var y;
         for(y in selectedData){
            let date = selectedData[y].date;
             switch(date){
                 case "2020-1-31":
                     jan.confirmed = selectedData[y].confirmed;
                     jan.deaths  = selectedData[y].deaths;
                     break;
                 case "2020-2-28":
                     feb.confirmed = selectedData[y].confirmed;
                     feb.deaths = selectedData[y].deaths;
                     break;
                 case "2020-2-29":
                     feb.confirmed = selectedData[y].confirmed;
                     feb.deaths = selectedData[y].deaths;
                     break;
                 case "2020-3-31":
                     mar.confirmed = selectedData[y].confirmed;
                     mar.deaths = selectedData[y].deaths;
                     break;
                 case "2020-4-30":
                     apr.confirmed = selectedData[y].confirmed;
                     apr.deaths = selectedData[y].deaths;
                     break;
                 case "2020-5-31":
                     may.confirmed = selectedData[y].confirmed;
                     may.deaths = selectedData[y].deaths;
                     break;
                 case "2020-6-30":
                     jun.confirmed = selectedData[y].confirmed;
                     jun.deaths = selectedData[y].deaths;
                     break;
                 case "2020-7-31":
                     jul.confirmed = selectedData[y].confirmed;
                     jul.deaths = selectedData[y].deaths;
                     break;
                 case "2020-8-31":
                     aug.confirmed = selectedData[y].confirmed;
                     aug.deaths = selectedData[y].deaths;
                     break;
                 case "2020-9-30":
                     sep.confirmed = selectedData[y].confirmed;
                     sep.deaths = selectedData[y].deaths;
                     break;
                 case "2020-10-31":
                     oct.confirmed = selectedData[y].confirmed;
                     oct.deaths = selectedData[y].deaths;
                     break;
                 case "2020-11-30":
                     nov.confirmed = selectedData[y].confirmed;
                     nov.deaths = selectedData[y].deaths;
                     break;
                 case "2020-12-31":
                     dec.confirmed = selectedData[y].confirmed;
                     dec.deaths = selectedData[y].deaths;
                     break;
                 default:
                     //do nothing
            }
        }
        //console.log(selectedData[5].date)
        //console.log(countries[this.props.data])

         //deletes previously rendered chart and and creates a new canvas for new chart
         let parent = document.getElementById('timeline');
         let child = document.getElementById('linechart');
         parent.removeChild(child);
         parent.innerHTML = '<canvas id="linechart"></canvas>';
         let ctx = document.getElementById('linechart');

         //creates chart
         var myChart = new Chart(ctx, {
             type: 'line',
             data: {
                 labels: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
                 datasets: [{
                     label: "Total Cases" ,
                     data: [jan.confirmed, feb.confirmed, mar.confirmed, apr.confirmed, may.confirmed, jun.confirmed, jul.confirmed, 
                            aug.confirmed, sep.confirmed, oct.confirmed, nov.confirmed, dec.confirmed],
                     borderColor: "#3e95cd",
                     fill: false
                 },
                 {
                     label: "Total Deaths",
                     data: [jan.deaths, feb.deaths, mar.deaths, apr.deaths, may.deaths, jun.deaths, jul.deaths, aug.deaths,
                            sep.deaths, oct.deaths, nov.deaths, dec.deaths],
                     borderColor: "rgba(255, 99, 132, 1)",
                     fill: false
                 }]
             },
             options: {
                 spanGaps: true,
                 title: {
                     display: true,
                     text: `COVID-19 2020 Growth (${this.props.data})`
                 }
             }
         });
    }

    render() {
        if(!this.state.isLoaded){
            return <div/>
        }
       
        return (
            <div id="timeline">
                <canvas id="linechart"></canvas>
            </div>
        )
    }
}

export default Timeline;

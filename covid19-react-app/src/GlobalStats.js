import React from "react";
import './index.css';

//outputs world wide stats
class GlobalStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            global: props.global,
            totalcases: 0,
            totaldeaths: 0,
            totalrecovered: 0,
            isLoaded: false,
        
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.setState({
            totalcases: this.props.data.TotalConfirmed,
            totaldeaths: this.props.data.TotalDeaths,
            totalrecovered: this.props.data.TotalRecovered,
            isLoaded: true,
        })
    }



    render() {
        if(!this.state.isLoaded) {
            return <div/>
        }
        const {totalcases, totaldeaths, totalrecovered} = this.state;
        let cases = totalcases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let deaths = totaldeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let recovered = totalrecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (
            <div className="global">
                <h2>Global Statistics:</h2>
                <h3>Total Conrfirmed Cases: {cases} </h3>   
                <h3>Total Deaths: {deaths}</h3>
                <h3>Total Recovered: {recovered}</h3>
            </div>
        );
    };   
} 

export default GlobalStats;
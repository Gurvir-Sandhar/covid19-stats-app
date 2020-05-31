import React from "react";
import './index.css';

class CountryDD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        //console.log(this.props.data);
        let i = 0;
        var x;
        let temp = [];
        for(x in this.props.data) {
            temp[i] = this.props.data[x].Country;
            i++;
        }
        this.setState ({
            names: temp,
            isLoaded: true,
        })
        //console.log(this.state.names)
    }

    render() {
        const {names, isLoaded} = this.state;
        if(!isLoaded) {
            return <div/>
        }
        const countrylist = names.map((name) =>
            <option value={name}>{name}</option>
        );
        return (
            <div>
                <select name="country" id="country">
                    {countrylist}
                </select>
            </div>
        );

    }
}

export default CountryDD;
import React, { Component } from "react";

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: "",
            CName: props.CName,
            id: props.id,
            letter: props.letter,
            value: props.value,
            handleCallback: props.handleCallback,
            numbers: props.numbers
        }
    }
    
    handleClick = () => {
        if (this.state.numbers[1] == this.state.id) {
            this.props.onClick(1);
            this.setState({CName: "option_t"});
        } else {
            this.props.onClick(-1);
            this.setState({CName: "option_f"})
        }
    }
    componentDidMount() {            
        const apiUrl = `https://restcountries.com/v3.1/all `;

        fetch(apiUrl)
        .then(response => {return response.json()})
        .then(data => {
            this.setState({value: data[this.state.numbers[0] - this.state.numbers[1] + this.state.id].name.common})
        })
        .catch(error => {
            console.log('Error fetching data', error);
        })
    }

    render() {
        return(
            <div id={"d_" + this.state.id} className={this.state.CName} onClick={this.handleClick}><p className="option_p">{this.state.letter} {this.state.value}</p></div>
        )
    }
}

export default Option;
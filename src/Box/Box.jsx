import React, { Component } from "react";
import './Box.css';
import Option from './Option.jsx';
import Button from './Button.jsx';
import Svg from './try_again_svg.jsx'



class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      capital: "",
      correctCapital: "",
      condition: 0,
      count: 0,
      NCountry: Math.floor(Math.random() * 255),
      NOpt: Math.floor(Math.random() * 4) +1,
      apiData: {},
      clickedId: 0,
    }
    this.getCondition = this.getCondition.bind(this);
    this.getNew = this.getNew.bind(this);
    this.getRes = this.getRes.bind(this);
  }
  
  getCondition = (value, id) => {
    this.setState({ 
      condition: value,
      clickedId: id
    });

    if (value == 1) {
      this.setState((prevState) => {
        return {
          count: prevState.count + 1
        };
      });
    }
  };

  getNew = (value) => {
    this.setState({ condition: value }, () => {
      if (value === true) {
        this.setState({
          condition: 0,
          clickedId: 0,
        });
        this.setValues();
      } else {
        this.setState({
          condition: -2,
          clickedId: 0,
        });
      }
    });
  };

  getRes = (value) => {
    this.setState({ condition: value}, () => {
      if (value === true) {
        this.setState({
          condition: 0,
          clickedId: 0,
          count: 0
        });
      }
    });
  };

  componentDidMount() {
    const apiUrl = `https://restcountries.com/v3.1/all `;

    fetch(apiUrl)
    .then(response => {return response.json()})
    .then(data => {
      this.setState({apiData: data,
        loading: false,
        capital: data[this.state.NCountry].capital[0],
        correctCapital: data[this.state.NCountry].name.common
      });
    })
    .catch(error => {
      console.log('Error fetching data', error);
    })
  }

  componentDidUpdate() {
    const options = [];
      if (this.state.condition == -1) { 
        for (let i = 0; i < 4; i++) {
          options.push(document.getElementById("d_" + (i+1).toString()));
        }
        options[this.state.NOpt - 1].setAttribute("class", "option_t");
      }
  }

  setValues = () => {
    const numCountry = Math.floor(Math.random() * 255);
    const numOpt = Math.floor(Math.random() * 4) +1;
    this.setState({
      NCountry: numCountry,
      NOpt: numOpt,
      capital: this.state.apiData[numCountry].capital[0]
    });

    return [numCountry, numOpt];    
  }

  renderContent() {
    const { getCondition, NCountry, NOpt, condition, capital } = this.state;
    console.log(this.state.NOpt);
    if (condition === 0) {
      return (
        <div className="main">
          <div className="content">
            <p className="question">{capital} is the capital of</p>
            <div className="option_box">
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={1} letter="A" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={2} letter="B" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={3} letter="C" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={4} letter="D" />
            </div>
          </div>
        </div>
      );
    } else if (condition === 1) {
      return (
        <div className="main_answered">
          <div className="content">
            <p className="question">{this.state.capital} is the capital of</p>
            <div className="option_box">
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={1} letter="A" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={2} letter="B" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={3} letter="C" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={4} letter="D" />
            </div>
            <Button CName="btn_correct" onClick={this.getNew} value="Next" condition={true}/>
          </div>
        </div>
      );
    } else if (condition === -1) {
      return (
        <div className="main_answered">
          <div className="content">
            <p className="question">{capital} is the capital of</p>
            <div className="option_box">
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={1} letter="A" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={2} letter="B" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={3} letter="C" />
              <Option CName="option" onClick={this.getCondition} numbers={[NCountry, NOpt]} id={4} letter="D" />
            </div>
            <Button CName="btn_incorrect" onClick={this.getNew} condition={false} value="See Results" />
          </div>
        </div>
      );
    } else if (condition === -2) {
        return (
          <div className="main_results">
            <div className="content_results">
              <Svg />
              <div className="texts">
                <p className="results">Results</p>
                <p className="res_count">You got {this.state.count} correct answers</p>
              </div>
              <Button CName="btn_try_again" onClick={this.getRes} condition={true} value="Try Again" />
          </div>
        </div>
        )
    }
  }

  render() {
    return(
      <div className="parent">
        {this.renderContent()}
      </div>
    )
  }
  
}

export default Box;
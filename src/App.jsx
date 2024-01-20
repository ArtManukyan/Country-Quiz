import React, { Component } from 'react';
import './App.css';
import CQuiz from './CQuiz/CQuiz';
import Box from './Box/Box';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NCountry: 0,
      NOpt: 0
    }
  }

  // componentDidMount() {
  //   const numCountry = Math.floor(Math.random() * 255);
  //   const numOpt = Math.floor(Math.random() * 4) +1;
  //   this.setState({NCountry: numCountry});
  //   this.setState({NOpt: numOpt});
  //   const apiUrl = `https://restcountries.com/v3.1/all `;

  //   fetch(apiUrl)
  //   .then(response => {return response.json()})
  //   .then(data => {
  //     this.setState({ apiData: data, loading: false });
  //   })
  //   .catch(error => {
  //     console.log('Error fetching data', error);
  //   })
  // }

  render() {
    return (
      <React.StrictMode>
        <div className="App">
          <div className="parent">
            <CQuiz />
            <Box />
          </div>
        </div>
        </React.StrictMode>
      );
  }
  
}




// setTimeout(
//   () => {
//       const opt = document.getElementById("d_1"); 
//       console.log(opt.props);

// }, 100);


export default App;

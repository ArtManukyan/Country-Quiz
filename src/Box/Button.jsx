import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      CName: props.CName,
      shouldSetCondition: props.condition
    };
  }

  handleClick = () => {
    this.props.onClick(this.state.shouldSetCondition);
  }

  render() {
    return (
      <button onClick={this.handleClick} className={this.state.CName}>
        {this.state.value}
      </button>
    );
  }
}

export default Button;
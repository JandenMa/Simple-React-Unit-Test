import React, { Component } from "react";
import { add, sub, multi, div, factorial } from "../utils/calc.util";
import "./calc.component.css";

export default class Calc extends Component {
  state = {
    addNum1: 0,
    addNum2: 0,
    subNum1: 0,
    subNum2: 0,
    multiNum1: 0,
    multiNum2: 0,
    divNum1: 1,
    divNum2: 1,
    factorialNum: 0
  };

  handleNumChange = (sign, e) => {
    switch (sign) {
      case "addNum1":
        this.setState({
          addNum1: e.target.value || 0
        });
        break;
      case "addNum2":
        this.setState({
          addNum2: e.target.value || 0
        });
        break;
      case "subNum1":
        this.setState({
          subNum1: e.target.value || 0
        });
        break;
      case "subNum2":
        this.setState({
          subNum2: e.target.value || 0
        });
        break;
      case "multiNum1":
        this.setState({
          multiNum1: e.target.value || 0
        });
        break;
      case "multiNum2":
        this.setState({
          multiNum2: e.target.value || 0
        });
        break;
      case "divNum1":
        this.setState({
          divNum1: e.target.value || 0
        });
        break;
      case "divNum2":
        this.setState({
          divNum2: e.target.value && e.target.value != 0 ? e.target.value : 1
        });
        break;
      case "factorialNum":
        this.setState({
          factorialNum: e.target.value || 0
        });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="calc-box">
        <div>
          <label>Add:&emsp;</label>
          <input
            type="number"
            value={this.state.addNum1}
            onChange={e => this.handleNumChange("addNum1", e)}
          />
          <span>&ensp;+&ensp;</span>
          <input
            type="number"
            value={this.state.addNum2}
            onChange={e => this.handleNumChange("addNum2", e)}
          />
          <span>&ensp;=&ensp;</span>
          <span>{add(this.state.addNum1, this.state.addNum2)}</span>
        </div>
        <div>
          <label>Sub:&emsp;</label>
          <input
            type="number"
            value={this.state.subNum1}
            onChange={e => this.handleNumChange("subNum1", e)}
          />
          <span>&ensp;-&ensp;</span>
          <input
            type="number"
            value={this.state.subNum2}
            onChange={e => this.handleNumChange("subNum2", e)}
          />
          <span>&ensp;=&ensp;</span>
          <span>{sub(this.state.subNum1, this.state.subNum2)}</span>
        </div>
        <div>
          <label>Multi:&emsp;</label>
          <input
            type="number"
            value={this.state.multiNum1}
            onChange={e => this.handleNumChange("multiNum1", e)}
          />
          <span>&ensp;×&ensp;</span>
          <input
            type="number"
            value={this.state.multiNum2}
            onChange={e => this.handleNumChange("multiNum2", e)}
          />
          <span>&ensp;=&ensp;</span>
          <span>{multi(this.state.multiNum1, this.state.multiNum2)}</span>
        </div>
        <div>
          <label>Div:&emsp;</label>
          <input
            type="number"
            value={this.state.divNum1}
            onChange={e => this.handleNumChange("divNum1", e)}
          />
          <span>&ensp;÷&ensp;</span>
          <input
            type="number"
            value={this.state.divNum2}
            onChange={e => this.handleNumChange("divNum2", e)}
          />
          <span>&ensp;=&ensp;</span>
          <span>{div(this.state.divNum1, this.state.divNum2)}</span>
        </div>
        <div>
          <label>Factorial:&emsp;</label>
          <input
            type="number"
            value={this.state.factorialNum}
            onChange={e => this.handleNumChange("factorialNum", e)}
          />
          <span>&ensp;!&ensp;</span>
          <span>&ensp;=&ensp;</span>
          <span>{factorial(this.state.factorialNum)}</span>
        </div>
      </div>
    );
  }
}

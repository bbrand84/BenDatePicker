/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable camelcase */
/* eslint-disable keyword-spacing */
/* eslint-disable prefer-const */
/* eslint-disable padded-blocks */
/* eslint-disable semi */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import './BenDatepicker.css';

export default class YearPicker extends Component {

  /**
  * React's constructor method
  */
  constructor(props) {
    super(props);
    this.state = {
      handleChangeCallback: props.onChangeYear ? props.onChangeYear : (e) => console.log('no OnChange callback method passed from parent'),
      year_selected: props.selected ? props.selected : new Date().getFullYear(),
      recent_year: new Date().getFullYear()
    }

  }

  /**
  * Creates a list of year 'surrounding' the recent year.
  * Returns array of *numBefore* years before recent year + recent year + *numAfter* recent year.
  * param: numBefore: number of years to display before recent year
  * param: numAfter: number of years to display after recent year
  */
  createYearList(numBefore, numAfter) {
    let result = [];
    let last_index = 0;
    for(let before = this.state.recent_year - numBefore; before < this.state.recent_year; before++) {
      result[last_index] = before;
      last_index += 1;
    }
    for(let after = this.state.recent_year; after <= this.state.recent_year + numAfter; after++) {
      result[last_index] = after;
      last_index += 1;
    }
    return result;

  }

  handleChange(event) {
    this.setState({ year_selected: event.target.value });
    this.state.handleChangeCallback(event.target.value);
  }

  /**
  * React's rendering method
  */
  render() {
    return(
      <select value={this.state.year_selected} onChange={(event) => this.handleChange(event)}>
        {this.createYearList(3, 15).map(x => <option key={x} value={x} >{x}</option>)}
      </select>
    );
  }

}

YearPicker.PropTypes = {
  onChangeYear: React.PropTypes.bool,
  selected: React.PropTypes.func
 }

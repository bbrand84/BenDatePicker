/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import BenDatepicker from './BenDatepicker';

export default class App extends Component {
  render() {
    return (
      <div>
          <h1>BenDatePicker</h1>
          <BenDatepicker locale="de" />
          <BenDatepicker locale="en-us" />
          <BenDatepicker locale="fr" />
        </div>
    );
  }
}

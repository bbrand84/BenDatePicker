import React, { Component } from 'react';
import BenDatepicker from './BenDatepicker'

export default class App extends Component {
  render() {
    return (
    	<div>
      		<h1>Hello, World!</h1>
      		<BenDatepicker  locale="de" />
          <BenDatepicker  locale="en-us" />
          <BenDatepicker  locale="de-de" />
      	</div>
    );
  }
}

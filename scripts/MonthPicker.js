import React, { Component } from 'react';
import './BenDatepicker.css'
import * as moment from 'moment';

export default class MonthPicker extends Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<select>
				  <option value="january">january</option>
				  <option value="february">february</option>
				  <option value="march">march</option>
				  <option value="april">april</option>
				  <option value="may">may</option>
				  <option value="june">june</option>
				  <option value="july">july</option>
				  <option value="august">august</option>
				  <option value="september">september</option>
				  <option value="october">october</option>
				  <option value="november">november</option>
				  <option value="december">december</option>

			</select>
			);
	}

}
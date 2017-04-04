import React, { Component } from 'react';
import './BenDatepicker.css'

export default class MonthPicker extends Component {

	/**
	* React's constructor method
	*/
	constructor(props){
		super(props);
		this.state = {
			month_selected: props.selected ? props.selected : 12,
			handleChangeCallback: props.onChangeMonth ? props.onChangeMonth : (e) => console.log("no OnChange callback method passed from parent")
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		this.setState({month_selected: event.target.value});
		this.state.handleChangeCallback(event.target.value);
	}

	/**
	* React's rendering method
	*/
	render(){
		return(
			<select value={this.state.month_selected} onChange={(event) => this.handleChange(event)}>
				  <option value="1">{new Date(0,1,0).toLocaleString('de', {  month: 'long' })}</option>
					<option value="2">{new Date(0,2,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="3">{new Date(0,3,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="4">{new Date(0,4,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="5">{new Date(0,5,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="6">{new Date(0,6,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="7">{new Date(0,7,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="8">{new Date(0,8,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="9">{new Date(0,9,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="10">{new Date(0,10,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="11">{new Date(0,11,0).toLocaleString('de', {  month: 'long' })}</option>
				  <option value="12">{new Date(0,12,0).toLocaleString('de', {  month: 'long' })}</option>

			</select>
			);
	}

}

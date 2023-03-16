import React, {useEffect, useState, useRef} from 'react';
import './reminder.css';
// import Time from './Time';
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'  



const Btn = ({name, appearance}) => {
	return (
		<button className={appearance}>
			{name}
		</button>
	);
}
function Time() {
	const [selectedTime, setSelectedTime] = useState(new Date());
	const [time, setTime] = useState(new Date());
  
	const Time = ()=>{
	  TimeAgo.addLocale(en);
  
	  const timeAgo = new TimeAgo("en-US");
	  const inSeconds = new Date(time).getTime();
	  const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);
	 
	  return(
		<p style={{textAlign:"center",position:"absolute",top:"180px",left:"0",width:"100%"}}>{minutesAgo}</p>
	  )
  
	}
	const onChangeTime = (e)=>{
	  setTime(e.target.value)
	}
	return (
	  <div style={{textAlign:"center",marginTop:"0px"}}>
		<input type="datetime-local"  onChange={onChangeTime}  min="2018-06-07T00:00" max={new Date()}/>
		<Time/>
	  </div>
	)
  }

const ReminderForm = ({addReminder}) => {
	let input;
	return (
		<form onSubmit={(e) => {
				e.preventDefault();
				if (!input.value) {
					return
				}
				addReminder(input.value);
				input.value = '';
			}}>
			<input 
				ref={node => { input = node }}
				placeholder="add a task"
			/>
			<Btn name="Add Reminder" appearance="primary"/>
		</form>
	);
};

const ReminderItem = ({item, minutesAgo, remove}) => {
	
	return (
		<li className="remind-list">
			<div className="input-container">
				<p className="note">{item.text}</p>
			</div>
			<p>{minutesAgo}</p>
			<p className='remove-btn' onClick={() => {
				remove(item.id)		
			}}>Remove</p>
		</li>
	);
};

const ReminderList = ({items, minutesAgo, remove}) => {
	const reminderNode = items.map((item, minutesAgo) => {
		return <ReminderItem item={item} minu={minutesAgo} remove={remove} key={item.id}/>
	});
	return (
		<ul>{reminderNode}</ul>
	);
}

window.id = 0;

class Reminder extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	
	addReminder(value) {
		const reminder = {text: value, id: window.id++};
		this.state.data.push(reminder);
		this.setState({data: this.state.data});
	}
	
	handleRemove(id) {
		const remainder = this.state.data.filter((item) => {
			if (item.id !== id) return item;
		})
		this.setState({data: remainder});
	}
	
	render() {
		return (
			<div className='reminderApp'>
			<div className="reminder">
				<h1 className='reminders-status'>{this.state.data.length} Reminders</h1>
				<Time time={this.state.time}/>
				<ReminderList 
					items={this.state.data}
					remove={this.handleRemove.bind(this)}
					/>
					
				<ReminderForm addReminder={this.addReminder.bind(this)}/>
			</div>
			</div>
		);
	}
}

export default Reminder

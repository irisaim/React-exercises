import React,{useState} from 'react';
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'  

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

export default Time;

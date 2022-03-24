import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const displayMessage = () => {
    if (props.time) {
      return `Appointment at ${props.time}`;
    } else {
      return "No Appointments";
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>}
      </article>
  );
}
import React, {useState} from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const displayMessage = () => {
    if (props.time) {
      return `Appointment at ${props.time}`;
    } else {
      return "No Appointments";
    }
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  const comfirmDelete = () => {
    transition(CONFIRM);
  }

  function cancel(){
    transition(DELETE);
    props.cancelInterview(props.id)
    .then(() => {transition(EMPTY)});
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === CONFIRM && 
      <Confirm message="Delete the appointment?" onCancel ={back} onConfirm = {cancel}/>}

      {mode === DELETE && <Status message="Deleting"/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={comfirmDelete}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onSave={save}
        onCancel={back}
        />
      )}

      {mode === EDIT && 
      <Form 
      interviewers={props.interviewers} 
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      onSave={save}
      onCancel={back} 
      />}

    </article>
  );
}

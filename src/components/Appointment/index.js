import React, {useState} from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  }

  const comfirmDelete = () => {
    transition(CONFIRM);
  }

  function cancel(){
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  }

  function close() {
    back();
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

      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={close}/>}

      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={close}/>}

    </article>
  );
}

import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";
import PropTypes from 'prop-types';

/*
Our <InterviewerList> receives three props:
interviewers: array - an array of objects as seen above
setInterviewer: function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
interviewer: number - a number that represents the id of the currently selected interviewer
*/

export default function InterviewerList(props) {

  const interviewerData = props.interviewers.map((e) => {
    return (
      <InterviewerListItem
        key={e.id}
        name={e.name}
        avatar={e.avatar}
        selected={e.id === props.value}
        setInterviewer={() => props.onChange(e.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerData}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

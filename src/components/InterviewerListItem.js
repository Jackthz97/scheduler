import React from "react";
import className from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const InterviewerClass = className("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li onClick={props.setInterviewer} className={InterviewerClass}>
      <img
        className="interviewers__item-image"
        key={props.id}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

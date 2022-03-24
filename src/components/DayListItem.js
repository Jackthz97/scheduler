import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {

  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function(spots) {
    let string = "";
    if (spots === 0) {
      string = "no spots remaining";
      return string;
    } else if (spots === 1) {
      string = "1 spot remaining";
      return string;
    } else {
      string = `${spots} spots remaining`;
      return string;
    }
  }

  return (
    <li className={DayListItemClass} onClick={props.setDay} >
      <h2 className="test--regular">{props.name}</h2>
      <h3 className="test--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
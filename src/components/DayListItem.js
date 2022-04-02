import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = function (spots) {
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
};
export default function DayListItem(props) {
  const { setDay, name, spots, selected } = props;

  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });


  return (
    <li className={DayListItemClass} onClick={setDay}>
      <h2 className="test--regular">{name}</h2>
      <h3 className="test--light">{formatSpots(spots)}</h3>
    </li>
  );
}

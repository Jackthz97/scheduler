import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayData = props.days.map((date) => {
    return (
      <DayListItem
        key={date.id}
        name={date.name}
        spots={date.spots}
        selected={date.name === props.value}
        setDay={() => props.onChange(date.name)}
      />
    );
  });
  return <ul>{dayData}</ul>;
}

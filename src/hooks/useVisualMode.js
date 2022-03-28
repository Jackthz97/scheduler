import React, { useState } from "react";

export function useVisualMode(string) {
  const [mode, setMode] = useState(string);
  const [history, setHistory] = useState([string]);

  const transition = (prop, replace = false) => {
    if (!replace) {
      setMode(prop);
      setHistory([...history, mode]);
    } else {
      history.slice(0, -1);
      setMode(prop);
    }
  };

  const back = () => {
    setHistory(history.slice(0, -1));
    if (history.length) setMode(history[history.length - 1]);
  };
  return { mode, transition, back };
}

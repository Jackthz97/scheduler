import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);


  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const daysObj = state.days;
    let spots = 0;
    let dayId = 0;
    for (let day of daysObj) {
        for (let i = 0; i < day.appointments.length; i++) {
          if (day.appointments[i] === id) {
            dayId = day.id;
            for (let j = 0; j < day.appointments.length; j++) {
              const newId = day.appointments[j];
              if (!appointments[newId].interview) {
                spots++;
              }
            }
          }
        }
      }

      const newDayId = dayId - 1;
      
      const day = {
        ...state.days[newDayId],
        spots: spots
      }

      let days = [
        ...state.days,
      ]
      days.splice(newDayId, 1, day);


    return axios.put(`api/appointments/${id}`, {interview: interview})
    .then(() => setState({...state, appointments, days}));

  }


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const daysObj = state.days;
    let spots = 0;
    let dayId = 0;
    for (let day of daysObj) {
        for (let i = 0; i < day.appointments.length; i++) {
          if (day.appointments[i] === id) {
            dayId = day.id;
            for (let j = 0; j < day.appointments.length; j++) {
              const newId = day.appointments[j];
              if (!appointments[newId].interview) {
                spots++;
              }
            }
          }
        }
      }

      const newDayId = dayId - 1;
      
      const day = {
        ...state.days[newDayId],
        spots: spots
      }

      let days = [
        ...state.days,
      ]
      days.splice(newDayId, 1, day);


    return axios.delete(`api/appointments/${id}`)
    .then(() => setState({...state, appointments, days}));
  }

  return {state, setDay, bookInterview, cancelInterview};
}

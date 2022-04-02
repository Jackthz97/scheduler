export function getAppointmentsForDay(state, day) {
  const ids = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      state.days[i].appointments.map(data => 
        ids.push(state.appointments[data])
      );
      return ids;
    }
  }
  return [];
}

export function getInterview(state, interview) {
  let interviewObj = {};
  if (!interview) {
    return null;
  } else {
    let id = interview.interviewer;
    interviewObj["student"] = interview.student;
    interviewObj["interviewer"] = state.interviewers[id];
    return interviewObj;
  }
}

export function getInterviewersForDay(state, day) {
  const ids = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      state.days[i].interviewers.map(data => 
        ids.push(state.interviewers[data])
      );
      return ids;
    }
  }
  return [];
}

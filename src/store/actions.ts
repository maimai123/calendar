export const setMonthLists = (payload) => {
  return {
    type: "SET_MONTH_LIST",
    payload,
  };
};

export const setCurrentMonths = (payload) => {
  return {
    type: "SET_CURRENT_MONTH",
    payload,
  };
};

export const setCurrentDates = (payload) => {
  return {
    type: "SET_CURRENT_DATE",
    payload,
  };
};

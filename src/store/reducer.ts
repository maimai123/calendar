import { combineReducers } from "redux";
import moment from "moment";

const defaultState = {
  monthList: [],
  currentMonth: moment().format("YYYY-MM"),
  currentDate: moment().format("YYYY-MM-DD"),
};

const calendar = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_MONTH_LIST":
      return {
        ...state,
        monthList: action.payload,
      };
    case "SET_CURRENT_MONTH":
      return {
        ...state,
        currentMonth: action.payload,
      };
    case "SET_CURRENT_DATE":
      return {
        ...state,
        currentDate: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({ calendar });

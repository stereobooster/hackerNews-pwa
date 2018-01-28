import { TOP_LIST, NEW_LIST, SHOW_LIST, ASK_LIST, JOB_LIST } from "../const";

const initState = {
  top: [],
  news: [],
  show: [],
  ask: [],
  job: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case TOP_LIST:
      return {
        ...state,
        top: action.data
      };
    case NEW_LIST:
      return {
        ...state,
        newest: action.data
      };
    case SHOW_LIST:
      return {
        ...state,
        show: action.data
      };
    case ASK_LIST:
      return {
        ...state,
        ask: action.data
      };
    case JOB_LIST:
      return {
        ...state,
        job: action.data
      };
    default:
      return state;
  }
};

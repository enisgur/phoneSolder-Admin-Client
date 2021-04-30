import { quoteTypes } from "../actions/types";

const initialState = {
  loading: true,
  error: false,
  quotes: null,
  lastQuote: null,
};

export default function quotesFunc(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case quotes.GET_ALL_PARTS:
    case quoteTypes.GET_QUOTES_BETWEEN_DATE:
    case quoteTypes.PUT_UPDATE_QUOTE:
      return {
        ...state,
        loading: false,
        quotes: payload,
        error: false,
      };
    case quoteTypes.QUOTES_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case quoteTypes.GET_QUOTES_FAIL:
      return {
        ...state,
        // quotes: null,
        loading: false,
        error: true,
      };
    // case quotes.POST_PART_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     lastQuote: payload,
    //   };
    // case quotes.DELETE_PART_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    default:
      return state;
  }
}

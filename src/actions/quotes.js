import axios from "axios";

// get my custom func for edit dates
import checkDate from "../Components/functions/checkDateBetween";

// IMPORT ALERT HERE
import { axiosURL, quoteTypes } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

// SET AXIOS PROXY BASEURL
axios.defaults.baseURL = axiosURL;

// Get All Parts
// export const getParts = () => async (dispatch) => {
//   try {
//     const res = await axios.get("/api/v1/parts");

//     dispatch({
//       type: part.GET_ALL_PARTS,
//       payload: res.data,
//     });

//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// Get All Parts
export const getQuotesBetweenDate = (startDate, endDate) => async (
  dispatch
) => {
  try {
    dispatch({ type: quoteTypes.QUOTES_LOADING });
    const res = await axios.get(`/api/v1/quote/all/${startDate}/${endDate}`);

    // console.log(res.data);
    dispatch({
      type: quoteTypes.GET_QUOTES_BETWEEN_DATE,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    console.log("from quotes actions", err.message);
    dispatch({
      type: quoteTypes.GET_QUOTES_FAIL,
    });
  }
};

// post quote (Edit quotes);
export const postQuote = (formdata, startDate, endDate) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  if (startDate === null || startDate === undefined || !startDate)
    startDate = checkDate.getStartDate();
  if (endDate === null || endDate === undefined || !endDate)
    endDate = checkDate.getEndDate();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formdata);

  try {
    // const res = await axios.put(`/api/v1/quote/${formdata.id}`, body, config);
    const editedQuote = await axios.put(
      `/api/v1/quote/${formdata.id}`,
      body,
      config
    );

    const res = await axios.get(`/api/v1/quote/all/${startDate}/${endDate}`);
    dispatch({ type: quoteTypes.QUOTES_LOADING });

    dispatch({
      type: quoteTypes.PUT_UPDATE_QUOTE,
      payload: res.data,
    });

    // DO I NEEED THIS ??
    // const thisYear = new Date().getFullYear();
    // const thisMonth = new Date().getMonth() + 1;
    // dispatch(getQuotesBetweenDate(`${thisYear}-${thisMonth}`));

    return {
      status: 200,
      msg: "Success, Updated",
      data: {
        startDate,
        endDate,
        id: editedQuote.data._id,
        quote: editedQuote.data,
      },
    };
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    //   }

    // dispatch({
    //   type: part.POST_PART_FAIL,
    // });

    // delete this bellow after set alert dispatches check auth.js Login User
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    console.error(err);
    return { status: 500, msg: "Fail" };
  }
};

// Post Part
// export const postPart = (formdata) => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify(formdata);

//   try {
//     const res = await axios.post("/api/v1/parts/addproduct", body, config);

//     dispatch({
//       type: part.POST_PART_SUCCESS,
//       payload: res.data,
//     });
//     return { status: 200, msg: "Success" };
//   } catch (err) {
//     // const errors = err.response.data.errors;
//     // if (errors) {
//     //     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     //   }

//     dispatch({
//       type: part.POST_PART_FAIL,
//     });

//     // delete this bellow after set alert dispatches check auth.js Login User
//     console.error(err);
//     return { status: 500, msg: "Fail" };
//   }
// };

// Delete Selected Part
// export const deletePart = (mId) => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const res = await axios.delete(`/api/v1/parts/${mId}`, config);
//     dispatch({
//       type: part.DELETE_PART_SUCCESS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: part.DELETE_PART_FAIL,
//     });
//     console.error(err);
//   }
// };

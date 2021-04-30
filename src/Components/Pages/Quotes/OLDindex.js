import React, { useState, useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";

// actions
import { getQuotesBetweenDate, postQuote } from "../../../actions/quotes";

// functions
import checkDate from "../../functions/checkDateBetween";

import DataTable from "../../DataTable";
import Modal from "../../Modal";
import modalContent from "./ModalContent";

function Index({ getQuotesBetweenDate, postQuote, quotes }) {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  // get and update between dates
  const [isDateSet, setIsDateSet] = useState(false);
  const [startDate, setStartDate] = useState(checkDate.getStartDate);
  const [endDate, setEndDate] = useState(checkDate.getEndDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();

  const getAllQuotes = useCallback(() => {
    const thisMonth = new Date().getMonth() + 1;

    // setStartDate(checkDate.getStartDate);
    // setEndDate(checkDate.getEndDate);

    getQuotesBetweenDate(thisMonth, thisMonth + 1);
    setIsDateSet(true);
    setIsError(false);
  }, [getQuotesBetweenDate]);

  useEffect(() => {
    // getQuotesBetweenDate("03", "06");
    // console.log("useEffect 1");
    getAllQuotes();
    setIsError(false);
  }, [getAllQuotes, postQuote]);

  useEffect(() => {
    // console.log("useEffect 2");

    if (quotes && quotes.quotes) {
      const finalData = [];
      quotes.quotes.map((quote) => {
        // if (quote.quote.isPriced) return null;
        if (quote.isDeleted) return null;
        if (!quote.isActive) return null;

        return finalData.push({
          id: quote._id,
          customer: quote.customerid.name,
          model: quote.device.model,
          device: quote.device.device,
          issue: quote.issue.issue,
          isPriced: String(quote.quote.isPriced),
          price: `$${quote.quote.price}`,
          tracking: quote.tracking,
        });
      });
      setIsError(false);
      return setData(finalData);

      // console.log(data);
    }
    // setData([]);
  }, [quotes]);

  useEffect(() => {
    if (isDateSet) {
      // console.log("date changed");
      getQuotesBetweenDate(startDate, endDate);
    }
    setIsError(false);
  }, [startDate, endDate, getQuotesBetweenDate]);

  const onEditClicked = (id) => {
    const getSelectedQuote = quotes.quotes.filter((quote) => quote._id === id);
    // console.log(getSelectedQuote[0]);
    setSelectedData(getSelectedQuote[0]);
    setIsModalOpen(true);
    setIsError(false);
    // console.log(getSelectedQuote[0]);
  };

  const onSelectDatesChange = (e) => {
    // console.log(e.target.name, e.target.value);
    if (e.target.name === "startDate") return setStartDate(e.target.value);
    if (e.target.name === "endDate") return setEndDate(e.target.value);
    setIsError(false);
  };

  const onModalSubmitCallback = async (d) => {
    try {
      // console.log("sssss", d);
      // postQuote(d, startDate, endDate);
      // const response = await postQuote(d, startDate, endDate);
      const response = await postQuote(d, startDate, endDate);
      // console.log(response);
      const resStartDate = checkDate.editDate(response.data.startDate);
      const resEndDate = checkDate.editDate(response.data.endDate);
      setStartDate(resStartDate);
      setEndDate(resEndDate);
      // const getSelectedQuote = quotes.quotes.filter(
      //   (quote) => quote._id === response.data.id
      // );
      setSelectedData(response.data.quote);
      // console.log(getSelectedQuote[0]);
      // console.log("asdasd", response);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    }
  };

  // const testData = [
  //   { id: 1, name: "Enis", email: "test@test.com" },
  //   { id: 2, name: "Enis", email: "test@test.com" },
  //   { id: 3, name: "Enis", email: "test@test.com" },
  //   { id: 4, name: "Enis", email: "test@test.com" },
  // ];
  const actions = {
    actions: [
      {
        isActive: true,
        label: "edit",
        class: "edit",
        callBack: (e) => {
          // console.log("Clicked", e.target.id);
          onEditClicked(e.target.id);
        },
        id: "ppp4",
        // id: 9000,
      },
      { isActive: true, label: "delete", class: "delete", id: "ppp2" },
      // { isActive: true, label: "delete", class: "delete", id: 9500 },
    ],
  };
  return (
    <>
      <div>
        <h1>QUOTES</h1>
        <p>See quotes and edit them in here.</p>
        <div>
          {/* <DataTable
          tableData={data}
          hide="id"
          searchable
          actions={actions}
        /> */}
          <form className="selectDates">
            <input
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={onSelectDatesChange}
              type="date"
            ></input>
            <input
              name="endDate"
              id="endDate"
              type="date"
              value={endDate}
              onChange={onSelectDatesChange}
            ></input>
          </form>
          {quotes.loading ? (
            <div className="table-loading">Loading...</div>
          ) : data.length > 0 && !quotes.error && isDateSet ? (
            <DataTable
              tableData={data}
              // hide="id"
              hide={["id", "tracking"]}
              searchable
              actions={actions}
            />
          ) : (
            <div className="error-table-nodata">
              No data found between selected dates
            </div>
          )}
        </div>
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedData && modalContent(selectedData, onModalSubmitCallback)}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  quotes: state.quotes,
});

export default connect(mapStateToProps, { getQuotesBetweenDate, postQuote })(
  Index
);

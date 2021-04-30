function bodyWithActions(
  column,
  index,
  buttons,
  headings,
  isManualHeading,
  renderManualHeading
) {
  //   column = // {id: 1, name: "Enis", email: "test@test.com"}
  //   console.log(
  //     column.id ? column.id + index : column._id ? column._id + index : index
  //   );
  //   const rowIndex

  //   console.log(buttons);
  //   console.log(index);
  //   console.log(column);
  return (
    <tr
      key={
        column.id ? column.id + index : column._id ? column._id + index : index
      }
    >
      {isManualHeading
        ? renderManualHeading.length > 0 &&
          renderManualHeading[0] &&
          renderManualHeading.map((row, i) => {
            // console.log(
            //   "tbody twooo",
            //   column[row.id]
            //     ? column[row.id]
            //     : column[row._id]
            //     ? column[row._id]
            //     : i
            // );

            return (
              <td
                key={
                  // column[row.id]
                  //   ? column[row.id]
                  //   : column[row._id]
                  //   ? column[row._id]
                  //   : i
                  column.id
                    ? `tbody${column.id + i + index}`
                    : column._id
                    ? `tbody${column._id + i + index}`
                    : i
                }
              >
                {column[row["data"]]}
              </td>
            );
          })
        : headings.length > 0 &&
          headings[0] &&
          headings.map((row, i) => {
            // console.log(column.id);
            // console.log(index);
            // console.log(
            //   "tbody three",
            //   column.id ? column.id : column._id ? column._id : i
            // );
            // console.log(
            //   column.id
            //     ? `tbody${column.id + i + index}`
            //     : column._id
            //     ? `tbody${column._id + i + index}`
            //     : i
            // );
            return (
              <td
                key={
                  // column[row.id]
                  //   ? column[row.id]
                  //   : column[row._id]
                  //   ? column[row._id]
                  //   : i
                  column.id
                    ? `tbody${column.id + i + index}`
                    : column._id
                    ? `tbody${column._id + i + index}`
                    : i
                }
              >
                {column[row]}
              </td>
            );
          })}

      {buttons && buttons[0] && (
        <td key={index} className="tBody-action">
          {buttons &&
            buttons[0] &&
            buttons.map((aButtons, i) => {
              // console.log(aButtons.id + i + index);
              //   console.log(index);
              //   console.log(
              //     aButtons.id
              //       ? aButtons.id + i + index
              //       : aButtons._id
              //       ? aButtons._id + i + index
              //       : i
              //   );
              //   console.log(Math.floor(Math.random() * 1000) + 1);

              return (
                <button
                  onClick={aButtons.callBack && ((e) => aButtons.callBack(e))}
                  key={
                    //   Math.floor(Math.random() * 1000) + 1
                    aButtons.id ? aButtons.id : aButtons._id ? aButtons._id : i
                  }
                  className={`table-button ${
                    aButtons.class ? aButtons.class : ""
                  }`}
                  id={column.id ? column.id : column._id}
                >
                  {aButtons.label ? aButtons.label : "No Label"}
                </button>
              );
            })}
        </td>
      )}
    </tr>
  );
}

export default bodyWithActions;

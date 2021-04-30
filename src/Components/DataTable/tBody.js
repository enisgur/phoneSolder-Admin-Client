import bodyWithActions from "./Funcs/tableBody/bodyWithActions";

export default function tBody(
  data,
  headings,
  actions,
  isManualHeading,
  renderManualHeading
) {
  let buttons = [];
  // console.log(data);
  function setButtonsLabel() {
    try {
      if (actions && actions.actions) {
        actions.actions.map((a) => {
          if (a.isActive) {
            buttons.push(a);
          }
          return buttons;
        });
      }
    } catch (err) {
      console.log("Set Buttons Label Error on tBody : ", err);
      return buttons;
    }
  }

  setButtonsLabel();

  try {
    return data[0] ? (
      actions && buttons ? (
        data.map((column, index) => {
          // console.log("tbody oneee", column.id, column._id, index);
          // console.log(
          //   "tbody oneee",
          //   column.id ? column.id : column._id ? column._id : index
          // );

          return bodyWithActions(
            column,
            index,
            buttons,
            headings,
            isManualHeading,
            renderManualHeading
          );
        })
      ) : (
        data.map((column, index) => {
          return (
            <tr key={column.id ? column.id : column._id ? column._id : index}>
              {isManualHeading
                ? renderManualHeading.length > 0 &&
                  renderManualHeading[0] &&
                  renderManualHeading.map((row, i) => {
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
                        {column[row.data]}
                      </td>
                    );
                  })
                : headings.length > 0 &&
                  headings[0] &&
                  headings.map((row, i) => {
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
            </tr>
          );
        })
      )
    ) : (
      <tr className="no-data">
        <td>No Data..</td>
      </tr>
    );
  } catch (err) {
    return <div>Table body Error</div>;
  }
}

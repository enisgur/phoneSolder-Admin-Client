import React from "react";

import DataTable from "../../../DataTable";

function Index() {
  const testData = [
    { id: 1, name: "Enis", email: "test@test.com" },
    { id: 2, name: "Enis", email: "test@test.com" },
    { id: 3, name: "Enis", email: "test@test.com" },
    { id: 4, name: "Enis", email: "test@test.com" },
  ];
  const actions = {
    actions: [
      {
        isActive: true,
        label: "edit",
        class: "edit",
        callBack: (e) => {
          console.log("Clicked", e.target.id);
          //   onEditClicked(e.target.id);
        },
        id: "ppp4",
        // id: 9000,
      },
      { isActive: true, label: "delete", class: "delete", id: "ppp2" },
      // { isActive: true, label: "delete", class: "delete", id: 9500 },
    ],
  };

  return (
    <div>
      <h1>Unpriced quotes</h1>
      <div>
        <DataTable
          tableData={testData}
          //   hide="id"
          //   hide={["id", "tracking"]}
          searchable
          actions={actions}
        />
      </div>
    </div>
  );
}

export default Index;

import React from "react";

import CreateForms from "../../../Forms/CreateForms";

function openModal(content, callback) {
  if (content) {
    const {
      device,
      issue,
      quote,
      status,
      isActive,
      isDeleted,
      _id,
      customerid,
      tracking,
      created,
    } = content;
    // console.log(device && Object.keys(device));
    // console.log(device && device["model"]);

    const formData = [
      {
        price: {
          label: "Price",
          type: "number",
          value: quote && quote["price"],
        },
      },
      {
        status: {
          label: "Status",
          type: "text",
          value: status && status,
        },
      },
      {
        model: {
          label: "Model",
          type: "text",
          value: device && device["model"],
          disabled: true,
        },
      },
      {
        device: {
          label: "Device",
          type: "text",
          value: device && device["device"],
          disabled: true,
        },
      },
      {
        issue: {
          label: "Issue",
          type: "text",
          value: issue && issue["issue"],
          disabled: true,
        },
      },
      {
        detail: {
          label: "Detail",
          type: "text",
          value: issue && issue["detail"],
          disabled: true,
        },
      },
      {
        note: {
          label: "Note",
          type: "textarea",
          value: issue && issue["note"],
          disabled: true,
        },
      },
      {
        customer: {
          label: "Customer",
          type: "text",
          value: customerid && customerid["name"],
          disabled: true,
        },
      },
      {
        tracking: {
          label: "Tracking",
          type: "text",
          value: tracking && tracking,
          disabled: true,
        },
      },
      {
        date: {
          label: "Date",
          type: "date",
          value: created && created.split("T")[0],
          disabled: true,
        },
      },
      {
        id: {
          label: "ID",
          type: "text",
          value: _id && _id,
          disabled: true,
        },
      },
    ];

    const onSubmitForm = (d) => {
      // console.log("gasd", d);
      callback(d);
    };

    return (
      <div>
        {/* <div>{device && device["model"]}</div>
        <div>{device && device["device"]}</div>
        <div>{issue && issue["issue"]}</div>
        <div>{issue && issue["detail"]}</div>
        <div>{issue && issue["note"]}</div>
        <div>{quote && quote["price"]}</div>
        <div>{quote && String(quote["isPriced"])}</div>
        <div>{quote && String(quote["isPaid"])}</div>
        <div>{status}</div>
        <div>{String(isActive)}</div>
        <div>{String(isDeleted)}</div>
        <div>{_id}</div>
        <div>{customerid && customerid["name"]}</div>
        <div>{tracking}</div>
        <div>{created}</div> */}
        <CreateForms data={formData} callback={onSubmitForm} />
      </div>
    );
  }
}

export default openModal;

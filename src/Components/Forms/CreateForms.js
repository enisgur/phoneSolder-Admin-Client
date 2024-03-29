import React, { useState, useEffect } from "react";

import "./style/style.css";

const CreateForms = ({ data, callback }) => {
  const [isError, setIsError] = useState(false);
  const [isArray, setIsArray] = useState(null);
  const [formData, setFormData] = useState([]);
  const [readyData, setReadyData] = useState({}); //DO this one
  const [requiredInputs, setRequiredInputs] = useState([]);

  function error(msg, errmsg = null) {
    console.log(msg, errmsg);
  }

  useEffect(() => {
    function makeReadyData(data) {
      data.map((key, i) => {
        const k = Object.keys(key)[0];

        if (data[i][k].required) {
          setRequiredInputs((f) => {
            return [...f, k];
          });
        }

        return setReadyData((f) => {
          return {
            ...f,
            [k]: data[i][k].value,
          };
        });
      });
    }

    try {
      // console.log(typeof data, Array.isArray(data), data);
      if (Array.isArray(data)) {
        setIsArray(true);
        setFormData(data);
        makeReadyData(data);
        return;
      }
      if (typeof data === "object") {
        setIsArray(false);
        setFormData(data);
      } else {
        setIsError(true);
        error("Error: data should be array or object, check doc !");
      }
    } catch (err) {
      error("Error: effect[data] > makeReadyData");
    }

    return () => {
      setFormData([]);
      setReadyData({});
      setRequiredInputs([]);
      setIsError(false);
      setIsArray(null);
    };
  }, [data]);

  const onFormChange = (e, i, objectKey) => {
    try {
      let newArr = [...formData];
      newArr[i][objectKey].value = e.target.value;
      // console.log("newArrray :", newArr[i][objectKey].value);
      setFormData(newArr);
      setReadyData((f) => {
        return {
          ...f,
          [e.target.name]: e.target.value,
        };
      });
    } catch (err) {
      error("error CreateForm > onFormChange");
    }
  };

  const onChange = (e) => {
    try {
      setFormData((f) => {
        return {
          ...f,
          [e.target.name]: e.target.value,
        };
      });
    } catch (err) {
      error("Error CreateForm > onChange");
    }
  };

  const onFormSubmit = (e) => {
    function checkRequired() {
      let isError = false;
      requiredInputs.map((req) => {
        // console.log(readyData[req]);
        // console.log("testtt", readyData[req]);
        if (readyData[req] === null || readyData[req] === "") {
          return (isError = true);
        }
        return isError;
      });
      return isError;
    }
    try {
      e.preventDefault();
      const reqError = checkRequired();
      if (!reqError) {
        // Submit Success bellow !
        // console.log("FormData: ", formData);
        // console.log("readyData: ", readyData);
        callback(readyData);
      } else {
        error("Plase fill required fields...");
      }
    } catch (err) {
      error("Error: formSubmit");
    }
  };

  try {
    if (isError) return null;

    if (!isArray) {
      return (
        <form
          autoComplete="off"
          className="create-form"
          onSubmit={(e) => onFormSubmit(e)}
        >
          {Object.keys(formData).map((key, i) => {
            return (
              <div key={i} className="form-group">
                <label htmlFor={key}>{key}</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={(e) => onChange(e)}
                />
              </div>
            );
          })}
          <input
            type="submit"
            value="Submit"
            onSubmit={(e) => onFormSubmit(e)}
          />
        </form>
      );
    }

    return (
      <form
        autoComplete="off"
        className="create-form"
        onSubmit={(e) => onFormSubmit(e)}
      >
        {formData[0] &&
          formData.map((data, i) => {
            try {
              const objectKey = Object.keys(data);
              const inData = data[objectKey];
              const dataType = inData.type;
              const isDataDisabled = inData.disabled;
              const stateValue = formData[i][objectKey].value
                ? formData[i][objectKey].value
                : "";

              const inputProps = {
                type: formData[i][objectKey].type
                  ? formData[i][objectKey].type
                  : "text",
                minLength:
                  formData[i][objectKey].minLength &&
                  formData[i][objectKey].minLength,
                id: objectKey,
                name: objectKey,
                required: formData[i][objectKey].required,
                disabled: isDataDisabled,
                value: stateValue,
                onChange: (e) =>
                  isDataDisabled ? null : onFormChange(e, i, objectKey),
              };

              const textareaProps = {
                name: objectKey,
                id: objectKey,
                required: formData[i][objectKey].required,
                disabled: isDataDisabled,
                value: stateValue,
                onChange: (e) =>
                  isDataDisabled ? null : onFormChange(e, i, objectKey),
              };

              const labelInside = formData[i][objectKey].label
                ? formData[i][objectKey].label
                : objectKey;

              if (dataType === "select") {
                return (
                  <div key={i} className="form-group">
                    <select
                      name={objectKey}
                      value={stateValue}
                      disabled={isDataDisabled}
                      onChange={(e) =>
                        isDataDisabled ? null : onFormChange(e, i, objectKey)
                      }
                    >
                      <option value="">Select</option>
                      {data[objectKey].options.map((option) => {
                        return (
                          <option key={option.label} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              }
              if (
                dataType === "text" ||
                dataType === "date" ||
                dataType === "email" ||
                dataType === "password" ||
                dataType === "color" ||
                dataType === "file" ||
                dataType === "hidden" ||
                dataType === "image" ||
                dataType === "number" ||
                dataType === "tel" ||
                dataType === "time" ||
                dataType === "url" ||
                dataType === "week"
              ) {
                return (
                  <div key={i} className="form-group">
                    <label htmlFor={objectKey}>{labelInside}</label>
                    <input {...inputProps} />
                  </div>
                );
              }
              if (dataType === "textarea") {
                return (
                  <div key={i} className="form-group">
                    <label htmlFor={objectKey}>{labelInside}</label>
                    <textarea {...textareaProps} />
                  </div>
                );
              }
              return null;
            } catch (err) {
              error("Error: CreateForm > render return", err.message);
              return null;
            }
          })}
        <input type="submit" value="Submit" onSubmit={(e) => onFormSubmit(e)} />
      </form>
    );
  } catch (err) {
    error("Error: component return > CreateFroms");
    // return <div>Error on component return</div>;
    return null;
  }
};

export default CreateForms;

import { useFormContext } from "react-hook-form";
import { FiChevronDown, FiX } from "react-icons/fi";
import input from "./FormStyle/input.module.css";
import { FileUploader } from "react-drag-drop-files";
import Upload from "../../Images/upload.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DashboardStyle from "../../Styles/Dashboard.module.css";
// import "./Style/Form/style.css";
export function FormTemplate({ children, handleSubmit, className }) {
  return (
    <form
      className={className || DashboardStyle.view_app_components}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

export function FormInput({
  camelCase,
  placeholder,
  title,
  type,
  isOptional,
  disabled,
  className,
  message,
  value,
  defaultValue,
  registerOptions,
  step,
  style,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputName = camelCase?.replace(/"/g, "");

  return (
    <div style={{ ...style }} className={input.input_container}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          <sup style={{ color: "red" }}>{isOptional === true ? "" : "*"}</sup>
        </label>
      )}
      {/* <div> */}{" "}
      <input
        className={`${input.input_field} ${
          errors?.[inputName] && input.form__error__message_border
        }`}
        disabled={disabled || false}
        value={value}
        type={type}
        name={camelCase}
        id={camelCase}
        step={step && "0.01"}
        placeholder={`Enter ${title}`}
        defaultValue={defaultValue}
        {...register(camelCase, {
          required: {
            value: isOptional === true ? false : true,
            message: `${title || "This field"} is required.`,
          },
          ...registerOptions,
        })}
      />
      <small className={input.form__error__message}>
        {(errors || errors?.[inputName]) &&
          `${errors?.[inputName]?.message || ""}`}
      </small>
      {/* )} */}
    </div>
  );
}

export function FormInputHidden({
  camelCase,
  placeholder,
  title,
  type,
  isOptional,
  disabled,
  className,
  message,
  value,
  defaultValue,
  registerOptions,
  step,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputName = camelCase?.replace(/"/g, "");

  return (
    <div className={input.input_container}>
      <input
        className={`${input.input_field} ${
          errors?.[inputName] && input.form__error__message_border
        }`}
        disabled={disabled || false}
        value={value}
        type={type}
        name={camelCase}
        id={camelCase}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export function FormSelect({
  camelCase,
  placeholder,
  title,
  type,
  isOptional,
  defaultValue,
  defaultId,
  array,
  disabled,
  message,
  multiple,
  moreRegister,
  isLoading,
  arrayLenghtNotice,
  specTitle,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputName = camelCase.replace(/"/g, "");
  const fieldInputName = inputName?.split(".")[2];
  const groupIndex = inputName?.split(".")[1]?.replace(/[\])}[{(]/g, "");
  const groupName = inputName?.split(".")[0];

  // const ref = useRef(null);

  // const handleAutoFocus = () => {
  //   ref.current.focus();
  // };

  const select_title = title || specTitle;

  return (
    <div className={`${input.input_container}`}>
      {select_title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {select_title}
          <sup style={{ color: "red" }}>{isOptional === true ? "" : "*"}</sup>
        </label>
      )}
      <div className={input.select_holder}>
        <select
          // ref={ref}
          className={`${input.input_field} ${input.select_field} ${
            errors?.[inputName] && input.form__error__message_border
          }`}
          type={type}
          name={camelCase}
          id={camelCase}
          placeholder={placeholder}
          multiple={multiple && true}
          // defaultValue={defaultValue}
          {...register(camelCase, {
            required: {
              value: isOptional === true ? false : true,
              message: `${title || "This feild"} is required.`,
            },
            ...moreRegister,
          })}
          disabled={disabled === "disabled" ? true : false}
        >
          {/* {!defaultValue && ( */}
          <option value="" selected disabled>{`Select ${
            title || "Options"
          }`}</option>
          {/* )} */}
          {defaultValue ? (
            <option value={defaultId} selected>
              {defaultValue || "a"}
            </option>
          ) : (
            ""
          )}
          {array || null}
        </select>
        <span className={input.select_key_dev}>
          <FiChevronDown className="down" />
        </span>
      </div>
      {/* <br /> */}
      <>
        {(errors || errors?.[inputName]) && (
          <small className={input.form__error__message}>
            {errors?.[inputName]?.message ||
              errors?.[groupName]?.[groupIndex]?.[fieldInputName]?.message}
          </small>
        )}
        {/* <br /> */}
        {isLoading && <small>Loading...</small>}
        {!array?.length &&
          (<small>{arrayLenghtNotice}</small> || (
            <small>No available Options</small>
          ))}
      </>
    </div>
  );
}

export function FormsSelect({
  camelCase,
  placeholder,
  title,
  type,
  isOptional,
  defaultValue,
  defaultId,
  array,
  disabled,
  message,
  multiple,
  moreRegister,
  isLoading,
  arrayLenghtNotice,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputName = camelCase.replace(/"/g, "");
  const fieldInputName = inputName?.split(".")[2];
  const groupIndex = inputName?.split(".")[1]?.replace(/[\])}[{(]/g, "");
  const groupName = inputName?.split(".")[0];

  // const ref = useRef(null);

  // const handleAutoFocus = () => {
  //   ref.current.focus();
  // };

  return (
    <div className={`${input.input_container}`}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          <sup style={{ color: "red" }}>{isOptional === true ? "" : "*"}</sup>
        </label>
      )}
      <div className={input.select_holder}>
        <select
          style={{ color: "#6e9170" }}
          // ref={ref}
          className={`${input.input_field} ${input.select_field} ${
            errors?.[inputName] && input.form__error__message_border
          }`}
          type={type}
          name={camelCase}
          id={camelCase}
          placeholder={placeholder}
          multiple={multiple && true}
          // defaultValue={defaultValue}
          {...register(camelCase, {
            required: {
              value: isOptional === true ? false : true,
              message: `${title || "This feild"} is required.`,
            },
            ...moreRegister,
          })}
          disabled={disabled === "disabled" ? true : false}
        >
          {/* {!defaultValue && ( */}
          <option value="" className={input.input_title}>
            {placeholder}
          </option>
          {/* )} */}
          {defaultValue ? (
            <option value={defaultId} selected>
              {defaultValue || "a"}
            </option>
          ) : (
            ""
          )}
          {array || null}
        </select>
        <span className={input.select_key_dev}>
          <FiChevronDown className="down" />
        </span>
      </div>
      {/* <br /> */}
      <>
        {(errors || errors?.[inputName]) && (
          <small className={input.form__error__message}>
            {errors?.[inputName]?.message ||
              errors?.[groupName]?.[groupIndex]?.[fieldInputName]?.message}
          </small>
        )}
        {/* <br /> */}
        {isLoading && <small>Loading...</small>}
        {!array?.length &&
          (<small>{arrayLenghtNotice}</small> || (
            <small>No available Options</small>
          ))}
      </>
    </div>
  );
}




export function FormTextArea({
  camelCase,
  placeholder,
  title,
  type,
  isOptional,
  defaultValue,
  defaultId,
  array,
  disabled,
  className,
  rowsLines,
  moreRegister,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputName = camelCase?.replace(/"/g, "");
  return (
    <div className={`${input.input_container} ${className}`}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          {isOptional !== false && <sup style={{ color: "red" }}>*</sup>}
        </label>
      )}
      {/* <br /> */}
      <div>
        {" "}
        <textarea
          className={input.input_field}
          type={type}
          name={camelCase}
          id={camelCase}
          defaultValue={defaultValue}
          placeholder={`Enter ${title}`}
          {...register(camelCase, {
            required: {
              value: isOptional !== true ? false : true,
              message: `${title || "This feild"} is required.`,
            },
            ...moreRegister,
          })}
          disabled={disabled === "disabled" ? true : false}
          cols="20"
          rows={rowsLines || "7"}
        ></textarea>
        {/* <br /> */}
        <>
          {errors?.[inputName] && (
            <small className={input.form__error__message}>
              {errors?.[inputName].message}
            </small>
          )}
        </>
      </div>
    </div>
  );
}

export function TextArea({
  camelCase,
  placeholder,
  title,
  type,
  isOptional,
  defaultValue,
  defaultId,
  array,
  disabled,
  className,
  rowsLines,
  moreRegister,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputName = camelCase?.replace(/"/g, "");
  return (
    <div className={`${input.input_container} ${className}`}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          {isOptional !== false && <sup style={{ color: "red" }}>*</sup>}
        </label>
      )}
      {/* <br /> */}
      <div>
        {" "}
        <textarea
          className={input.input_field}
          type={type}
          name={camelCase}
          id={camelCase}
          defaultValue={defaultValue}
          placeholder={`Enter answer`}
          {...register(camelCase, {
            required: {
              value: isOptional !== true ? false : true,
              message: `${title || "This field"} is required.`,
            },
            ...moreRegister,
          })}
          disabled={disabled === "disabled" ? true : false}
          cols="20"
          rows={rowsLines || "7"}
        ></textarea>
        {/* <br /> */}
        <>
          {errors?.[inputName] && (
            <small className={input.form__error__message}>
              {errors?.[inputName].message}
            </small>
          )}
        </>
      </div>
    </div>
  );
}

export function FileUpload({
  title,
  camelCase,
  setFile,
  file,
  isOptional,
  moreRegister,
  multiple,
}) {
  const fileTypes = ["JPG", "PNG", "PDF"];

  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className={input.input_container}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          {!isOptional && <sup style={{ color: "red" }}>*</sup>}
        </label>
      )}
      {file && (
        <FiX
          onClick={(e) => {
            e.stopPropagation();
            setFile(null);
          }}
          className={input.cancel_file_upload}
        />
      )}
      <FileUploader
        classes={input.file_uploader}
        handleChange={handleChange}
        onDrop={handleChange}
        name="file"
        types={fileTypes}
        hoverTitle={"Drop here"}
        multiple={multiple || false}
      >
        {file ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={input.file_uploader_active}
          >
            <p>{file?.name}</p>
            {/* <p
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className={input.file_upload_cancel}
            >
              Replace
            </p> */}
          </div>
        ) : (
          <div className={input.file_uploader_empty_state}>
            <img src={Upload} alt="File Upload" />
            <div>
              <p>
                Drag and drop here or <b>click</b> to upload.
              </p>
              <p>(JFG/PNG/PDF)</p>
            </div>
          </div>
        )}
      </FileUploader>
    </div>
  );
}

export function PerfectFileUpload({
  title,
  camelCase,
  setFile,
  file,
  isOptional,
  moreRegister,
  isMultiple,
  setValues,
  handleChange,
  fileType,
}) {
  const fileTypes = ["JPG", "PNG", "PDF", "JPEG"];

  // console.log("file from component", file);
  // const handleChange = (file) => {
  //   setFile(file);
  // };
  return (
    <div className={input.input_container}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          <sup style={{ color: "red" }}>{!isOptional ? "*" : ""}</sup>
        </label>
      )}
      {file && (
        <FiX
          onClick={(e) => {
            e.stopPropagation();
            setFile(null);
          }}
          className={input.cancel_file_upload}
        />
      )}

      <FileUploader
        classes={input.file_uploader}
        handleChange={handleChange}
        onDrop={handleChange}
        name="file"
        types={fileType || fileTypes}
        hoverTitle={"Drop here"}
        multiple={isMultiple || false}
      >
        {file ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={input.file_uploader_active}
          >
            <p>{file?.name}</p>
            {/* <p
      onClick={(e) => {
        e.stopPropagation();
        setFile(null);
      }}
      className={input.file_upload_cancel}
    >
      Replace
    </p> */}
          </div>
        ) : (
          <div className={input.file_uploader_empty_state}>
            <img src={Upload} alt="File Upload" />
            <div>
              <p>
                Drag and drop here or <b>click</b> to upload.
              </p>
              <p>
                {[fileType || fileTypes]?.map((x, index) => {
                  return <>{(index ? ", " : "") + ` ${x}`}</>;
                })}
              </p>
            </div>
          </div>
        )}
      </FileUploader>
    </div>
  );
}

export function ProFileUpload({
  title,
  camelCase,
  setFile,
  file,
  isOptional,
  moreRegister,
}) {
  const fileTypes = ["JPG", "PNG", "PDF"];

  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className={input.input_container}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          {!isOptional && <sup style={{ color: "red" }}>*</sup>}
        </label>
      )}
      {file && (
        <FiX
          onClick={(e) => {
            e.stopPropagation();
            setFile(null);
          }}
          className={input.cancel_file_upload}
        />
      )}
      <FileUploader
        classes={input.file_uploader}
        handleChange={handleChange}
        onDrop={handleChange}
        name="file"
        types={fileTypes}
        hoverTitle={"Drop here"}

        // multiple={true}
      >
        {file ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={input.file_uploader_active}
          >
            <p>{file?.name}</p>
            {/* <p
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className={input.file_upload_cancel}
            >
              Replace
            </p> */}
          </div>
        ) : (
          <div className={input.file_uploader_empty_state}>
            <img src={Upload} alt="File Upload" />
            <div>
              <p>
                Drag and drop here or <b>click</b> to upload.
              </p>
              <p>(JFG/PNG/PDF)</p>
            </div>
          </div>
        )}
      </FileUploader>
    </div>
  );
}

export function ProFormSelect({
  camelCase,
  placeholder,
  title,
  type,
  isOptional,
  defaultValue,
  defaultId,
  array,
  disabled,
  message,
  multiple,
  moreRegister,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputName = camelCase.replace(/"/g, "");
  const fieldInputName = inputName?.split(".")[2];
  const groupIndex = inputName?.split(".")[1]?.replace(/[\])}[{(]/g, "");
  const groupName = inputName?.split(".")[0];

  // const ref = useRef(null);

  // const handleAutoFocus = () => {
  //   ref.current.focus();
  // };

  return (
    <div className={`${input.input_container}`}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          {!isOptional && <sup style={{ color: "red" }}>*</sup>}
        </label>
      )}
      <div>
        <input
          className={`${input.input_field} ${
            errors?.[inputName] && input.form__error__message_border
          }`}
          disabled={disabled || false}
          // value={value}
          type={type}
          name={camelCase}
          id={camelCase}
          // step={step && "0.01"}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(camelCase, {
            required: {
              value: isOptional ? false : true,
              message: `${title || "This field"} is required.`,
            },
            // ...registerOptions,
          })}
        />
      </div>
      <div className={input.select_holder}>
        <select
          // ref={ref}
          className={`${input.input_field} ${input.select_field} ${
            errors?.[inputName] && input.form__error__message_border
          }`}
          type={type}
          name={camelCase}
          id={camelCase}
          placeholder={placeholder}
          multiple={multiple && true}
          // defaultValue={defaultValue}
          {...register(camelCase, {
            required: {
              value: isOptional ? false : true,
              message: `${title || "This feild"} is required.`,
            },
            ...moreRegister,
          })}
          disabled={disabled === "disabled" ? true : false}
        >
          {/* <option value="" checked={defaultValue && false}></option>
          {defaultValue ? (
            <option value={defaultId} checked>
              {defaultValue || "a"}
            </option>
          ) : (
            ""
          )}
          {array || null} */}
        </select>
        <span className={input.select_key_dev}>
          <FiChevronDown className="down" />
        </span>
      </div>
      <>
        {(errors || errors?.[inputName]) && (
          <small className={input.form__error__message}>
            {errors?.[inputName]?.message ||
              errors?.[groupName]?.[groupIndex]?.[fieldInputName]?.message}
          </small>
        )}
        {/* <br /> */}
        {message && <small>{message}</small>}
      </>
    </div>
  );
}

export function ReactSelect({
  camelCase,
  placeholder,
  title,
  type,
  isOptional,
  defaultValue,
  defaultId,
  array,
  disabled,
  message,
  multiple,
  moreRegister,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const animatedComponents = makeAnimated();

  const inputName = camelCase.replace(/"/g, "");
  const fieldInputName = inputName?.split(".")[2];
  const groupIndex = inputName?.split(".")[1]?.replace(/[\])}[{(]/g, "");
  const groupName = inputName?.split(".")[0];

  // const ref = useRef(null);

  // const handleAutoFocus = () => {
  //   ref.current.focus();
  // };

  const colourOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ];

  return (
    <div className={`${input.input_container}`}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          {!isOptional && <sup style={{ color: "red" }}>*</sup>}
        </label>
      )}

      <div className={input.select_holder}>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          closeMenuOnSelect={false}
          components={animatedComponents}
          // defaultValue={[colourOptions[4], colourOptions[5]]}
          isMulti = {false}
          options={colourOptions}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: "1px solid #d9e9da",
              backgroundColor: "var(--greenStep_One)",
              padding: "0.3rem",
              borderRadius: "0.5rem",
              borderColor: "#d9e9da",
              outline: "#d9e9da",
            }),
          }}
        />
        {/* <select
          // ref={ref}
          className={`${input.input_field} ${input.select_field} ${
            errors?.[inputName] && input.form__error__message_border
          }`}
          type={type}
          name={camelCase}
          id={camelCase}
          placeholder={placeholder}
          multiple={multiple && true}
          // defaultValue={defaultValue}
          {...register(camelCase, {
            required: {
              value: isOptional ? false : true,
              message: `${title || "This feild"} is required.`,
            },
            ...moreRegister,
          })}
          disabled={disabled === "disabled" ? true : false}
        >
          {/* <option value="" checked={defaultValue && false}></option>
          {defaultValue ? (
            <option value={defaultId} checked>
              {defaultValue || "a"}
            </option>
          ) : (
            ""
          )}
          {array || null} */}
        {/* </select> */}
        {/* <span className={input.select_key_dev}>
          <FiChevronDown className="down" />
        </span> */}
      </div>
      <>
        {(errors || errors?.[inputName]) && (
          <small className={input.form__error__message}>
            {errors?.[inputName]?.message ||
              errors?.[groupName]?.[groupIndex]?.[fieldInputName]?.message}
          </small>
        )}
        {/* <br /> */}
        {message && <small>{message}</small>}
      </>
    </div>
  );
}



export function ReactSelects({
  camelCase,
  title,
  isOptional,
  message,
  options, // Add a prop for colourOptions
  selectedOptions, // Add a prop for selected options
  onChange, // Add a callback prop for updating selected options
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const animatedComponents = makeAnimated();

  const inputName = camelCase.replace(/"/g, "");
  const fieldInputName = inputName?.split(".")[2];
  const groupIndex = inputName?.split(".")[1]?.replace(/[\])}[{(]/g, "");
  const groupName = inputName?.split(".")[0];

  return (
    <div className={`${input.input_container}`}>
      {title && (
        <label className={input.input_title} htmlFor={camelCase}>
          {title}
          {!isOptional && <sup style={{ color: "red" }}>*</sup>}
        </label>
      )}

      <div className={input.select_holder}>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          closeMenuOnSelect={false}
          components={animatedComponents}
          value={selectedOptions} // Set the value to manage selection
          onChange={onChange} // Use the provided onChange callback to update the parent state
          isMulti={false}
          options={options} // Use the dynamic options prop
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: "1px solid #d9e9da",
              backgroundColor: "var(--greenStep_One)",
              padding: "0.3rem",
              borderRadius: "0.5rem",
              borderColor: "#d9e9da",
              outline: "#d9e9da",
            }),
          }}
        />
      </div>
      <>
        {(errors || errors?.[inputName]) && (
          <small className={input.form__error__message}>
            {errors?.[inputName]?.message ||
              errors?.[groupName]?.[groupIndex]?.[fieldInputName]?.message}
          </small>
        )}
        {message && <small>{message}</small>}
      </>
    </div>
  );
}




export function CheckBox({
  isRequired,
  name,
  isHeading,
  camelCase,
  group,
  value,
  moreRegister,
  style,
}) {
  const {
    register,
    // formState: { errors },
  } = useFormContext();

  // console.log({ camelCase, value, moreRegister, name, group });
  // const inputName = camelCase?.replace(/"/g, "");

  return (
    <div style={{ ...style }} className={DashboardStyle.checkbox_style}>
      <label
        style={{
          marginBottom: "0px",
          // fontWeight: isHeading === true && "500",
          // marginBottom: isHeading === true ? "40px" : "0.8rem",
        }}
        htmlFor={value}
      >
        {" "}
        <input
          {...register(`${camelCase}`, {
            value: isRequired === false ? false : true,
            ...moreRegister,
          })}
          type="checkbox"
        />
        {name || ""}
      </label>
      {/* {(errors || errors?.[inputName]) && (
        <small className={input.form__error__message}>
          {errors?.[inputName]?.message}
        </small>
      )} */}
    </div>
  );
}

export function RadioBox({
  name,
  isHeading,
  camelCase,
  group,
  value,
  moreRegister,
  style,
}) {
  const { register } = useFormContext();

  return (
    <div style={{ ...style }} className={DashboardStyle.checkbox_style}>
      <label
        style={{
          fontWeight: isHeading === true && "500",
          marginBottom: isHeading === true ? "40px" : "0.8rem",
        }}
        htmlFor={value}
      >
        {" "}
        <input
          id={value}
          {...register(`${camelCase}`, {
            required: {
              value: true,
              message: "yeah",
            },
            ...moreRegister,
          })}
          value={value}
          name={group || ""}
          type="radio"
        />
        {name || ""}
      </label>
    </div>
  );
}

export function SlideCheckBox({
  name,
  isHeading,
  camelCase,
  group,
  moreRegister,
  style,
  placeholder,
  isDisabled,
  isOptional,
  title,
  value,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // console.log({ camelCase, value, moreRegister, name, group });
  // const inputName = camelCase?.replace(/"/g, "");

  return (
    <div
      style={{ ...style, display: "flex", alignItems: "center", gap: "10px" }}
      className={DashboardStyle.checkbox_style}
    >
      <label className={input.switch}>
        <input
          style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
          value={value}
          name={camelCase}
          id={camelCase}
          placeholder={placeholder}
          {...register(camelCase, {
            required: {
              value: isOptional === false ? false : true,
              message: `${title || "This feild"} is required.`,
            },
            ...moreRegister,
          })}
          type="checkbox"
          disabled={isDisabled}
        />
        <span className={`${input.slider} ${input.round}`}></span>
      </label>{" "}
      <p style={{ color: "var(--primary-color)", fontSize: "0.87rem" }}>
        {name}
      </p>
    </div>
  );
}

import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FiClock } from "react-icons/fi";

/***
 *
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 * Documentation: https://github.com/arqex/react-datetime
 *
 */
export default function DatePicker(props) {
  // const [value, setValue] = useState()
  const { initialValue, dateFormat, timeFormat, className, onChange } = props;
  return (
    <div className="form__input--group">
      <div className="prepend__input">
        <FiClock
          style={{
            fontSize: 24,
            paddingTop: 5,
          }}
        />
      </div>
      <Datetime
        initialValue={initialValue}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        className={`${className}`}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

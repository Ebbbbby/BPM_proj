import React, { useEffect } from "react";
import { successAlert } from "./Global/GlobalSlice";
import { useDispatch } from "react-redux";

function success(response) {
  console.log(response);

  const dispatch = useDispatch;

  //   const action = () =>
  const v = () => {
    console.log("ran");
    dispatch(
      successAlert({
        message: "response?.data?.statusMessage",
      })
    );
  };

  return v();
}

export default success;

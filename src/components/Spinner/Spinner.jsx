import React from "react";
import "./styles.scss";

const Spinner = ({ isFetching }) => <div className={isFetching ? "spinner" : "spinner spinner_hidden"} />;

export default Spinner;

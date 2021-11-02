import React from "react";
import styles from "./genericSearchInput.module.scss";
import useDebounce from "@utils/useDebounce";
import GenericIcon from "../genericIcon";

export default function GenericSearchInput({
  value = "",
  setValue,
  onFocus,
  onChange,
}) {
  const debounceChange = useDebounce(onChange, 1000);

  const changeValue = (e) => {
    const {
      target: { value },
    } = e;

    setValue(value);
    debounceChange(value);
  };

  return (
    <div className={value ? styles.input : styles.inputEmpety}>
      <div className={styles.searchIcon}>
        <GenericIcon icon="search" size="20" color="yellow" />
      </div>
      <input
        id="search"
        type="text"
        autoComplete="off"
        placeholder="What are you search?"
        value={value}
        onChange={(e) => changeValue(e)}
        onFocus={() => onFocus()}
      />
    </div>
  );
}

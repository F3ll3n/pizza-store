import React, { useCallback, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log('debounced: ' + str)
      dispatch(setSearchValue(str))
    }, 400),
    [],
  )

  const onChangeInput = (event) => {
    setValue(event);
    updateSearchValue(event);
  }

  const onClickClear = () => {
    onChangeInput('');
    inputRef.current.focus()
  }

  return (
    <label className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      <img
        className={styles.icon}
        src="https://www.svgrepo.com/show/448592/search.svg"
        alt="Иконка поиска"
      />
      {value && (
        <img
          onClick={() => onClickClear()}
          className={styles.iconClose}
          src="https://www.svgrepo.com/show/446990/close.svg"
          alt="Иконка очистки текста"
        />
      )}
    </label>
  );
};

export default Search;

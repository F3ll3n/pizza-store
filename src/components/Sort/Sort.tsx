import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useWhyDidYouUpdate } from "ahooks";

import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../../redux/slices/filterSlice";

type PopupClick = MouseEvent & {
  composedPath: Function;
  path: Node[];
};

const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.filter.sort);
  const [open, setOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.composedPath().includes(sortRef.current as EventTarget)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  type ListItem = {
    name?: string;
    sortProperty?: string;
    index?: number;
  };

  const list: ListItem[] = [
    { name: "полярности", sortProperty: "rating" },
    { name: "полярности (по убыванию)", sortProperty: "-rating" },
    { name: "цене", sortProperty: "price" },
    { name: "цене (по возрастанию)", sortProperty: "-price" },
    { name: "алфавиту", sortProperty: "title" },
  ];

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <button onClick={() => setOpen(!open)}>{sort.name}</button>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    list[index].index = index;
                    dispatch(setSort(list[index]));
                    setOpen(false);
                  }}
                  className={sort.index === index ? "active" : ""}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;

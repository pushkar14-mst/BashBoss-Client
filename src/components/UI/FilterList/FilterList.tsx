import { useDispatch, useSelector } from "react-redux";
import "./FilterList.css";
import { filterActions } from "../../../store/filter-store";
import { useEffect } from "react";

interface IFilterListProps {
  filterHeading: string;
  options: string[];
}

const FilterList: React.FC<IFilterListProps> = (props) => {
  const dispatch = useDispatch();
  const currentFilterState = useSelector((state: any) => state.filter);
  const filterHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    heading: string
  ) => {
    switch (heading) {
      case "Venues":
        if (event.target.checked) {
          dispatch(filterActions.setCategoryFilters(event.target.value));
        } else {
          dispatch(filterActions.unSetCategoryFilters(event.target.value));
        }
        break;
      case "Date":
        if (event.target.checked) {
          dispatch(filterActions.setDateFilters(event.target.value));
        } else {
          dispatch(filterActions.unSetDateFilters(event.target.value));
        }
        break;
      case "Location":
        if (event.target.checked) {
          dispatch(filterActions.setLocationFilters(event.target.value));
        } else {
          dispatch(filterActions.unSetLocationFilters(event.target.value));
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const checkedOfCheckboxes: any = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    if (
      currentFilterState.search === "" &&
      currentFilterState.categoryFilters.length === 0 &&
      currentFilterState.locationFilters.length === 0 &&
      currentFilterState.dateFilters.length === 0
    ) {
      checkedOfCheckboxes.forEach((checkbox: any) => {
        checkbox.checked = false;
      });
    }
  }, [currentFilterState]);
  return (
    <div className="filter-list">
      <div className="filter-heading">
        <p>{props.filterHeading}</p>
      </div>
      <div className="filter-list-options">
        {props.options.map((option) => (
          <div className="filter-list-option">
            <input
              type="checkbox"
              value={option}
              key={props.filterHeading}
              onChange={(e) => {
                filterHandler(e, props.filterHeading);
              }}
            />
            <label htmlFor="filter-list-option">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterList;

import { filters } from "./Filters.module.css";
import { Link } from "react-router-dom";

const Filters = ({ setSort_by, setOrder }) => {
  const sortByOptions = {
    created_at: "Date Created",
    comment_count: "Comment Count",
    votes: "Votes",
  };

  const handleSort = (event) => {
    const sort_by = event.target.value;

    setSort_by(sort_by);
  };

  const handleOrder = (event) => {
    const order = event.target.value;

    setOrder(order);
  };

  return (
    <div className={filters}>
      <Link to={"/articles/create"}>Create Article</Link>

      <label>
        Sort by
        <select onChange={handleSort}>
          {Object.entries(sortByOptions).map((value) => (
            <option value={value[0]} key={value[0]}>
              {value[1]}
            </option>
          ))}
        </select>
      </label>

      <label>
        Order
        <select onChange={handleOrder}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;

import "./FilterButtons.css";

export default function FilterButtons({ sortOrder, toggleCheckInsOrder }) {
  return (
    <>
      <div className="filter-btns-container">
        <button onClick={toggleCheckInsOrder} className="filter-btn">
          {sortOrder === "recent" ? "Recent First" : "Oldest First"}
        </button>
      </div>
    </>
  );
}

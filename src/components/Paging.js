import PageNumber from "./PageNumber";

const Paging = ({ currentPage, setCurrentPage }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) setCurrentPage(() => currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < 36) setCurrentPage(() => currentPage + 1);
    console.log(currentPage);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevClick}>Prev</button>
      <PageNumber pageNum={currentPage} active={true} />
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default Paging;

const PageNumber = ({ pageNum, active }) => {
  return <button className={active ? "btn-active" : ""}>{pageNum}</button>;
};

export default PageNumber;

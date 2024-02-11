import BaseInput from "./BaseInput";

const DEFAULT_PAGE_SIZE = 10;

const Search = ({
  verbs,
  currentPage,
  onShowNotedWords,
  onShowTop100,
  setSearchVerbs,
}) => {
  function onTableSearch(e) {
    const query = e.target.value;
    if (query !== "") {
      const temps = verbs
        .slice()
        .filter(
          (verb) =>
            verb.v1.includes(query) ||
            verb.v2.includes(query) ||
            verb.v3.includes(query)
        );
      setSearchVerbs([...temps]);
    } else {
      const down = DEFAULT_PAGE_SIZE * (currentPage - 1) + 1;
      const verbsPaging = Array.from(
        { length: DEFAULT_PAGE_SIZE },
        (_, i) => verbs[down + i - 1]
      );
      setSearchVerbs(verbsPaging);
    }
  }

  return (
    <div className="search">
      <BaseInput
        placeholder={"Search..."}
        className={"input_table_search"}
        onInputChanged={(e) => onTableSearch(e)}
      />
      <button onClick={onShowNotedWords}>Noted Words</button>
      <button onClick={onShowTop100}>Top 100</button>
    </div>
  );
};

export default Search;

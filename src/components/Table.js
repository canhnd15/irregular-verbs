const Table = ({ searchVerbs, onSaveWord }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="no-column">No.</th>
          <th>Base form</th>
          <th>Past tense</th>
          <th>Past participle</th>
          <th>Meaning</th>
          <th className="no-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        {searchVerbs.map((v) => (
          <TableRow verb={v} key={v.id} onSaveWord={onSaveWord} />
        ))}
      </tbody>
    </table>
  );
};

function TableRow({ verb, onSaveWord }) {
  return (
    <tr key={verb.id}>
      <td className="no-column">{verb.id}</td>
      <td>{verb.v1}</td>
      <td>{verb.v2}</td>
      <td>{verb.v3}</td>
      <td>{verb.meaning}</td>
      <td className="no-column">
        <button
          className={verb.isSaved ? `btn-added` : `btn-save`}
          onClick={() => onSaveWord(verb)}
        >
          {verb.isSaved ? <span>Noted</span> : <span>Save </span>}
        </button>
      </td>
    </tr>
  );
}

export default Table;

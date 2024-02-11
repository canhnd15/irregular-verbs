import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";

const Top100Dialog = ({ top100, onCloseDialog, onDialogSearch }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <p>100 Irregular Verbs Most Used</p>
        <BaseInput
          placeholder={"Search..."}
          className={"input_dialog_search"}
          onInputChanged={onDialogSearch}
        />
        <div className="table-container">
          <table className="table noted">
            <thead>
              <tr>
                <th>Base form</th>
                <th>Past tense</th>
                <th>Past participle</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {top100.map((v) => (
                <tr key={v.id}>
                  <td>{v.v1}</td>
                  <td>{v.v2}</td>
                  <td>{v.v3}</td>
                  <td>{v.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dialog-btn">
          <BaseButton
            text={"Close"}
            className={"btn_dialog_close"}
            onButtonClicked={onCloseDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default Top100Dialog;

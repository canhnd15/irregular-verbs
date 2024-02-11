import { useState } from "react";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";

const Dialog = ({
  notedVerbs,
  tempNotedVerbs,
  setTempNotedVerbs,
  onRemoveWord,
  onCloseDialog,
  onDialogSearch,
}) => {
  const [clickedRow, setClickedRow] = useState(null);
  const [editedWord, setEditedWord] = useState(null);

  const handleSaveEditedWord = (editedWord) => {
    const currentRemainWords = JSON.parse(localStorage.getItem("noted-words"));

    const remainWords = currentRemainWords
      .slice()
      .filter((v) => v.id !== editedWord.id);

    localStorage.setItem(
      "noted-words",
      JSON.stringify([editedWord, ...remainWords])
    );

    setTempNotedVerbs([editedWord, ...remainWords]);
    setClickedRow(null);
  };

  const handleDoubleClick = (id) => {
    console.log(id);
    setClickedRow(id);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        {notedVerbs.length > 0 ? (
          <BaseInput
            placeholder={"Search..."}
            className={"input_dialog_search"}
            onInputChanged={onDialogSearch}
          />
        ) : (
          ""
        )}
        {notedVerbs.length > 0 ? (
          <div className="table-container">
            <table className="table noted">
              <thead>
                <tr>
                  <th>Base form</th>
                  <th>Past tense</th>
                  <th>Past participle</th>
                  <th>Meaning</th>
                  <th className="no-column">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tempNotedVerbs.map((v) => (
                  <tr key={v.id} onDoubleClick={() => handleDoubleClick(v.id)}>
                    {clickedRow !== v.id ? (
                      <>
                        <td>{v.v1}</td>
                        <td>{v.v2}</td>
                        <td>{v.v3}</td>
                        <td>{v.meaning}</td>
                        <td className="no-column">
                          <button
                            className="btn-remove btn-remove-ani"
                            onClick={() => onRemoveWord(v)}
                          >
                            remove
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editedWord ? editedWord.v1 : v.v1}
                            onChange={(e) =>
                              setEditedWord({ ...v, v1: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editedWord ? editedWord.v2 : v.v2}
                            onChange={(e) =>
                              setEditedWord({ ...v, v2: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editedWord ? editedWord.v3 : v.v3}
                            onChange={(e) =>
                              setEditedWord({ ...v, v3: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editedWord ? editedWord.meaning : v.meaning}
                            onChange={(e) =>
                              setEditedWord({ ...v, meaning: e.target.value })
                            }
                          />
                        </td>
                        <td className="no-column">
                          <button
                            className="btn-row-save btn-row-save-ani"
                            onClick={() =>
                              handleSaveEditedWord({
                                id: v.id,
                                v1: editedWord ? editedWord.v1 : v.v1,
                                v2: editedWord ? editedWord.v2 : v.v2,
                                v3: editedWord ? editedWord.v3 : v.v3,
                                meaning: editedWord
                                  ? editedWord.meaning
                                  : v.meaning,
                                idSaved: v.isSaved,
                              })
                            }
                          >
                            save
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="message">
            <span>📝</span> Hey, add some words to start learning!
            <span>✍️</span>
          </p>
        )}
        <div className="dialog-btn">
          <BaseButton
            text={"Close"}
            className={"btn_dialog_close"}
            onButtonClicked={onCloseDialog}
          />
          {notedVerbs.length > 0 ? (
            <p style={{ fontFamily: "fantasy" }}>
              <span>⚠️</span> Double click to edit!
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

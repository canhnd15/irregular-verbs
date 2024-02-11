import { useEffect, useState } from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import Dialog from "./components/Dialog";
import Top100Dialog from "./components/Top100Dialog";
import Paging from "./components/Paging";
import "./App.css";

let words = [];
const DEFAULT_PAGE_SIZE = 10;

function App() {
  const [top100Verbs, setTop100Verbs] = useState([]);
  const [top100TempVerbs, setTop100TempVerbs] = useState([]);

  const [notedVerbs, setNotedVerbs] = useState([]);
  const [tempNotedVerbs, setTempNotedVerbs] = useState([]);

  const [isShowNotedWords, setIsShowNotedWords] = useState(false);
  const [isShowTop100, setIsShowTop100] = useState(false);

  const [searchVerbs, setSearchVerbs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // featch saved words from local storage
  useEffect(() => {
    const storedWords = localStorage.getItem("noted-words");
    if (storedWords !== null) {
      const localStoredWords = JSON.parse(storedWords);
      setNotedVerbs(localStoredWords);
      setTempNotedVerbs(localStoredWords);
    }
  }, []);

  // featch all verbs from API
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8090/get-all-verbs`);
      const data = await res.json();
      words = [...data];

      // change status of which is removed from noted words
      const storedWords = localStorage.getItem("noted-words");
      if (storedWords !== null) {
        const localStoredWords = JSON.parse(storedWords);
        if (localStoredWords.length > 0) {
          words.map((w) => {
            if (localStoredWords.find((s) => s.id === w.id)) {
              w.isSaved = true;
            }
            return w.isSaved;
          });
        }
      }

      //get data per current page
      const down = DEFAULT_PAGE_SIZE * (currentPage - 1) + 1;
      const verbsPaging = Array.from(
        { length: DEFAULT_PAGE_SIZE },
        (_, i) => words[down + i - 1]
      );

      setSearchVerbs(verbsPaging);
    }

    fetchData();
  }, [currentPage]);

  // featch top 100 verbs
  useEffect(function () {
    async function featchData() {
      const res = await fetch(`http://localhost:8090/get-top-100`);
      const data = await res.json();

      setTop100Verbs([...data]);
      setTop100TempVerbs([...data]);
    }
    featchData();
  }, []);

  const handleShowNotedWords = () => {
    if (isShowNotedWords) {
      const storedWords = localStorage.getItem("noted-words");
      if (storedWords !== null) {
        const localStoredWords = JSON.parse(storedWords);
        words.map((w) => {
          if (localStoredWords.find((s) => s.id === w.id)) {
            w.isSaved = true;
          } else {
            w.isSaved = false;
          }
          return w.isSaved;
        });
      }
    }
    setIsShowNotedWords(!isShowNotedWords);
  };

  const handleShowTop100 = () => {
    setIsShowTop100(!isShowTop100);
  };

  //save word to noted words
  const handleSaveWord = (notedVerb) => {
    notedVerb.isSaved = true;
    setNotedVerbs([...notedVerbs, notedVerb]);
    setTempNotedVerbs([...notedVerbs, notedVerb]);

    localStorage.setItem(
      "noted-words",
      JSON.stringify([...notedVerbs, notedVerb])
    );

    // const storedWords = localStorage.getItem("noted-words");
    // if (storedWords !== null) {
    //   const prevNotedWords = JSON.parse(storedWords);

    //   // localStorage.setItem(
    //   //   "noted-words",
    //   //   JSON.stringify([notedVerb, ...prevNotedWords])
    //   // );

    //   const newStoredWords = JSON.parse(localStorage.getItem("noted-words"));
    //   // setNotedVerbs([...newStoredWords]);
    //   setTempNotedVerbs([...newStoredWords]);
    // }
  };

  //remove word from noted words
  const handleRemoveWord = (removedWord) => {
    const removedList = notedVerbs
      .slice()
      .filter((verb) => verb.id !== removedWord.id);

    setNotedVerbs([...removedList]);
    setTempNotedVerbs([...removedList]);

    localStorage.setItem("noted-words", JSON.stringify([...removedList]));
  };

  const handleDialogSearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue !== "") {
      const temps = notedVerbs
        .slice()
        .filter(
          (verb) =>
            verb.v1.includes(searchValue) ||
            verb.v2.includes(searchValue) ||
            verb.v3.includes(searchValue)
        );
      setTempNotedVerbs([...temps]);
    } else {
      setTempNotedVerbs([...notedVerbs]);
    }
  };

  const handleTop100DialogSearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue !== "") {
      const temps = top100Verbs
        .slice()
        .filter(
          (v) =>
            v.v1.includes(searchValue) ||
            v.v2.includes(searchValue) ||
            v.v3.includes(searchValue)
        );
      setTop100TempVerbs([...temps]);
    } else {
      setTop100TempVerbs([...top100Verbs]);
    }
  };

  return (
    <div className="cover">
      <h1>
        <span>✍️</span> IRREGULAR VERBS <span>📒</span>
      </h1>
      <Search
        verbs={words}
        currentPage={currentPage}
        onShowNotedWords={handleShowNotedWords}
        onShowTop100={handleShowTop100}
        setSearchVerbs={setSearchVerbs}
      />
      <div className="tables-cover">
        <Table searchVerbs={searchVerbs} onSaveWord={handleSaveWord} />
        {isShowNotedWords ? (
          <Dialog
            notedVerbs={notedVerbs}
            tempNotedVerbs={tempNotedVerbs}
            setTempNotedVerbs={setTempNotedVerbs}
            onRemoveWord={handleRemoveWord}
            onCloseDialog={handleShowNotedWords}
            onDialogSearch={(e) => handleDialogSearch(e)}
          />
        ) : (
          ""
        )}
        {isShowTop100 ? (
          <Top100Dialog
            top100={top100TempVerbs}
            onCloseDialog={handleShowTop100}
            onDialogSearch={(e) => handleTop100DialogSearch(e)}
          />
        ) : (
          ""
        )}
      </div>
      <div style={{ display: "flex" }}>
        <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;

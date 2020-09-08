import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [hadithNumber, setHadithNumber] = useState("");
  const [linkedHadiths, setLinkedHadiths] = useState("");
  const [newAdvanceNumber, setNewAdvanceNumber] = useState("");
  const [urduText, setUrduText] = useState("");
  const [hadithInternationallNumber, setHadithInternationalNumber] = useState();
  const [hadithAdvanceNumber, setHadithAdvanceNumber] = useState();
  const [responseMessage, setResponseMessage] = useState();

  const loadData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://hadithsaverapi-dot-islam786.ew.r.appspot.com/duplicate/" +
        hadithNumber
    );
    const json = await response.json();
    console.log(json);

    if (json.error) {
      setResponseMessage(json.error);
    } else {
      setHadithInternationalNumber(json.international_number);
      setHadithAdvanceNumber(json.advance_number);
      setUrduText(json.urdu_text);
    }

    setLoading(false);
  };

  const saveHadith = async () => {
    setLoading(true);

    const formatData = {
      old_advance_number: hadithAdvanceNumber,
      new_advance_number: newAdvanceNumber,
      linkedHadiths: linkedHadiths,
    };

    console.log("format data");
    console.log(formatData);

    const rawResponse = await fetch(
      "https://hadithsaverapi-dot-islam786.ew.r.appspot.com/duplicate-save",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatData),
      }
    );

    const content = await rawResponse.json();
    console.log(content);

    setResponseMessage(content.message);

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <div>{responseMessage}</div>
      <div style={{ marginTop: 10 }}>
        {loading && "Loading..."}
        <input
          type="text"
          onChange={(event) => setHadithNumber(event.target.value)}
          value={hadithNumber}
        />
        <button onClick={loadData}>Load Data</button>
        <button style={{ marginLeft: 100 }} onClick={saveHadith}>
          Save
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        Hadith international number: {hadithInternationallNumber}
        <br />
        Hadith Advance number: {hadithAdvanceNumber}
      </div>
      <div style={{ marginTop: 10 }}>
        <label> New Advance Number</label>
        <input
          type="text"
          onChange={(event) => setNewAdvanceNumber(event.target.value)}
          value={newAdvanceNumber}
        />
        <br />
        <br />
        <label>Linked Hadiths</label>
        <input
          style={{ width: 400 }}
          type="text"
          onChange={(event) => setLinkedHadiths(event.target.value)}
          value={linkedHadiths}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <textarea
          rows="15"
          cols="120"
          dir="rtl"
          style={{
            fontFamily: '"Amiri", serif',
            fontWeight: "500",
            fontSize: "20px",
            paddingLeft: 10,
            paddingRight: 10,
          }}
          defaultValue={urduText}
        />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [hadithNumber, setHadithNumber] = useState(0);
  const [linkedHadiths, setLinkedHadiths] = useState();
  const [newAdvanceNumber, setNewAdvanceNumber] = useState();
  const [urduText, setUrduText] = useState();
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

    setHadithInternationalNumber(json.international_number);
    setHadithAdvanceNumber(json.advance_number);
    setUrduText(json.text);

    setLoading(false);
  };

  const saveHadith = async () => {
    setLoading(true);

    const formatData = {
      old_advance_number: "180",
      new_advance_number: "180-a",
      linkedHadiths: "180-b,180-c",
    };

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
          onChange={(v) => setHadithNumber(v)}
          value={hadithNumber}
        />
        <button onClick={loadData}>Load Data</button>
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
          onChange={(v) => setNewAdvanceNumber(v)}
          value={newAdvanceNumber}
        />
        <br />
        <br />
        <label>Linked Hadiths</label>
        <input
          style={{ width: 400 }}
          type="text"
          onChange={(v) => setLinkedHadiths(v)}
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
        >
          {urduText}
        </textarea>
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={saveHadith}>Save</button>
      </div>
    </div>
  );
}

export default App;

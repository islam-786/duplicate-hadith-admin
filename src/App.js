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
    setLoading(true)
    const response = await fetch(
      "https://hadithsaverapi-dot-islam786.ew.r.appspot.com/duplicate/" + hadithNumber
    );
    const json = await response.json();
    console.log(json);

    setHadithInternationalNumber(json.international_number);
    setHadithAdvanceNumber(json.advance_number);
      setUrduText(json.text);

    setLoading(false);
  };

  const saveHadith = () => {
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

    setResponseMessage(content.message)

    setLoading(false);
  };

  return (
    <div>
      <div>{responseMessage}</div>
      <div>
        {
          loading && "Loading..."
        }
        <input
          type="text"
          onChange={(v) => setHadithNumber(v)}
          value={hadithNumber}
        />
        <button onClick={loadData}>Load Data</button>
      </div>
      <div>
        Hadith international number: {hadithInternationallNumber}
        <br />
        Hadith Advance number: {hadithAdvanceNumber}
      </div>
      <div>
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
          type="text"
          onChange={(v) => setLinkedHadiths(v)}
          value={linkedHadiths}
        />
      </div>
      <div>
      <textarea>{urduText}</textarea>
      </div>

      <div>
        <button onClick={saveHadith}>Save</button>
      </div>
    </div>
  );
}

export default App;

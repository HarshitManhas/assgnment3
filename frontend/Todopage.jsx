import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import sha256 from "crypto-js/sha256";   // install crypto-js: npm install crypto-js

export default function TodoPage() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemUUID, setItemUUID] = useState(uuidv4());
  const [itemHash, setItemHash] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Compute hash before sending
    const hash = sha256(itemName + itemDescription).toString();
    setItemHash(hash);

    await fetch("http://localhost:5000/submittodoitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, itemUUID, itemHash: hash, itemName, itemDescription })
    });
    alert("To-Do Item Submitted!");
  };

  return (
    <div>
      <h2>To-Do Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item ID:</label>
          <input type="text" value={itemId} onChange={(e) => setItemId(e.target.value)} />
        </div>
        <div>
          <label>Item UUID:</label>
          <input type="text" value={itemUUID} readOnly />
        </div>
        <div>
          <label>Item Hash:</label>
          <input type="text" value={itemHash} readOnly />
        </div>
        <div>
          <label>Item Name:</label>
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </div>
        <div>
          <label>Item Description:</label>
          <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

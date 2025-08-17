import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";   // import UUID library

export default function TodoPage() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemUUID, setItemUUID] = useState(uuidv4());   // NEW FIELD (auto-generated UUID)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/submittodoitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, itemUUID, itemName, itemDescription })
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
          <input type="text" value={itemUUID} readOnly /> {/* Auto-generated UUID */}
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

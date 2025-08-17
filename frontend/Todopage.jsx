import React, { useState } from "react";

export default function TodoPage() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemId, setItemId] = useState("");   // NEW FIELD

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/submittodoitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, itemName, itemDescription }) // include itemId
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

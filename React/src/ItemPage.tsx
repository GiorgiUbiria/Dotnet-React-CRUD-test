import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ItemPage = () => {
  const [name, setName] = useState();
  const navigate = useNavigate();
  const params = useParams();

  async function deleteItem() {
    await fetch(`http://localhost:5238/api/todoitems/${params.id}`, {
      method: "DELETE",
    });
    navigate("/");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const item = {
      id: params.id,
      isComplete: false,
      name: name,
    };
    await fetch(`http://localhost:5238/api/todoitems/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <button>Change Name</button>
      </form>
      <button type="button" onClick={deleteItem}>
        Delete
      </button>
    </div>
  );
};

export default ItemPage;

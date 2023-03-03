import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [data, setData] = useState<[]>();
  const [name, setName] = useState<string>("");
  const [isComplete, setIsComplete] = useState();

  const navigate = useNavigate();
  function goToItemPage(id: number) {
    navigate(`/item/${id}`);
  }

  function handleOptionChange(e: any) {
    setIsComplete(e);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`http://localhost:5238/api/todoitems`, {
      method: "POST",
      body: JSON.stringify({ name: name, isComplete: isComplete }),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
        await fetch("http://localhost:5238/api/todoitems")
      ).json();
      setData(data);
    };

    fetchData();
  }, [data]);

  return (
    <div className="App">
      <>
        <div className="todos">
          {data?.map((item: { id: any; name: string; isComplete: boolean }) => (
            <div
              key={item.id + "_div"}
              style={{ border: "1px solid white" }}
              onClick={() => goToItemPage(item?.id)}
            >
              <h1 key={item.id}> {item?.id}</h1>
              <h1 key={item.id + "_name"}> {item?.name}</h1>
            </div>
          ))}
        </div>

        <div className="add_todos">
          <form onSubmit={handleSubmit}>
            <div className="name_input">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>

            <div className="complete_input">
              <label htmlFor="complete">Is complete: </label>
              <input
                type="radio"
                id="complete"
                value="Is complete"
                checked={isComplete === true}
                onChange={() => {
                  handleOptionChange(true);
                }}
              />

              <label htmlFor="not_complete">Is not complete: </label>
              <input
                type="radio"
                id="not_complete"
                value="Is not complete"
                checked={isComplete === false}
                onChange={() => {
                  handleOptionChange(false);
                }}
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </>
    </div>
  );
};

export default MainPage;

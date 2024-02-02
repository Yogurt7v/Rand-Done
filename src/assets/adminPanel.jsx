import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dataBase from "../assets/dataBase";
import close from "../assets/close.svg";

export const AdminPanel = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigator = useNavigate();

  const downloadDataBase = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(dataBase, null, 2)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "dataBase.json";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  useEffect(() => {
    if (searchInput === "") {
      setFilteredData([]);
    } else {
      setFilteredData(
        dataBase.filter((item) =>
          item.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [searchInput]);

  return (
    <>
      <button
        onClick={downloadDataBase}
        style={{
          width: "300px",
          height: "50px",
          backgroundColor: "transparent",
          border: "none",
        }}
      ></button>

      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Admin Panel</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              style={{ width: "300px" }}
              type="text"
              placeholder="Наличие в базе"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <img
              src={close}
              style={{ cursor: "pointer", width: "30px", height: "30px" }}
              onClick={() => setSearchInput("")}
            />
          </div>
          <button
            style={{ borderRadius: "14px" }}
            onClick={() => navigator("/")}
          >
            Go Back
          </button>
        </div>
      </div>

      {filteredData?.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          <p>{item.baseTitle}</p>
          <h3>{item.title}</h3>
          <p>{item.price}</p>
        </div>
      ))}
    </>
  );
};

export default AdminPanel;

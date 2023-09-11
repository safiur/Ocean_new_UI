import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import axios from "axios";
const Sconnect = () => {
  const navigate = useNavigate();
  const {
    setdbNames,
    modalIsOpens,
    setIsOpensql,
    serverDetails,
    setServerDetails,
  } = useContext(GlobalContext);
  const openModal = (e) => {
    setIsOpensql(true);
  };
  function closeModal() {
    setIsOpensql(false);
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setServerDetails({
      ...serverDetails,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const server = {
      dbType: 'mysql', // or 'postgres' based on user's choice
      name: serverDetails.name,
      portNumber: serverDetails.portNumber,
      user: serverDetails.user,
      password: serverDetails.password,
      database: serverDetails.database,
    };
    axios
      .post(
        "http://localhost:5001/api/users/schema",
        // "https://ocean-user-serverbackend.onrender.com/api/users/schema",
        server
      )
      .then((res) => {
        console.log(res.data);
        const t = res.data;
        const col = Object.keys(t);
        const yo = [];
        const x = res.data.map((pop) => {
          const y = Object.values(pop);
          yo.push(y);
        });
        setdbNames(yo);
        setServerDetails(server);
      })
      .catch((res) => {
        console.log(res);
      });
    if (alert) {
      setServerDetails({
        name: "",
        portNumber: "",
        user: "",
        password: "",
        database: "",
      });
    }
    setIsOpensql(false);
    navigate("/dataSource");
    return;
  };

  return (
    <>
      {/* <button style={{ cursor: "pointer" }} onClick={openModal}>
        Connect
      </button> */}
      

      <Modal
        isOpen={modalIsOpens}
        className="sqlmodalStyle"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">Connect SQL</h4>
          <button className="modalButton">X</button>
        </div>
        <form className="LoginForm" onSubmit={handleSubmit}>
        <select 
        value={serverDetails.dbType} 
        onChange={(e) => setServerDetails({...serverDetails, dbType: e.target.value})}
      >
        <option value="mysql">MySQL</option>
        <option value="postgres">PostgreSQL</option>
      </select>
        
          <input
            className="formInput"
            onChange={handleChange}
            value={serverDetails.name}
            id="name"
            placeholder="host name"
            required
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={serverDetails.portNumber}
            id="portNumber"
            placeholder="portNumber"
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={serverDetails.user}
            id="user"
            required
            placeholder="user"
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={serverDetails.password}
            id="password"
            // error={errors.password}
            type="password"
            placeholder="Password"
            required
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={serverDetails.database}
            id="database"
            placeholder="Database"
          />
          <br></br>
          <br></br>
          <div style={{ display: "flex", cursor: "pointer" }}>
            <button className="formBtn">Connect</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Sconnect;

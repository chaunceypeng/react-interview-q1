import "./App.css";
import { useState, useEffect } from "react";
import { isNameValid, getLocations } from "./mock-api/apis";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [table, setTable] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocations().then((locations) => {
      setLocations(locations);
    });
  }, []);

  useEffect(() => {
    setLocation(locations[0]);
  }, [locations]);

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setName(newName);

    const isValidName = isNameValid(newName);
    if (!isValidName) {
      setError("invalid name");
    } else {
      setError(null);
    }
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleClickOnClear = () => {
    setName("");
    setLocation(locations[0]);
    setError(null);
  };

  const handleClickOnAdd = (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name is empty");
      return;
    }

    if (table.map(({ name }) => name).includes(name)) {
      setError("this name has already been taken");
      return;
    }

    setTable([...table, { name, location }]);
    setName("");
    setLocation(locations[0]);
    setError(null);
  };

  return (
    <div className="App">
      <form className="form">
        <div className="form-content">
          <label className="label" for="name">
            Name:
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeName}
          ></input>
          {!!error && <div className="error-message">{error}</div>}
        </div>
        <div className="form-content">
          <label className="label" for="location">
            Location:
          </label>
          <select
            className="input"
            value={location}
            id="location"
            name="location"
            onChange={handleChangeLocation}
          >
            {locations.map((op) => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
        <div className="button-inline">
          <button className="button" type="button" onClick={handleClickOnClear}>
            Clear
          </button>
          <button className="button" type="button" onClick={handleClickOnAdd}>
            Add
          </button>
        </div>
        <div className="table-box">
          <table className="table">
            <thead>
              <th>Name</th>
              <th>Location</th>
            </thead>
            <tbody>
              {table.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default App;

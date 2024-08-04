import { useState, useEffect } from "react";
import axios from "axios";

function FacultyForm() {
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    hobby: [],
    gender: "",
  });

  const [show, setshow] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3001/api/v1/student/")
      .then((val) => {
        setshow(val.data.Student);
        // console.log(val.data.Student);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // const handleChangeCheked = (e) => {
  //   setData({ ...data, ...data.hobby.push(e.target.value) });
  // };

  const handleChangeCheked = (e) => {
    const { value, checked } = e.target;

    setData((previusSate) => {
      const { hobby } = previusSate;
      if (checked) {
        return { ...previusSate, hobby: [...hobby, value] };
      } else {
        return {
          ...previusSate,
          hobby: hobby.filter((hobby) => hobby !== value),
        };
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data._id) {
      axios
        .patch(`http://localhost:3001/api/v1/student/${data._id}`, data)
        .then((val) => {
          console.log(val.data.data);
          getData();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3001/api/v1/student/", data)
        .then((val) => {
          console.log(val.data.data);
          getData();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:3001/api/v1/student/${_id}`)
      .then(() => {
        window.alert("delete successfully");
        getData();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (_id) => {
    let UserData = show.find((val) => val._id === _id);
    if (UserData) {
      setData({ ...UserData });
    }
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              onChange={handleChange}
              required
              type="text"
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              value={data.name}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              onChange={handleChange}
              required
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              value={data.email}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={handleChange}
              required
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              value={data.password}
            />
          </div>
          <div className="d-flex ">
            <div className="form-check">
              <input
                onChange={handleChangeCheked}
                className="form-check-input"
                type="checkbox"
                value="A"
                name="A"
                checked={data.hobby.includes("A")}
              />
              <label className="form-check-label">A</label>
            </div>
            <div className="form-check">
              <input
                onChange={handleChangeCheked}
                className="form-check-input"
                type="checkbox"
                value="B"
                name="B"
                checked={data.hobby.includes("B")}
              />
              <label className="form-check-label">B</label>
            </div>
            <div className="form-check">
              <input
                onChange={handleChangeCheked}
                className="form-check-input"
                type="checkbox"
                value="C"
                name="C"
                checked={data.hobby.includes("C")}
              />
              <label className="form-check-label">C</label>
            </div>
          </div>

          <div className="d-flex ">
            <div className="form-check">
              <input
                onChange={handleChange}
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                checked={data.gender === "male"}
              />
              <label className="form-check-label">male</label>
            </div>
            <div className="form-check">
              <input
                onChange={handleChange}
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                checked={data.gender === "female"}
              />
              <label className="form-check-label">female</label>
            </div>
            <div className="form-check">
              <input
                onChange={handleChange}
                className="form-check-input"
                type="radio"
                name="gender"
                value="other"
                checked={data.gender === "other"}
              />
              <label className="form-check-label">other</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">_id</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">Handle</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {show?.map((val) => {
            return (
              <tr key={val._id}>
                <td>{val._id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.hobby.map((e) => e)}</td>
                <td>{val.gender}</td>
                <td>
                  <button onClick={() => handleDelete(val._id)}>delete</button>
                  <button onClick={() => handleUpdate(val._id)}>update</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default FacultyForm;

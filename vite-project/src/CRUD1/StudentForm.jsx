import { useState, useEffect } from "react";

function StudentForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    hobby: [],
    gender: "",
  });

  const [Show, setShow] = useState([]);
  const [myindex, setindex] = useState(null);

  useEffect(() => {
    const ShowData = JSON.parse(localStorage.getItem("UserData")) || [];
    setShow(ShowData);
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeCheked = (e) => {
    setData({ ...data, ...data.hobby.push(e.target.value) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let UserData = [...Show];
    if (myindex === null) {
      UserData.push(data);
    } else {
      UserData[myindex] = data;
      setindex(null);
    }
    setShow(UserData);
    localStorage.setItem("UserData", JSON.stringify(UserData));
  };

  const handleDelete = (index) => {
    let UserData = [...Show];
    UserData.splice(index, 1);
    setShow(UserData);
    localStorage.setItem("UserData", JSON.stringify(UserData));
  };

  const handleUpdate = (index) => {
    let UserData = [...Show];
    setData(UserData[index]);
    setindex(index);
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              value={data.name}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              class="form-control"
              id="exampleInputEmail1"
              value={data.email}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              class="form-control"
              id="exampleInputPassword1"
              value={data.password}
            />
          </div>
          <div className="d-flex ">
            <div class="form-check">
              <input
                onChange={handleChangeCheked}
                class="form-check-input"
                type="checkbox"
                value="A"
                name="A"
                checked={data.hobby.includes("A")}
              />
              <label class="form-check-label" for="flexCheckDefault">
                A
              </label>
            </div>
            <div class="form-check">
              <input
                onChange={handleChangeCheked}
                class="form-check-input"
                type="checkbox"
                value="B"
                name="B"
                checked={data.hobby.includes("B")}
              />
              <label class="form-check-label" for="flexCheckDefault">
                B
              </label>
            </div>
            <div class="form-check">
              <input
                onChange={handleChangeCheked}
                class="form-check-input"
                type="checkbox"
                value="C"
                name="C"
                checked={data.hobby.includes("C")}
              />
              <label class="form-check-label" for="flexCheckChecked">
                C
              </label>
            </div>
          </div>

          <div className="d-flex ">
            <div class="form-check">
              <input
                onChange={handleChange}
                class="form-check-input"
                type="radio"
                name="gender"
                value="male"
                checked={data.gender === "male"}
              />
              <label class="form-check-label" for="gd1">
                male
              </label>
            </div>
            <div class="form-check">
              <input
                onChange={handleChange}
                class="form-check-input"
                type="radio"
                name="gender"
                value="female"
                checked={data.gender === "female"}
              />
              <label class="form-check-label" for="gd2">
                female
              </label>
            </div>
            <div class="form-check">
              <input
                onChange={handleChange}
                class="form-check-input"
                type="radio"
                name="gender"
                value="other"
                checked={data.gender === "other"}
              />
              <label class="form-check-label" for="gd2">
                other
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div>
        {Show?.map((val, index) => {
          return (
            <>
              <h1>{val.name}</h1>
              <button
                onClick={() => handleDelete(index)}
                class="btn btn-primary"
              >
                delete
              </button>
              <button onClick={() => handleUpdate(index)} class="btn btn-info">
                update
              </button>
            </>
          );
        })}
      </div>
    </>
  );
}

export default StudentForm;

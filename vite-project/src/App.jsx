import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentForm from "./CRUD1/StudentForm";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FacultyForm from "./CRUD2/FacultyForm";
import Error from "./components/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />

        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/faculty" element={<FacultyForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

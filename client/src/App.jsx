import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/students/Home";
import CourseList from "./pages/students/CourseList";
import CourseDetails from "./pages/students/CourseDetails";
import MyEnrollment from "./pages/students/MyEnrollment";
import Player from "./pages/students/Player";
import Loading from "./components/students/Loading";
import Educator from "./pages/educators/Educator";
import Dashboard from "./pages/educators/Dashboard";
import AddCourse from "./pages/educators/AddCourse";
import StudentEnrolled from "./pages/educators/StudentsEnrolled";
import Navbar from "./components/students/Navbar";
import MyCourses from "./pages/educators/MyCourses";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";

function App() {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/my-enrollments" element={<MyEnrollment />} />
        <Route path="/loading/:path" element={<Loading />} />
        {/* Educator Routes*/}
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="student-enrolled" element={<StudentEnrolled />} />
          <Route path="my-courses" element={<MyCourses />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

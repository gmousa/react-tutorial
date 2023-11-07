import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import TermSelector from './TermSelector';
import CourseCard from './CourseCard';
import { terms } from './Constants';
import Modal from './Modal';
import Cart from './Cart';
import { useAuthState } from "../utilities/firebase";
import { canAddCourse, getConflictingCourses } from './courseUtils';
import Navigation from "./Navigation";
import { isAdminUser } from "../utilities/firebase"

const CourseList = ({ courses }) => {
  const [selected, setSelected] = useState([]);
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const selectedCourses = selected.map(courseId => courses[courseId]);
  const [conflicting, setConflicting] = useState({});
  const [user, signInWithGoogle] = useAuthState();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    if (user) {
      isAdminUser(user.uid)
        .then(isAdmin => {
          setIsAdmin(isAdmin);
        })
        .catch(error => {
          console.error("Error checking admin status:", error);
        });
    } else {
      setIsAdmin(false); // Reset isAdmin to false upon sign-out
    }
  }, [user]);

  useEffect(() => {
    setConflicting(getConflictingCourses(courses, selected));
  }, [selected, courses]);

  const toggleSelected = (courseId) => {
    const course = courses[courseId];
  
    if (selected.includes(courseId)) {
      setSelected(prev => prev.filter(id => id !== courseId));
    } else {
      if (canAddCourse(course, selected.map(id => courses[id]))) {
        setSelected(prev => [...prev, courseId]);
      } else {
        alert('Cannot add this course due to a time conflict.');
      }
    }
  };

  return (
    <div className={`${!user ? "not-logged-in" : "logged-in"}`}>
      <BrowserRouter>
        <Navigation />
        <div className="course-container">
          <TermSelector selection={selection} setSelection={setSelection} />
          <button className="btn btn-outline-dark" onClick={openModal}>Selected Courses<i className="bi bi-cart4"></i></button>
          <Modal open={open} close={closeModal}>
            <Cart selected={selectedCourses} courses={courses} />
          </Modal>
          <div className="course-cards">
            {Object.entries(courses)
              .filter(([id, course]) => course.term === selection)
              .map(([id, { term, number, title, meets }]) => (
                <CourseCard 
                  key={id} 
                  id={id} 
                  term={term} 
                  number={number} 
                  title={title} 
                  meets={meets} 
                  selected={selected} 
                  toggleSelected={toggleSelected} 
                  isConflicting={conflicting[id]}
                  user={user}
                  isAdmin={isAdmin}
                  data-cy={term} 
                />
              ))}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default CourseList;

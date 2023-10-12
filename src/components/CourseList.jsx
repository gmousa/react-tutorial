import { useState } from "react";
import { useEffect } from 'react';
import TermSelector from './TermSelector';
import CourseCard from './CourseCard';
import { terms } from './Constants';
import Modal from './Modal';
import Cart from './Cart';
import { canAddCourse, getConflictingCourses } from './courseUtils';




const CourseList = ({ courses }) => {
  const [selected, setSelected] = useState([]);
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const selectedCourses = selected.map(courseId => courses[courseId]);
  const [conflicting, setConflicting] = useState({});

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  useEffect(() => {
    setConflicting(getConflictingCourses(courses, selected));
  }, [selected, courses]);

  const toggleSelected = (courseId) => {
    const course = courses[courseId];
  
    if (selected.includes(courseId)) {
      // Remove from cart
      setSelected(prev => prev.filter(id => id !== courseId));
    } else {
      // Check for overlaps before adding
      if (canAddCourse(course, selected.map(id => courses[id]))) {
        setSelected(prev => [...prev, courseId]);
      } else {
        alert('Cannot add this course due to a time conflict.');
      }
    }
  };
  

  return (
    <div className="course-container">
      <TermSelector selection={selection} setSelection={setSelection} />
      <button className="btn btn-outline-dark" onClick={openModal}>Selected Courses<i className="bi bi-cart4"></i></button>
      <Modal open={open} close={closeModal}>
        <Cart selected={selectedCourses} courses={courses} />
      </Modal>
      <div className="course-cards">
        {Object.entries(courses)
        .filter(([id, course]) => course.term === selection)
        .map(([id, { term, number, title, meets}]) => (
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
          />
        ))}
      </div>
    </div>
  );
}

export default CourseList;

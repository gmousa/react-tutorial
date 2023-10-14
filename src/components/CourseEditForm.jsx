import React from 'react';

const CourseEditForm = ({ course, onCancel }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" defaultValue={course.title} />
      </div>
      <div>
        <label htmlFor="meets">Meeting Times:</label>
        <input type="text" id="meets" defaultValue={course.meets} />
      </div>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CourseEditForm;

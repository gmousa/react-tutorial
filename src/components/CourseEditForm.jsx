import React, { useState } from 'react';

const CourseEditForm = ({ course, onCancel }) => {
  const [titleError, setTitleError] = useState('');
  const [meetsError, setMeetsError] = useState('');

  const validateTitle = (title) => {
    if (title.length < 2) {
      setTitleError('Title must be at least two characters.');
      return false;
    }
    setTitleError('');
    return true;
  };

  const validateMeets = (meets) => {
    const meetsPattern = /^([MTWRF]+ [0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2})?$/;
    if (!meetsPattern.test(meets)) {
      setMeetsError('Must contain days and start-end, e.g., MWF 12:00-13:20');
      return false;
    }
    setMeetsError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleValid = validateTitle(e.target.title.value);
    const meetsValid = validateMeets(e.target.meets.value);

    if (titleValid && meetsValid) {
      // Submit the form 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          defaultValue={course.title}
          onBlur={(e) => validateTitle(e.target.value)}
        />
        {titleError && <span style={{ color: 'red' }}>{titleError}</span>}
      </div>
      <div>
        <label htmlFor="meets">Meeting Times:</label>
        <input
          type="text"
          id="meets"
          defaultValue={course.meets}
          onBlur={(e) => validateMeets(e.target.value)}
        />
        {meetsError && <span style={{ color: 'red' }}>{meetsError}</span>}
      </div>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CourseEditForm;

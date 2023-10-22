import React, { useState } from 'react';
import { getDatabase, ref, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { useEffect } from 'react';

import { useDbUpdate } from '../utilities/firebase';


const CourseEditForm = ({ course, onCancel }) => {
  const [titleError, setTitleError] = useState('');
  const [meetsError, setMeetsError] = useState('');
  const courseId = `${course.term[0]}${course.number}`;
  const [updateData, updateResult] = useDbUpdate(`courses/${courseId}`);

  const validateTitle = (title) => {
    if (title.length < 2) {
      setTitleError('Title must be at least two characters.');
      return false;
    }
    setTitleError('');
    return true;
  };

  const validateMeets = (meets) => {
    const meetsPattern = /^([MTuWThF]+ [0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2})?$/;
    if (!meetsPattern.test(meets)) {
      setMeetsError('Must contain days and start-end, e.g., MWF 12:00-13:20');
      return false;
    }
    setMeetsError('');
    return true;
  };

  const [shouldClose, setShouldClose] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleValid = validateTitle(e.target.title.value);
    const meetsValid = validateMeets(e.target.meets.value);

    if (titleValid && meetsValid) {
      if (e.target.title.value !== course.title || e.target.meets.value !== course.meets) {
        updateData({
          title: e.target.title.value,
          meets: e.target.meets.value
        });
        setShouldClose(true); // Set the flag to close the form
      }
    }
  };

  useEffect(() => {
    if (shouldClose && updateResult && !updateResult.error) {
      onCancel();
      setShouldClose(false); // Reset the flag after closing the form
    }
  }, [shouldClose, updateResult, onCancel]);

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
      {updateResult && <div>{updateResult.message}</div>}
      <button type="submit">Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CourseEditForm;

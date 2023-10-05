import { useState } from "react";

const terms = {
   Fall: 'Fall courses...',
   Winter: 'Winter courses...',
   Spring: 'Spring courses...'
};

const TermButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    { 
      Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const CoursePage = ({selection}) => (
  <div className="card" >
  { terms[selection] }
  </div>
);

const MenuPage = () => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} />
      <CoursePage selection={selection} />
    </div>
  );
}

const CourseList = ({ courses }) => 
{
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  return (
      <div>
        <TermSelector selection={selection} setSelection={setSelection} />
        <div className="course-cards">
          {Object.entries(courses)
          .filter(([id, course]) => course.term === selection)
          .map(([id, { term, number, title, meets}]) => (        
            <div className="card m-1 p-2" key = {id}>
              <div className="card-body">
                <h5 className="card-title">{term} CS {number}</h5>
                <p className="card-text">{title}</p>
                <div className="mt-auto">
                  <hr/>   
                  <p className="card-text">{meets}</p>
                </div>  
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default CourseList;
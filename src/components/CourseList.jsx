import { useState } from "react";

const terms = {
   Fall: 'Fall courses...',
   Winter: 'Winter courses...',
   Spring: 'Spring courses...'
};

const ProductPage = ({products}) => {
  const [selected, setSelected] = useState([]);

  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  return (
    <ProductList products={products} selected={selected} toggleSelected={toggleSelected} />
  );
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


const CourseList = ({ courses }) => 
{
  const [selected, setSelected] = useState([]);

  const toggleSelected = (course) => setSelected(
    selected.includes(course)
    ? selected.filter(x => x !== course)
    : [...selected, course]
  );
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  return (
      <div>
        <TermSelector selection={selection} setSelection={setSelection} />
        <div className="course-cards">
          {Object.entries(courses)
          .filter(([id, course]) => course.term === selection)
          .map(([id, { term, number, title, meets}]) => (        
            <div className={`card m-1 p-2 ${selected.includes(id) ? 'selected' : ''}`} key = {id} onClick={() => toggleSelected(id)}>
              <div className={`card-body`}>
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
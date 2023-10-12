const CourseCard = ({ id, term, number, title, meets, selected, toggleSelected, isConflicting }) => (
    <div className={`card m-1 p-2 ${selected.includes(id) ? 'selected' : ''} ${isConflicting ? 'conflicting' : ''}`} onClick={() => toggleSelected(id)}>
      <div className={`card-body`}>
        <h5 className="card-title">{term} CS {number}</h5>
        <p className="card-text">{title}</p>
        <div className="mt-auto">
          <hr/>   
          <p className="card-text">{meets}</p>
        </div>  
      </div>
    </div>
  );
  
  export default CourseCard;
  
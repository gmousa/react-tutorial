import { useState } from "react";
import CourseEditForm from "./CourseEditForm";
const CourseCard = ({ id, term, number, title, meets, selected, toggleSelected, isConflicting, user, isAdmin}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <CourseEditForm course={{ term, number, title, meets }} onCancel={() => setIsEditing(false)} />;
  }

  return(
    <div className={`card m-1 p-2 ${selected.includes(id) ? 'selected' : ''} ${isConflicting ? 'conflicting' : ''}`} 
    data-cy="course"
    key={id}
    onClick={() => toggleSelected(id)}>
      <div className={`card-body`}>
        <h5 className="card-title">{term} CS {number}</h5>
        <p className="card-text">{title}</p>
        <div className="mt-auto">
          <hr/>     
          <p className="card-text">{meets}</p>
        </div>  
      </div>
      {isAdmin && (
        <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Edit</button>
      )}
    </div>
  );
};
  
  export default CourseCard;
  
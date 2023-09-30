const CourseList = ({ courses }) => (
    <div className="course-cards">
      {Object.entries(courses).map(([id, { term, number, title, meets}]) => (        
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
  );

  export default CourseList;
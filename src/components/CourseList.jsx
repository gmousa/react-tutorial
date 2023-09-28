const CourseList = ({ courses }) => (
    <div>
      {Object.entries(courses).map(([id, { term, number, title }]) => (
        <div>{term} CS {number}: {title}</div>
      ))}
    </div>
  );

  export default CourseList;
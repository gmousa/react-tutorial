const Cart = ({selected}) => (
    <div className="cart">
      {
        selected.length === 0
        ? <h2>The cart is empty. Please click on a course to add it to your cart.</h2>
        : selected.map(course => (
            <div key={course.number}>
              CS {course.number}: {course.title} meets {course.meets}
            </div>
          ))
      }
    </div>
  );
  
  export default Cart
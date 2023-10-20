// App.js

import 'bootstrap/dist/css/bootstrap.min.css';

import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import "./components/CourseList.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData } from './utilities/firebase'; // Import the Firebase hooks

const Main = () => {
  const [data, error] = useDbData('/'); // Replace with your Firebase Database path

  if (error) return <h1>Error loading course data: {`${error.message}`}</h1>;
  if (!data) return <h1>Loading course data...</h1>;

  return (
    <div className="container">
      <Banner title={data.title} />
      <CourseList courses={data.courses} />
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;

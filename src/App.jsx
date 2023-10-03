import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/CourseList.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  return  <div className="container">
            <div>
              <Banner title={data.title}/>
              <CourseList courses={data.courses}/>
            </div>
          </div>
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
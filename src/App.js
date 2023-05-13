import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routs } from './routs/router';

function App() {
  return (
    <div className="App">
       <RouterProvider router={routs}></RouterProvider>
    </div>
  );
}

export default App;

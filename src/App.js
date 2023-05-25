
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routs } from './routs/router';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routs}></RouterProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;

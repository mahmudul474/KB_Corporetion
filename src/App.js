
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routs } from './routs/router';
import { Toaster } from "react-hot-toast";
 

function App() {
  return (
    <div className="App bg-white">
      <RouterProvider router={routs}></RouterProvider>

      <Toaster />
    </div>
  );
}

export default App;

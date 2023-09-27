import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routs } from "./routs/router";
import { Toaster } from "react-hot-toast";
import { TranslationProvider } from "./Component/TranslationProvider/TranslationProvider";

function App() {
  return (
    <div className="App bg-white">
      <TranslationProvider>
        <RouterProvider router={routs}></RouterProvider>
      </TranslationProvider>
      <Toaster />
    </div>
  );
}

export default App;

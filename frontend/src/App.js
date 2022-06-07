import "bootstrap/dist/css/bootstrap.min.css";
import CrudClienti from "./components/CrudClienti";
import CrudGuide from "./components/CrudGuide";
import './styles/App.css';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import AgenziaNavbar from "./components/AgenziaNavbar";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        <AgenziaNavbar></AgenziaNavbar>
        <Routes>
          <Route path="/" element={<h1>CIAO</h1>} />
          <Route path="/guide" element={<CrudGuide />} />
          <Route path="/clienti" element={<CrudClienti />} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
);

export default App;

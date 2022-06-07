import "bootstrap/dist/css/bootstrap.min.css";
import ClientiController from "./components/ClientiController";
import GuideController from "./components/GuideController";
import './styles/App.css';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import AgenziaNavbar from "./components/AgenziaNavbar";
import CrudTag from "./components/CrudTag";
import CrudCitta from "./components/CrudCitta";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        <AgenziaNavbar></AgenziaNavbar>
        <Routes>
          <Route path="/" element={<h1>CIAO</h1>} />
          <Route path="/tag" element={<CrudTag />} />
          <Route path="/citta" element={<CrudCitta />} />
          <Route path="/guide" element={<GuideController />} />
          <Route path="/clienti" element={<ClientiController />} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
);

export default App;

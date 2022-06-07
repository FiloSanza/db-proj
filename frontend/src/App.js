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

const App = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        <AgenziaNavbar></AgenziaNavbar>
        <Routes>
          <Route path="/" element={<h1>CIAO</h1>} />
          <Route path="/guide" element={<GuideController />} />
          <Route path="/clienti" element={<ClientiController />} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
);

export default App;

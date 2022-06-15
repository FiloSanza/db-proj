import "bootstrap/dist/css/bootstrap.min.css";
import ClientiController from "./components/utenti/ClientiController";
import GuideController from "./components/utenti/GuideController";
import './styles/App.css';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import AgenziaNavbar from "./components/AgenziaNavbar";
import AttivitaController from "./components/attivita/AttivitaController";
import CittaController from "./components/citta/CittaController";
import TagController from "./components/tag/TagController";
import CreateViaggio from "./components/viaggio/CreateViaggio";
import ListViaggi from "./components/viaggio/ListViaggi"
import DataViaggioController from "./components/dataViaggio/DataViaggioController";
import Login from "./components/Login";
import AggiuntaController from "./components/aggiunta/AggiuntaController";
import RecensioneController from "./components/recensione/RecensioneController";
import PrenotazioneController from "./components/prenotazione/PrenotazioneController";
import StatsController from "./components/stats/stats";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        <AgenziaNavbar />
        <div className="bg-light p-5">
          <Routes>
            <Route path="/" element={<h1>CIAO</h1>} />
            <Route path="/tag" element={<TagController />} />
            <Route path="/citta" element={<CittaController />} />
            <Route path="/guide" element={<GuideController />} />
            <Route path="/clienti" element={<ClientiController />} />
            <Route path="/attivita" element={<AttivitaController />} />
            <Route path="/viaggio" element={<CreateViaggio />} />
            <Route path="/listviaggi" element={<ListViaggi />} />
            <Route path="/dataviaggio" element={<DataViaggioController />} />
            <Route path="/login" element={<Login />} />
            <Route path="/stats" element={<StatsController />} />
            <Route path="/aggiunta" element={<AggiuntaController />} />
            <Route path="/recensione" element={<RecensioneController />} />
            <Route path="/prenotazione" element={<PrenotazioneController />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </div>
);

export default App;

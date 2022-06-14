import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { httpHelper } from "../../helpers/httpHelper"
import { React, useState,useEffect } from "react";
import Cookies from 'js-cookie';

const NewRecensione = ({ recensioneData = {}, postRecensione }) => {
  const [data, setData] = useState({
    idPrenotazione: "",
    valutazione: "",
    descrizione: "",
    dataPubblicazione: "",
    prenotazioni: [],
    dataViaggio: []
  })

  const urlPrenotazioni = "http://localhost:8080/api/prenotazione"
  const urlDataViaggio = "http://localhost:8080/api/dataviaggio"

  useEffect(() => {
    loadData();
  }, [])

  const api = httpHelper();

  const handleValue = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handlePrenotazione = e => {
    setData({ ...data, idPrenotazione: e.target.value })
  }

  const getPrenotazioni = () => 
    api.get(`${urlPrenotazioni}/details/${getCliente()}`);

  const getDataViaggio = () =>
    api.get(`${urlDataViaggio}`);

  const getCliente = () => 
    Cookies.get('cliente');

  const submitRecensione = e => {
    e.preventDefault();

    let recensione = {...data};
    delete recensione['prenotazioni'];
    delete recensione['dataViaggio'];
    recensione['dataPubblicazione'] = new Date().toISOString().slice(0, 10);

    postRecensione(recensione);
  }

  const loadData = () => {
    Promise.all([getPrenotazioni(), getDataViaggio()])
    .then(res => {
      setData({...data, prenotazioni: res[0], dataViaggio: res[1]});
    });  
  }

  return (
    <Form onSubmit={submitRecensione}>
      <Form.Group>
        <Form.Label>
          Prenotazione
        </Form.Label>
        <Form.Select onChange={handlePrenotazione} defaultValue="placeholder" >
          <option value="placeholder" disabled>Scegli la prenotazione</option>
          {
            data.prenotazioni.length > 0 &&
              data.prenotazioni.map(p => <option key={p.IdPrenotazione} value={p.IdPrenotazione}>{p.IdPrenotazione} - {(new Date(p.DataAcquisto)).toLocaleDateString("it-IT")} - {p.PrezzoTotale}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Valutazione
        </Form.Label>
        <Form.Control type="number" placeholder="Valutazione" name="valutazione" onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Descrizione
        </Form.Label>
        <Form.Control type="text" placeholder="Descrizione" name="descrizione" maxLength={500} onChange={handleValue} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Crea
      </Button>
    </Form>
  )
}

export default NewRecensione;
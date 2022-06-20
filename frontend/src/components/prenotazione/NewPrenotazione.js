import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { httpHelper } from "../../helpers/httpHelper"
import { React, useState,useEffect } from "react";

const NewPrenotazione = ({ prenotazioneData = {}, postPrenotazione }) => {
  const [prenotazione, setPrenotazione] = useState({
    email: "",
    idDataViaggio: "",
    aggiunteIds: []
  })
  const [details, setDetails] = useState({
    aggiunte: [],
    dataViaggio: []
  })

  const urlDataViaggio = "http://localhost:8080/api/dataviaggio";
  const urlViaggio = "http://localhost:8080/api/viaggio";

  useEffect(() => {
    getDataViaggio();
  }, [])        

  const api = httpHelper();

  const handleValue = e => {
    setPrenotazione({ ...prenotazione, [e.target.name]: e.target.value })
  }

  const getDataViaggio = () => 
    api
        .get(`${urlDataViaggio}`)
        .then(res => setDataViaggio(res))
        .catch(err => console.log(err));

  const setDataViaggio = (dataViaggio) => {
    setDetails({...details, dataViaggio: dataViaggio});
  }

  const getAggiuntaViaggio = (id) => 
    api.get(`${urlViaggio}/upgrades/${id}`)

    const submitPrenotazione = e => {
    e.preventDefault();

    let data = {...prenotazione};
    data['dataAcquisto'] = new Date().toISOString().slice(0, 10);

    let tags = Array.from(document.getElementById("tagSelect").children)
      .filter(c => c.selected)
      .map(c => c.value);
    data['aggiunteIds'] = tags;
    postPrenotazione(data);
  }

  const handleViaggio = (e) => {
    let id = Number(e.target.value);
    setPrenotazione({ ...prenotazione, 'idDataViaggio': id });
    getAggiuntaViaggio(details.dataViaggio.find(element => element.idDataViaggio === id).idViaggio).then(res => 
      setDetails({...details, aggiunte: res})
    );
    }

  return (
    <Form onSubmit={submitPrenotazione}>
      <Form.Group>
        <Form.Label>
          Email Cliente
        </Form.Label>
        <Form.Control type="text" placeholder="Email cliente" name="email" onChange={handleValue} />
      </Form.Group>
      <Form.Group></Form.Group>
      <Form.Group>
        <Form.Label>
          DataViaggio
        </Form.Label>
        <Form.Select onChange={handleViaggio} defaultValue="placeholder" >
          <option value="placeholder" disabled>Scegli il viaggio desiderato</option>
          {
            details.dataViaggio.length > 0 &&
              details.dataViaggio.map(p => <option key={p.idDataViaggio} value={p.idDataViaggio}>{p.idDataViaggio} - {p.descrizione} - {(new Date(p.dataPartenza)).toLocaleDateString("it-IT")}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Aggiunte
        </Form.Label>
        <Form.Select multiple id="tagSelect" >
          {
            details.aggiunte.length > 0 &&
              details.aggiunte.map(p => <option key={p.IdAggiunta} value={p.IdAggiunta}>{p.Descrizione} - {p.Prezzo}</option>)
          }
        </Form.Select>
        <small>Tieni premuto CTRL per selezionare più tag.</small>
      </Form.Group>
      <Button variant="primary" type="submit">
        Crea
      </Button>
    </Form>
  )
}

export default NewPrenotazione;
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState, useEffect } from "react";
import { httpHelper } from "../helpers/httpHelper";

const NewDataViaggio = ({ dataviaggioData = {}, postData, data }) => {
  const [dataViaggio, setDataViaggio] = useState({
    dataPartenza: "",
    posti: "",
    prezzoBase: "",
    sconto: "",
    idGuida: "",
    idViaggio: "",
    guide: [],
    viaggi: []
  })

  const urlViaggi = "http://localhost:8080/api/viaggio"
  const urlGuide = "http://localhost:8080/api/guida"

  useEffect(() => {
		loadData();
	}, [])

  const api = httpHelper();

  const getGuide = () =>
    api.get(`${urlGuide}`);

  const getViaggi = () =>
    api.get(`${urlViaggi}`);

  const handleValue = e => {
    setDataViaggio({ ...dataViaggio, [e.target.name]: e.target.value })
  }

  const submitDataViaggio = e => {
    e.preventDefault();

    let data = {...dataViaggio};

    delete data["guide"];
    delete data["viaggi"];
    postData(data);
  }

  const handleGuida = e => {
    setDataViaggio({ ...dataViaggio, idGuida: e.target.value })
  }

  const handleViaggio = e => {
    setDataViaggio({ ...dataViaggio, idViaggio: e.target.value })
  }

  const loadData = () => {
    Promise.all([getGuide(), getViaggi()])
      .then(res => {
        setDataViaggio({...dataViaggio, guide: res[0], viaggi: res[1]});
      });
  }

  return (
    <Form onSubmit={submitDataViaggio}>
      <Form.Group>
        <Form.Label>
          Data di Partenza
        </Form.Label>
        <Form.Control type="date" name="dataPartenza" onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Posti
        </Form.Label>
        <Form.Control type="number" placeholder="Posti" name="posti" onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Prezzo Base
        </Form.Label>
        <Form.Control type="number" placeholder="Prezzo Base" name="prezzoBase" onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Sconto
        </Form.Label>
        <Form.Control type="number" placeholder="Sconto" name="sconto" onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Guida
        </Form.Label>
        <Form.Select onChange={handleGuida} defaultValue="placeholder" >
          <option value="placeholder" disabled>Scegli la guida</option>
          {
            dataViaggio.guide.length > 0 &&
              dataViaggio.guide.map(c => <option key={c.IdGuida} value={c.IdGuida}>{c.Email} - {c.Nome} {c.Cognome}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Viaggio
        </Form.Label>
        <Form.Select onChange={handleViaggio} defaultValue="placeholder" >
          <option value="placeholder" disabled>Scegli il viaggio</option>
          {
            dataViaggio.viaggi.length > 0 &&
              dataViaggio.viaggi.map(v => <option key={v.idViaggio} value={v.idViaggio}>{v.descrizione}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Crea
      </Button>
    </Form>
  )
}

export default NewDataViaggio;
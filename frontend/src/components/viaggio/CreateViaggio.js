import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { httpHelper } from "../../helpers/httpHelper"
import NewGiornata from "./NewGiornata";
import { isGuidaLogged } from "../../helpers/auth"

const CreateViaggio = () => {
  const [data, setData] = useState({
    attivita: [],
    aggiunteViaggio: [],
    aggiunteVisita: [],
    visite: [],
    giornate: [],
    inputGiornate: [],
    upgradeViaggioIds: [],
    periodo: {}
  });

	const urlAttivita = "http://localhost:8080/api/attivita"
	const urlAggiunta = "http://localhost:8080/api/aggiunta"
  const url = "http://localhost:8080/api/viaggio"
	const api = httpHelper()

	useEffect(() => {
		loadData();
	}, [])

  const loadAttivita = () => 
    api.get(`${urlAttivita}`)
    
  const loadAggiunte = () =>
    api.get(`${urlAggiunta}`)

  const loadData = () => {
    Promise.all([loadAttivita(), loadAggiunte()])
      .then(res => {
        let aggiunteViaggio = res[1].filter(a => !a.AggiuntaVisita);
        let aggiunteVisita = res[1].filter(a => a.AggiuntaVisita);
        setData({...data,
          attivita: res[0], 
          aggiunteViaggio: aggiunteViaggio,
          aggiunteVisita: aggiunteVisita
        });
      });
	}

  const updateGiornata = (numero, key, value) => {
    data.giornate[numero-1] = {
      ...data.giornate[numero-1],
      [key]: value
    };
    setData({
      ...data,
      giornate: data.giornate
    })
  }

  const updateVisite = (idx, key, value) => {
    console.log(idx, key, value);
    
    data.visite[idx] = {
      ...data.visite[idx],
      [key]: value
    };
    setData({
      ...data,
      visite: data.visite
    });
  }
  
  const addGiornata = () => {
    let id = data.inputGiornate.length + 1;
    let inputGiornate = data.inputGiornate;
    inputGiornate.push((
      <NewGiornata 
        key={id} 
        id={id} 
        updateGiornata={updateGiornata} 
        attivita={data.attivita} 
        updateVisite={updateVisite} 
        upgradeVisita={data.aggiunteVisita}
        getVisitaIdx={getVisitaIdx} />
    ))
    let giornate = data.giornate;
    data.giornate.push({numero: id, descrizione: ""});

    setData({
      ...data,
      inputGiornate: inputGiornate,
      giornate: giornate
    });
  }

  const handleValue = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handlePeriodo = e => {
    setData({
      ...data,
      periodo: {
        ...data.periodo,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleAggiuntaViaggio = e => {
    let updates = Array.from(document.getElementById("aggiunteViaggioSelect").children)
      .filter(u => u.selected)
      .map(u => u.value);

    handleValue({target: {name: "upgradeViaggioIds", value: updates}});
  }

  const postViaggio = e => {
    e.preventDefault();

    let viaggio = { ...data };
    delete viaggio["aggiunteVisita"];
    delete viaggio["aggiunteViaggio"];
    delete viaggio["inputGiornate"];
    delete viaggio["attivita"];

    console.log(viaggio);

    api.post(`${url}/create`, { body: viaggio })
			.catch(err => console.log(err))
  }

  const getVisitaIdx = () => {
    let visite = data.visite;
    visite.push({
      idAttivita: "",
      ora: "",
      updates: []
    });
    setData({
      ...data,
      visite: visite
    });
    return visite.length-1;
  };

  if (!isGuidaLogged()) return <strong>Fai l'accesso come guida prima di poter aggiungere un viaggio.</strong>

  return (
    <div>
      {/* { JSON.stringify(data) } */}
      
      <h2>Viaggio</h2>
      <Form>
        <Form.Group>
          <Form.Label>
            Descrizione
          </Form.Label>
          <Form.Control type="text" placeholder="Descrizione" name="descrizione" maxLength={500} onChange={handleValue} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Giorno inizio periodo
          </Form.Label>
          <Form.Control type="number" placeholder="Giorno" name="giornoInizio" onChange={handlePeriodo} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Mese inizio periodo
          </Form.Label>
          <Form.Control type="number" placeholder="Mese" name="meseInizio" onChange={handlePeriodo} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Giorno fine periodo
          </Form.Label>
          <Form.Control type="number" placeholder="Giorno" name="giornoFine" onChange={handlePeriodo} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Mese fine periodo
          </Form.Label>
          <Form.Control type="number" placeholder="Mese" name="meseFine" onChange={handlePeriodo} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Aggiunte Viaggio
          </Form.Label>
          <Form.Select multiple id="aggiunteViaggioSelect" onChange={handleAggiuntaViaggio} >
            {
              data.aggiunteViaggio.length > 0 &&
                data.aggiunteViaggio.map(a => <option key={a.IdAggiunta} value={a.IdAggiunta}>{a.Descrizione}</option>)
            }
          </Form.Select>
          <small>Tieni premuto CTRL per selezionare più tag.</small>
        </Form.Group>
      </Form>

      <div>
        { data.inputGiornate }
      </div>

      <Button onClick={addGiornata}>Aggiungi Giornata</Button>
      <br></br>
      <Button onClick={postViaggio}>Aggiungi Viaggio</Button>
    </div>
  )
};

export default CreateViaggio;
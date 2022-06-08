import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/esm/Button";
import { httpHelper } from "../../helpers/httpHelper"
import NewGiornata from "./NewGiornata";

const CreateViaggio = () => {
  const [data, setData] = useState({
    attivita: [],
    aggiunteViaggio: [],
    aggiunteVisita: [],
    visite: [],
    giornate: [],
    inputGiornate: []
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
    let giornate = data.giornate;
    giornate[numero-1] = {
      ...giornate[numero-1],
      [key]: value
    };
    setData({
      ...data,
      giornate: giornate
    })
  }
  
  const addGiornata = () => {
    let id = data.inputGiornate.length + 1;
    let inputGiornate = data.inputGiornate;
    inputGiornate.push((
      <NewGiornata key={id} id={id} updateGiornata={updateGiornata} attivita={data.attivita} upgradeVisita={data.aggiunteVisita} ></NewGiornata>
    ))
    let giornate = data.giornate;
    data.giornate.push({numero: id, descrizione: ""});

    setData({
      ...data,
      inputGiornate: inputGiornate,
      giornate: giornate
    });
  }

  return (
    <div>
      { JSON.stringify(data) }
      
      <div>
        { data.inputGiornate }
      </div>

      <Button onClick={addGiornata}>Aggiungi Giornata</Button>
    </div>
  )
};

export default CreateViaggio;
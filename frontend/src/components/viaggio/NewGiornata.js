import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState } from "react";
import NewVisita from "./NewVisita";

const NewGiornata = ({ id, updateGiornata, updateVisite, attivita, upgradeVisita, getVisitaIdx }) => {
  const [data, setData] = useState({
    inputVisite: []
  })

  const addVisita = () => {
    let id = data.inputVisite.length + 1;
    let inputVisite = data.inputVisite;
    inputVisite.push((
      <NewVisita key={id} idx={getVisitaIdx()} id={id} attivita={attivita} upgrade={upgradeVisita} updateVisite={updateVisite} ></NewVisita>
    ))
    setData({
      ...data,
      inputVisite: inputVisite
    });
  }

  const handleValue = e => {
    updateGiornata(id, e.target.name, e.target.value);
  }

  return (
    <>
      <h3>Giornata {id}</h3>

      <Form>
        <Form.Group>
          <Form.Label>
            Descrizione
          </Form.Label>
          <Form.Control type="text" placeholder="Descrizione" name="descrizione" maxLength={500} onChange={handleValue} />
        </Form.Group>
      </Form>

      <div>
        { data.inputVisite }
      </div>

      <Button onClick={addVisita}>Aggiungi Visita</Button>
    </>
);
}

export default NewGiornata;
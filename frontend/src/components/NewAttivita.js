import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState } from "react";

const NewAttivita = ({ attivitaData = {}, postAttivita, data }) => {
  const [attivita, setAttivita] = useState({
    descrizione: "",
    durata: "",
    idCitta: "",
    idTags: []
  })

  const handleValue = e => {
    setAttivita({ ...attivita, [e.target.name]: e.target.value })
  }

  const handleCitta = e => {
    setAttivita({ ...attivita, idCitta: e.target.value })
  }

  const submitAttivita = e => {
    e.preventDefault();

    if (attivita.idCitta === "") {
      alert("Scegli una citta");
      return;
    }
    
    let tags = Array.from(document.getElementById("tagSelect").children)
      .filter(c => c.selected)
      .map(c => c.value)

    setAttivita({
      ...attivita,
      idTags: tags
    });
    
    postAttivita(attivita);
  }

  return (
    <Form onSubmit={submitAttivita}>
      <Form.Group>
        <Form.Label>
          Descrizione
        </Form.Label>
        <Form.Control type="text" placeholder="Descrizione" name="descrizione" onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Durata
        </Form.Label>
        <Form.Control type="text" placeholder="Durata(h)" name="durata" onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Citta
        </Form.Label>
        <Form.Select onChange={handleCitta} defaultValue="placeholder" >
          <option value="placeholder" disabled>Scegli la citta</option>
          {
            data.citta.length > 0 &&
              data.citta.map(c => <option key={c.IdCitta} value={c.IdCitta}>{c.Nome}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Tags
        </Form.Label>
        <Form.Select multiple id="tagSelect" >
          {
            data.tags.length > 0 &&
              data.tags.map(c => <option key={c.IdTag} value={c.IdTag}>{c.Descrizione}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Crea
      </Button>
    </Form>
  )
}

export default NewAttivita;
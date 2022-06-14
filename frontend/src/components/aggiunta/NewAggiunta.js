import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState } from "react";

const NewAggiunta = ({ aggiuntaData = {}, postAggiunta }) => {
  const [aggiunta, setAggiunta] = useState({
    descrizione: "",
    prezzo: "",
    tipo: ""
  })

  const handleValue = e => {
    setAggiunta({ ...aggiunta, [e.target.name]: e.target.value })
  }

  const handleTipologia = e => {
    setAggiunta({ ...aggiunta, tipo: e.target.value })
  }

  const submitAggiunta = e => {
    e.preventDefault();
    
    let data = {...aggiunta};

    delete data["tipo"];
    data["aggiuntaVisita"] =  (aggiunta.tipo === "visita") ? true : false;
    
    postAggiunta(data);
  }

  return (
    <Form onSubmit={submitAggiunta}>
      <Form.Group>
        <Form.Label>
          Descrizione
        </Form.Label>
        <Form.Control type="text" placeholder="Descrizione" name="descrizione" maxLength={500} onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Prezzo
        </Form.Label>
        <Form.Control type="number" placeholder="Prezzo" name="prezzo" onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Tipologia
        </Form.Label>
        <Form.Select onChange={handleTipologia} defaultValue="placeholder" >

          <option value="placeholder" disabled>Scegli la tipologia</option>
          <option value="visita"> Aggiunta Visita </option>
          <option value="viaggio"> Aggiunta Viaggio </option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Crea
      </Button>
    </Form>
  )
}

export default NewAggiunta;
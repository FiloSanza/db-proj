import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState } from "react";

const NewCitta = ({ cittaData = {}, postCitta }) => {
  const [citta, setCitta] = useState({
    descrizione: "",
  })

  const handleValue = e => {
    setCitta({ ...citta, [e.target.name]: e.target.value })
    console.log(citta)
  }

  const submitCitta = e => {
    e.preventDefault();
    postCitta(citta);
  }

  return (
    <Form onSubmit={submitCitta}>
      <Form.Group>
        <Form.Label>
          Nome
        </Form.Label>
        <Form.Control type="text" placeholder="Nome" name="nome" maxLength={500} onChange={handleValue} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Crea
      </Button>
    </Form>
  )
}

export default NewCitta;
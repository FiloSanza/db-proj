import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState } from "react";

const NewUtente = ({ userData = {}, postUser }) => {
  const [user, setUser] = useState({
    nome: userData.Nome ?? "",
    cognome: userData.Cognome ?? "",
    email: userData.Email ?? "",
    dataNascita: userData.DataNascita ?? ""
  })

  const handleValue = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  const submitUtente = e => {
    e.preventDefault();
    postUser(user);
  }

  return (
    <Form onSubmit={submitUtente}>
      <Form.Group>
        <Form.Label>
          Nome
        </Form.Label>
        <Form.Control type="text" placeholder="Nome" name="nome" maxLength={100} onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Cognome
        </Form.Label>
        <Form.Control type="text" placeholder="Cognome" name="cognome" maxLength={100} onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Email
        </Form.Label>
        <Form.Control type="email" placeholder="Email" name="email" maxLength={50} onChange={handleValue} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Data di nascita
        </Form.Label>
        <Form.Control type="date" name="dataNascita" onChange={handleValue} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Crea
      </Button>
    </Form>
  )
}

export default NewUtente;
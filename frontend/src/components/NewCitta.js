import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState } from "react";

const NewCitta = ({ userData = {}, postUser }) => {
  const [user, setUser] = useState({
    descrizione: userData.Descrizione ?? "",
  })

  const handleValue = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  const submitCitta = e => {
    e.preventDefault();
    postUser(user);
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
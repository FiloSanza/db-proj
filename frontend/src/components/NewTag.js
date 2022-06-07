import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState } from "react";

const NewTag = ({ userData = {}, postUser }) => {
  const [user, setUser] = useState({
    descrizione: userData.Descrizione ?? "",
  })

  const handleValue = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  const submitTag = e => {
    e.preventDefault();
    postUser(user);
  }

  return (
    <Form onSubmit={submitTag}>
      <Form.Group>
        <Form.Label>
          Descrizione
        </Form.Label>
        <Form.Control type="text" placeholder="Descrizione" name="descrizione" maxLength={500} onChange={handleValue} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Crea
      </Button>
    </Form>
  )
}

export default NewTag;
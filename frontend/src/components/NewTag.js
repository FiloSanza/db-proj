import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { React, useState } from "react";

const NewTag = ({ tagData = {}, postTag }) => {
  const [tag, setTag] = useState({
    descrizione:  "",
  })

  const handleValue = e => {
    setTag({ ...tag, [e.target.name]: e.target.value })
    console.log(tag)
  }

  const submitTag = e => {
    e.preventDefault();
    postTag(tag);
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
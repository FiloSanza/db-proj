import Form from "react-bootstrap/Form";
import { React, useState } from "react";

const NewVisita = ({ id, updateVisite, attivita, upgrade }) => {  
  const handleAttivita = e => {

  }
  
  const handleValue = e => {

  }

  return (
    <>
      <h4>Visita {id}</h4>
      <Form>
        <Form.Group>
          <Form.Label>
            Attivita
          </Form.Label>
          <Form.Select onChange={handleAttivita} defaultValue="placeholder" >
            <option value="placeholder" disabled>Scegli l'attivita</option>
            {
              attivita.length > 0 &&
                attivita.map(a => <option key={a.idAttivita} value={a.idAttivita}>{a.descrizione}</option>)
            }
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Durata
          </Form.Label>
          <Form.Control type="text" placeholder="Durata" name="durata" maxLength={500} onChange={handleValue} />
        </Form.Group>
        <Form.Group>
        <Form.Label>
          Scegli quali aggiunte rendere disponibili
        </Form.Label>
        <Form.Select multiple id="tagSelect" >
          {
            upgrade.length > 0 &&
              upgrade.map(u => <option key={u.IdAggiunta} value={u.IdAggiunta}>{u.Descrizione} - {u.Prezzo}€</option>)
          }
        </Form.Select>
      </Form.Group>
      </Form>
    </>
  );
}

export default NewVisita;
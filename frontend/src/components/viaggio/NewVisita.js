import Form from "react-bootstrap/Form";
import { React, useEffect } from "react";

const NewVisita = ({ idx, id, updateVisite, attivita, upgrade, numeroGiornata }) => {    
  useEffect(() => updateVisite(idx, "numeroGiornata", numeroGiornata), []);
  
  const handleValue = e => {
    updateVisite(idx, e.target.name, e.target.value);
  }

  const handleAttivita = e => {
    updateVisite(idx, "idAttivita", e.target.value);
  }

  const handleUpgrade = e => {
    let updates = Array.from(document.getElementById(`upgradeSelect${idx}`).children)
      .filter(u => u.selected)
      .map(u => u.value);

    updateVisite(idx, "updates", updates);
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
            Ora
          </Form.Label>
          <Form.Control type="number" placeholder="Ora" name="ora" maxLength={500} onChange={handleValue} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Scegli quali aggiunte rendere disponibili
          </Form.Label>
          <Form.Select multiple id={`upgradeSelect${idx}`} onClick={handleUpgrade} >
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
import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import { httpHelper } from "../../helpers/httpHelper"
import { isGuidaLogged } from "../../helpers/auth"
import NewPrenotazione from "./NewPrenotazione"

const PrenotazioneController = () => {
	const [prenotazioni, setPrenotazione] = useState(null)

	const url = "http://localhost:8080/api/prenotazione";

	const api = httpHelper();

	useEffect(() => {
		getPrenotazioni();
	}, [])

	const postPrenotazione = prenotazione => {
      api
        .post(`${url}/create`, { body: prenotazione })
        .then(res => getPrenotazioni())
        .catch(err => console.log(err))
	}

	const getPrenotazioni = () => {
      api
        .get(`${url}`)
        .then(res => setPrenotazione(res))
        .catch(err => console.log(err))
	}

	if (!prenotazioni) return null
  if (!isGuidaLogged()) return <strong>Fai l'accesso come guida prima di visualizzare la pagina.</strong>

  console.log(prenotazioni);

	return (
      <>
      <h3>Nuova Prenotazione</h3>
      <NewPrenotazione 
        postPrenotazione={postPrenotazione}
      />
      <div className='all-users'>
        <h3>Prenotazioni</h3>
        <Table striped>
          <thead>
            <tr>
              <td>IdPrenotazione</td>
              <td>Cliente</td>
              <td>Data Acquisto</td>
              <td>IdDataViaggio</td>
              <td>Prezzo Totale</td>
            </tr>
          </thead>
          <tbody>
            { prenotazioni &&
              prenotazioni.map(p => 
              <tr key={p.IdPrenotazione}>
                  <td> { p.IdPrenotazione } </td>
                  <td> { p.Cliente.Email } </td>
                  <td> { (new Date(p.DataAcquisto)).toLocaleDateString("it-IT") } </td>
                  <td> { p.IdDataViaggio } </td>
                  <td> { p.PrezzoTotale } </td>
              </tr>
              )
            }
          </tbody>
        </Table>
      </div>
      </>
	    )
}

export default PrenotazioneController;
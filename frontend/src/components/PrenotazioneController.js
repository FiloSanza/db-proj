import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import { httpHelper } from "../helpers/httpHelper"
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
              {(prenotazioni && prenotazioni.length > 0) && Object.keys(prenotazioni[0]).map(k => <th key={k}>{ k }</th>)}
            </tr>
          </thead>
          <tbody>
            { prenotazioni &&
              prenotazioni.map(p => 
              <tr key={p.IdPrenotazione}>
                  <td> { p.IdPrenotazione } </td>
                  <td> { p.IdCliente } </td>
                  <td> { p.IdCliente } </td>
                  <td> { (new Date(p.DataAcquisto)).toLocaleDateString("it-IT") } </td>
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
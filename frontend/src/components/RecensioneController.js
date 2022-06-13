import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import { httpHelper } from "../helpers/httpHelper"
import NewRecensione from "./NewRecensione"

const RecensioneController = () => {
	const [recensioni, setRecensioni] = useState(null)

	const url = "http://localhost:8080/api/recensione";

	const api = httpHelper()

	useEffect(() => {
		getRecensioni();
	}, [])

	const postRecensione = recensione => {
    console.log(recensione);
		api
			.post(`${url}/create`, { body: recensione })
			.then(res => getRecensioni())
			.catch(err => console.log(err))
	}

	const getRecensioni = () => {
		api
			.get(`${url}`)
			.then(res => setRecensioni(res))
			.catch(err => console.log(err))
	}

	if (!recensioni) return null

	return (
		<>
    <h3>Nuova Recensione</h3>
    <NewRecensione 
      postRecensione={postRecensione}
    />
    <div className='all-users'>
      <h3>Recensioni</h3>
      <Table striped>
        <thead>
          <tr>
            {(recensioni && recensioni.length > 0) && Object.keys(recensioni[0]).map(k => <th key={k}>{ k }</th>)}
          </tr>
        </thead>
        <tbody>
          { recensioni &&
            Array.from(recensioni).map(r => 
              <tr key={r.IdRecensione}>
                <td> { r.IdRecensione } </td> 
                <td> { r.IdPrenotazione } </td>
                <td> { r.Valutazione } </td>
                <td> { r.Descrizione } </td>
                <td> { (new Date(r.DataPubblicazione)).toLocaleDateString("it-IT") } </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
		</>
	)
}

export default RecensioneController;
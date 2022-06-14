import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import { httpHelper } from "../../helpers/httpHelper"
import NewCitta from "./NewCitta"
import { isClienteLogged, isGuidaLogged, isUserLogged } from "../../helpers/auth"

const CittaController = () => {
	const [citta, setCitta] = useState(null)

	const url = "http://localhost:8080/api/citta"
	const api = httpHelper()

	useEffect(() => {
		getCitta()
	}, [])

	const postCitta = citta => {
    console.log(citta);
		api
			.post(`${url}/create`, { body: citta })
			.then(res => getCitta())
			.catch(err => console.log(err))
	}

	const getCitta = () => {
		api
			.get(`${url}`)
			.then(res => setCitta(res))
			.catch(err => console.log(err))
	}

	if (!citta) return null
  if (!isUserLogged()) return <strong>Fai il login prima di visualizzare questa pagina.</strong>

	return (
		<>
    {
      isGuidaLogged() &&
      <>
        <h3>Nuova Citta</h3>
        <NewCitta postCitta={postCitta} />
      </>
    }
    <div className='all-users'>
      <h3>Citta</h3>
      <Table striped>
        <thead>
          <tr>
            {(citta && citta.length > 0) && Object.keys(citta[0]).map(k => <th key={k}>{ k }</th>)}
          </tr>
        </thead>
        <tbody>
          { citta &&
            Array.from(citta).map(c => 
              <tr key={c.IdCitta}>
                <td> { c.IdCitta } </td>
                <td> { c.Nome } </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
		</>
	)
}

export default CittaController;
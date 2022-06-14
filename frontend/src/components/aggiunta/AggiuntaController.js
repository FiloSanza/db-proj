import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import { httpHelper } from "../../helpers/httpHelper"
import NewAggiunta from "./NewAggiunta"

const AggiuntaController = () => {
	const [aggiunta, setAggiunta] = useState(null)

	const url = "http://localhost:8080/api/aggiunta"
	const api = httpHelper()

	useEffect(() => {
		getAggiunta()
	}, [])

	const postAggiunta = aggiunta => {
		api
			.post(`${url}/create`, { body: aggiunta })
			.then(res => getAggiunta())
			.catch(err => console.log(err))
	}

	const getAggiunta = () => {
		api
			.get(`${url}`)
			.then(res => setAggiunta(res))
			.catch(err => console.log(err))
	}

	if (!aggiunta) return null

	return (
		<>
        <h3>Nuova Aggiunta</h3>
        <NewAggiunta 
            postAggiunta={postAggiunta}
        />
        <div className='all-users'>
        <h3>Aggiunta</h3>
        <Table striped>
            <thead>
            <tr>
                {(aggiunta && aggiunta.length > 0) && Object.keys(aggiunta[0]).map(k => <th key={k}>{ k }</th>)}
            </tr>
            </thead>
            <tbody>
            { aggiunta &&
                Array.from(aggiunta).map(a => 
                <tr key={ a.IdAggiunta }>
                    <td> { a.IdAggiunta } </td>
                    <td> { a.Descrizione } </td>
                    <td> { a.Prezzo } </td>
                    <td> { a.AggiuntaVisita.toString() } </td>
                </tr>
                )
            }
            </tbody>
        </Table>
        </div>
        </>
	)
}

export default AggiuntaController;
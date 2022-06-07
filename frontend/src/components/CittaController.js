import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import { httpHelper } from "../helpers/httpHelper"
import NewCitta from "./NewCitta"

const CittaController = () => {
	const [users, setUsers] = useState(null)

	const url = "http://localhost:8080/api/citta"
	const api = httpHelper()

	useEffect(() => {
		getUsers()
	}, [])

	const postUser = user => {
    console.log(user);
		api
			.post(`${url}/create`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	const getUsers = () => {
		api
			.get(`${url}`)
			.then(res => {
				setUsers(res)
			})
			.catch(err => console.log(err))
	}

	if (!users) return null

	return (
		<>
    <h3>Nuova Citta</h3>
    <NewCitta 
      postUser={postUser}
    />
    <div className='all-users'>
      <h3>Citta</h3>
      <Table striped>
        <thead>
          <tr>
            {(users && users.length > 0) && Object.keys(users[0]).map(k => <th key={k}>{ k }</th>)}
          </tr>
        </thead>
        <tbody>
          { users &&
            users.map(u => 
              <tr key={u.IdCitta}>
                <td> { u.IdCitta } </td>
                <td> { u.Nome } </td>
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
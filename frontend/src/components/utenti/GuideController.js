import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Card from "react-bootstrap/Card"
import NewUtente from "./NewUtente"
import { isGuidaLogged } from "../../helpers/auth"

import { httpHelper } from "../../helpers/httpHelper"

const GuideController = () => {
	const [users, setUsers] = useState(null)
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    idGuida: "",
    nome: "",
    cognome: "",
    dataNascita: "",
    email: "",
    viaggi: []
  });

	const url = "http://localhost:8080/api/guida"
	const api = httpHelper()

	useEffect(() => {
		getUsers()
	}, [])

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    api.get(`${url}/details/${id}`)
      .then(res => {
        setDetails(res);
        setShow(true);
      })
      .catch(err => console.log(err));
  };

	const postUser = user => {
    console.log(user);
		api
			.post(`${url}/register`, { body: user })
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
  if (!isGuidaLogged()) return <strong>Fai l'accesso come guida prima di visuallizare la pagina.</strong>

	return (
		<>
    <h3>Nuova Guida</h3>
    <NewUtente 
      postUser={postUser}
    />
    <div className='all-users'>
      <h3>Guide</h3>
      <Table striped>
        <thead>
          <tr>
            {(users && users.length > 0) && Object.keys(users[0]).map(k => <th key={k}>{ k }</th>)}
          </tr>
        </thead>
        <tbody>
          { users &&
            users.map(u => 
              <tr key={u.IdGuida} onClick={e => handleShow(u.IdGuida)}>
                <td> { u.IdGuida } </td>
                <td> { u.Nome } </td>
                <td> { u.Cognome } </td>
                <td> { (new Date(u.DataNascita)).toLocaleDateString("it-IT") } </td>
                <td> { u.Email } </td>
              </tr>
            )
          }
        </tbody>
      </Table>
      <small>Fai click su una riga per vedere i dettagli.</small>
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dettaglio Guida {details.idGuida}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <strong>Nome: </strong> {details.nome}
          <br />
          <strong>Cognome: </strong> {details.cognome} 
          <br />
          <strong>Data di Nascita: </strong> {(new Date(details.dataNascita)).toLocaleDateString("it-IT")}
          <br />
          <strong>Email: </strong> {details.email}
          <br />
          <br />
          {
            details.viaggi.length > 0 &&
            <>
              <div className="text-center"><h3>Prenotazioni</h3></div>
              {
                details.viaggi.map(v =>
                  <Card key={v.dataPartenza}>
                    <Card.Header>{(new Date(v.dataPartenza)).toLocaleDateString("it-IT")}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <strong>Descrizione: </strong> {v.descrizione}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              }
            </>
          }
        </div>
      </Modal.Body>
    </Modal>
		</>
	)
}

export default GuideController;
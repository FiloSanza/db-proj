import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Card from "react-bootstrap/Card"
import NewUtente from "./NewUtente"
import { isGuidaLogged } from "../../helpers/auth"
import { httpHelper } from "../../helpers/httpHelper"

const ClientiController = () => {
	const [users, setUsers] = useState(null)
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    IdCliente: "",
    nome: "",
    cognome: "",
    dataNascita: "",
    email: "",
    viaggi: [],
    viaggioInCorso: null
  });
  
	const url = "http://localhost:8080/api/cliente"
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
			.then(res => setUsers(res))
			.catch(err => console.log(err))
	}

	if (!users) return null
  if (!isGuidaLogged()) return <strong>Fai l'accesso come guida prima di visualizzare la pagina.</strong>

	return (
		<>
    <h3>Nuovo Cliente</h3>
    <NewUtente 
      postUser={postUser}
    />
    <div className='all-users'>
      <h3>Clienti</h3>
      <Table striped>
        <thead>
          <tr>
            {(users && users.length > 0) && Object.keys(users[0]).map(k => <th key={k}>{ k }</th>)}
          </tr>
        </thead>
        <tbody>
          { users &&
            users.map(u =>
              <tr key={u.IdCliente} onClick={e => handleShow(u.IdCliente)}>
                <td> { u.IdCliente } </td>
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
        <Modal.Title>Dettaglio Cliente {details.IdCliente}</Modal.Title>
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
            (details.prenotazioni && details.prenotazioni.length > 0) &&
            <>
              <div className="text-center"><h3>Prenotazioni</h3></div>
              {
                details.prenotazioni.map(p =>
                  <Card key={p.idPrenotazione}>
                    <Card.Header>{(new Date(p.partenza)).toLocaleDateString("it-IT")}</Card.Header>
                    <Card.Body>
                      <Card.Title>{p.viaggio}</Card.Title>
                      <Card.Text>
                        <strong>Guida: </strong> {p.guida}
                        <br /> 
                        <strong>Data Acquisto: </strong> {(new Date(p.dataAcquisto)).toLocaleDateString("it-IT")}
                        <br />
                        {p.recensione.valutazione && <><strong>Valutazione: </strong> {p.recensione.valutazione}</>}
                        <br />
                        {p.recensione.descrizione && <><strong>Descrizione: </strong> {p.recensione.descrizione}</>}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              }
            </>
          }
          {
            (details.viaggioInCorso && details.viaggioInCorso.length > 0) &&
            <>
              <h3>Viaggio in corso</h3>
              {
                details.viaggioInCorso.map(a => {
                  <Card key={a.idVisita}>
                    <Card.Body>
                      <Card.Title>{a.descrizione}</Card.Title>
                      <Card.Text>
                        <strong>Data: </strong> {a.inizio}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                })
              }
            </>
          }
        </div>
      </Modal.Body>
    </Modal>
		</>
	)
}

export default ClientiController;
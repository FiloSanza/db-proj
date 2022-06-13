import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table";
import NewAttivita from "./NewAttivita";
import { httpHelper } from "../helpers/httpHelper"

const AttivitaController = () => {
	const [data, setData] = useState({
    attivita: [],
    tags: [],
    citta: []
  });

  const urlCitta = "http://localhost:8080/api/citta"
  const urlTag = "http://localhost:8080/api/tag"
	const url = "http://localhost:8080/api/attivita"
	const api = httpHelper()

	useEffect(() => {
		loadData();
	}, [])

	const postAttivita = attivita => {
		api.post(`${url}/create`, { body: attivita })
			.then(res => loadData())
			.catch(err => console.log(err))
	}

  const getTags = () => 
    api.get(`${urlTag}`);

  const getCitta = () =>
    api.get(`${urlCitta}`);

  const getAttivita = () => 
    api.get(`${url}`);
  
	const loadData = () => {
    Promise.all([getTags(), getCitta(), getAttivita()])
      .then(res => setData({tags: res[0], citta: res[1], attivita: res[2]}));
	}

	if (!data.attivita) return null

	return (
		<>
      <h3>Nuova Attivita</h3>
      <NewAttivita data={data}
        postAttivita={postAttivita}
      />
      <div className='all-users'>
        <h3>Attivita</h3>
        <Table striped>
          <thead>
            <tr>
              <th> IdAttivita </th>
              <th> Descrizione </th>
              <th> Durata(h) </th>
              <th> Citta </th>
              <th> Tags </th>
            </tr>
          </thead>
          <tbody>
            { data.attivita && data.attivita.map(a => 
                <tr key={a.idAttivita}>
                  <td> { a.idAttivita } </td>
                  <td> { a.descrizione } </td>
                  <td> { a.durata } </td>
                  <td> { a.citta.nome } </td>
                  <td> { a.tags.map(t => t.descrizione).join(', ') } </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
		</>
	)
}

export default AttivitaController;
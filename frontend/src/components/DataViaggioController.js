import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import { httpHelper } from "../helpers/httpHelper"
import NewDataViaggio from "./NewDataViaggio"

const DataViaggioController = () => {
	const [data, setData] = useState({
    guide: [],
    viaggi: [],
    dataViaggio: []
  })

  const urlViaggi = "http://localhost:8080/api/viaggio"
  const urlGuide = "http://localhost:8080/api/guida"
	const url = "http://localhost:8080/api/dataviaggio"
	const api = httpHelper()

	useEffect(() => {
		loadData();
	})

	const postData = data => {
		api
			.post(`${url}/create`, { body: data })
			.then(res => getDataViaggio())
			.catch(err => console.log(err))
	}

	const getDataViaggio = () => {
		api.get(`${url}`)
      .then(res => setData({
        ...data,
        dataViaggio: res
      }))
      .catch(err => console.log(err))
	}

  const getGuide = () =>
    api.get(`${urlGuide}`);

  const getViaggi = () =>
    api.get(`${urlViaggi}`);

  const loadData = () => {
    Promise.all([getGuide(), getViaggi(), api.get(`${url}`)])
      .then(res => {
        setData({guide: res[0], viaggi: res[1],dataViaggio: res[2]});
      });
  }

	if (!data) return null

	return (
		<>
    <h3>Nuova Data Viaggio</h3>
    <NewDataViaggio
      postData={postData}
      data={data}
    />
    <div className='all-users'>
      <h3>Data Viaggio</h3>
      <Table striped>
        <thead>
          <tr>
              <th> idDataViaggio </th>
              <th> dataPartenza </th>          
              <th> posti </th>
              <th> prezzoBase </th>
              <th> sconto </th>
            </tr>
        </thead>
        <tbody>
          { data.dataViaggio &&
            Array.from(data.dataViaggio).map(dv => 
              <tr key={dv.idDataViaggio}>
                <td> { dv.idDataViaggio } </td>
                <td> { (new Date(dv.dataPartenza)).toLocaleDateString("it-IT") } </td>
                <td> { dv.posti } </td>
                <td> { dv.prezzoBase } </td>
                <td> { dv.sconto } </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
		</>
	)
}

export default DataViaggioController;
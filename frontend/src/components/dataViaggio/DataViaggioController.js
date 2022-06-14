import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import { httpHelper } from "../../helpers/httpHelper"
import { isUserLogged, isGuidaLogged } from "../../helpers/auth"
import NewDataViaggio from "./NewDataViaggio"

const DataViaggioController = () => {
	const [data, setData] = useState({
    guide: [],
    viaggi: []
  })
  const [dataViaggio, setDataViaggio] = useState([]);
  const [tableSort, setTableSort] = useState({
    idDataViaggio: false,
    dataPartenza: false,
    posti: false,
    prezzoBase: false,
    sconto: false
  })

  const urlViaggi = "http://localhost:8080/api/viaggio"
  const urlGuide = "http://localhost:8080/api/guida"
	const url = "http://localhost:8080/api/dataviaggio"
	const api = httpHelper()

	useEffect(() => {
		loadData();
	}, [])

	const postData = data => {
		api
			.post(`${url}/create`, { body: data })
			.then(res => getDataViaggio())
			.catch(err => console.log(err))
	}

	const getDataViaggio = () => {
		api.get(`${url}`)
      .then(res => setDataViaggio(res))
      .catch(err => console.log(err))
	}

  const getGuide = () =>
    api.get(`${urlGuide}`);

  const getViaggi = () =>
    api.get(`${urlViaggi}`);

  const loadData = () => {
    Promise.all([getGuide(), getViaggi(), api.get(`${url}`)])
      .then(res => {
        setData({guide: res[0], viaggi: res[1]});
        setDataViaggio(res[2]);
      });
  }

  const sortTable = e => {
    let key = e.target.id;
    let desc = !tableSort[key];
    setTableSort({...tableSort, [key]: desc});

    let tmpDataViaggio = dataViaggio.map(d => Object.assign({}, d));
    tmpDataViaggio.sort((a, b) => {
      if (a[key] < b[key]) return desc ? -1 : 1;
      else if (a[key] > b[key]) return desc ? 1 : -1;
      else return 0;  
    })
    
    setDataViaggio(tmpDataViaggio);
  }

	if (!data) return null
  if (!isUserLogged()) return <strong>Fai il login prima di visualizzare questa pagina.</strong>

	return (
		<>
    {
      isGuidaLogged() &&
      <>
        <h3>Nuova Data Viaggio</h3>
       <NewDataViaggio postData={postData} data={data} />
      </>
    }
    <div className='all-users'>
      <h3>Data Viaggio</h3>
      <Table striped>
        <thead>
          <tr>
              <th id="idDataViaggio" onClick={sortTable}> idDataViaggio </th>
              <th id="dataPartenza" onClick={sortTable}> dataPartenza </th>          
              <th id="posti" onClick={sortTable}> posti </th>
              <th id="prezzoBase" onClick={sortTable}> prezzoBase </th>
              <th id="sconto" onClick={sortTable}> sconto </th>
            </tr>
        </thead>
        <tbody>
          { dataViaggio &&
            Array.from(dataViaggio).map(dv => 
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
      <small>Clicca sull'header della tabella per ordinare le righe.</small>
    </div>
		</>
	)
}

export default DataViaggioController;
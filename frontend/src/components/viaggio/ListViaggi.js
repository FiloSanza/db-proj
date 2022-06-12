import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table";
import { httpHelper } from "../../helpers/httpHelper"

const ListViaggi = () => {
    const [data, setData] = useState({
      viaggi: []
    });

    const url = "http://localhost:8080/api/viaggio";
    const api = httpHelper();

    useEffect(() => {
      loadData();
    }, [])

    const loadData = () => {
      api.get(url)
        .then(res => {
          setData({viaggi: res});
        })
        .catch(err => console.log(err));
    }

    return (
      <>
        <h1>Viaggi</h1>

        <Table striped>
           <thead>
             <tr>
               <th> IdViaggio </th>
               <th> Descrizione </th>
               <th> Giornate </th>
               <th> Periodo </th>
             </tr>
           </thead>
           <tbody>
             { data.viaggi && data.viaggi.map(v => 
                <tr key={v.idViaggio}>
                  <td> {v.idViaggio} </td>
                  <td> {v.descrizione} </td>
                  <td> {v.giornate.length} </td>
                  <td> {v.periodo.giornoInizio}/{v.periodo.meseInizio} - {v.periodo.giornoFine}/{v.periodo.meseFine} </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </>
    );
}

export default ListViaggi;

import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table";
import { httpHelper } from "../../helpers/httpHelper"
import Form from "react-bootstrap/Form"

const ListViaggi = () => {
    const [viaggi, setViaggi] = useState([]);
    const [tags, setTags] = useState([]);

    let search = "";
    let searchTags = [];

    const url = "http://localhost:8080/api/viaggio";
    const urlTag = "http://localhost:8080/api/tag";
    const api = httpHelper();

    useEffect(() => {
      loadData();
    }, [])

    const loadViaggi = () =>
      api.get(url)

    const loadTags = () =>
      api.get(urlTag)

    const loadData = () => {
      Promise.all([loadViaggi(), loadTags()])
        .then(res => {
          console.log(res);
          setViaggi(res[0].map(v => ({...v, isVisible: true})));
          setTags(res[1]);
        })
    }

    const handleSearch = e => {
      search = e.target.value;
      updateList();
    }

    const handleTags = e => {
      searchTags = Array.from(document.getElementById("tagSelect").children)
        .filter(c => c.selected)
        .map(c => c.value);
      updateList();
    }

    const updateList = () => {
      let tmpViaggi = viaggi.map(v => Object.assign({}, v));
      
      tmpViaggi.forEach(v => {
          let vtags = v.tags.map(t => t.IdTag.toString());
          v.isVisible = v.descrizione.toLowerCase().includes(search.toLowerCase())
            && searchTags.every(st => vtags.includes(st));
      });
      setViaggi(tmpViaggi);
    }

    return (
      <>
        <h1>Viaggi</h1>
        <Form>
        <Form.Group>
          <Form.Label>
            Cerca
          </Form.Label>
          <Form.Control type="text" placeholder="Cerca per descrizione" name="cerca" onChange={handleSearch} />
        </Form.Group>
        <Form.Group>
        <Form.Label>
          Tags
        </Form.Label>
          <Form.Select multiple id="tagSelect" onClick={handleTags}>
            {
              tags.length > 0 &&
                tags.map(c => <option key={c.IdTag} value={c.IdTag}>{c.Descrizione}</option>)
            }
          </Form.Select>
        </Form.Group>
        </Form>
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
             { viaggi && viaggi.filter(v => v.isVisible).map(v => 
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

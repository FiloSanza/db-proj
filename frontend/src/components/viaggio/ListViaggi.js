import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table";
import { httpHelper } from "../../helpers/httpHelper"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"
import { isUserLogged } from "../../helpers/auth";

const ListViaggi = () => {
    const [viaggi, setViaggi] = useState([]);
    const [tags, setTags] = useState([]);
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({
      periodo: {},
      tags: [],
      aggiunte: [],
      recensioni: []
    });
    const [tableSort, setTableSort] = useState({
      idViaggio: false,
      descrizione: false,
      giornate: false,
      periodo: false,
      valutazione: false
    })

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

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      api.get(`${url}/details/${id}`)
      .then(res => {
        setDetails(res);
        setShow(true);
        console.log(res);
      })
      .catch(err => console.log(err));
    }

    const sortTable = e => {
      let key = e.target.id;
      let desc = !tableSort[key];
      setTableSort({...tableSort, [key]: desc});

      let tmpViaggi = viaggi.map(v => Object.assign({}, v));
      tmpViaggi.sort((a, b) => {
        if (a[key] < b[key]) return desc ? -1 : 1;
        else if (a[key] > b[key]) return desc ? 1 : -1;
        else return 0;
      });

      setViaggi(tmpViaggi);
    }

    if (!isUserLogged()) return <strong>Fai il login prima di visualizzare questa pagina.</strong>;

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
               <th id="idViaggio" onClick={sortTable}> IdViaggio </th>
               <th id="descrizione" onClick={sortTable}> Descrizione </th>
               <th id="giornate" onClick={sortTable}> Giornate </th>
               <th> Periodo </th>
               <th id="valutazione" onClick={sortTable}> Valutazione </th> 
             </tr>
           </thead>
           <tbody>
             { viaggi && viaggi.filter(v => v.isVisible).map(v => 
                <tr key={v.idViaggio} onClick={e => handleShow(v.idViaggio)}>
                  <td> {v.idViaggio} </td>
                  <td> {v.descrizione} </td>
                  <td> {v.giornate.length} </td>
                  <td> {v.periodo.giornoInizio}/{v.periodo.meseInizio} - {v.periodo.giornoFine}/{v.periodo.meseFine} </td>
                  <td> {v.valutazione} </td>
                </tr>
              )
            }
          </tbody>
        </Table>
        <small>Clicca su una riga per vedere i dettagli e sull'header della tabella per ordinare le righe.</small>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dettaglio Viaggio {details.idViaggio}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>Descrizione</h4>
              {details.descrizione}
              <br />
              <strong>Periodo: </strong> {details.periodo.giornoInizio}/{details.periodo.meseInizio} - {details.periodo.giornoFine}/{details.periodo.meseFine}
              <br />
              <strong>Tags: </strong> {details.tags.map(t => t.Descrizione).join(", ")}
              <br />
              <br />
              <h4>Aggiunte Disponibili</h4>
              <ListGroup variant="flush">
                { details.aggiunte.map(a => <ListGroup.Item key={a.idAggiunta}>{a.descrizione} - {a.prezzo}€</ListGroup.Item>) }
              </ListGroup>
              <br />
              <br />
              { details.recensioni.length > 0 &&
                <> 
                  <h4>Recensioni</h4>
                  <strong>Valutazione: </strong> {details.valutazione}
                  <br />
                  <br />
                  {
                    details.recensioni.map(r => (
                      <Card key={r.IdRecensione}>
                        <Card.Header>{r.cliente} - {(new Date(r.DataPubblicazione)).toLocaleDateString("it-IT")}</Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <strong>Valutazione: </strong> {r.Valutazione}
                            <br />
                            { r.Descrizione && 
                              <>
                                <strong>Descrizione: </strong> {r.Descrizione} 
                                <br />
                              </>
                            }
                            <strong>Guida: </strong> {r.guida}
                            <br /> 
                            <strong>Data Partenza: </strong> {(new Date(r.dataPartenza)).toLocaleDateString("it-IT")}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))
                  }
                </>
              }
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
}

export default ListViaggi;

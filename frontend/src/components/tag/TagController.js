import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Card from "react-bootstrap/Card"
import NewTag from "./NewTag"
import { httpHelper } from "../../helpers/httpHelper"

const TagController = () => {
	const [tags, setTags] = useState(null);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    idtag: "",
    descrizione: "",
    viaggi: []
  });

	const url = "http://localhost:8080/api/tag";
	const api = httpHelper();

	useEffect(() => {
		getTags()
	}, [])

	const postTag = tag => {
    console.log(tag);
		api
			.post(`${url}/create`, { body: tag })
			.then(res => getTags())
			.catch(err => console.log(err))
	}

	const getTags = () => {
		api
			.get(`${url}`)
			.then(res => setTags(res))
			.catch(err => console.log(err))
	}

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    api.get(`${url}/details/${id}`)
      .then(res => {
        setDetails(res);
        setShow(true);
      })
      .catch(err => console.log(err));
  };

	if (!tags) return null

	return (
		<>
    <h3>Nuovo Tag</h3>
    <NewTag 
      postTag={postTag}
    />
    <div className='all-users'>
      <h3>Tag</h3>
      <Table striped>
        <thead>
          <tr>
            {(tags && tags.length > 0) && Object.keys(tags[0]).map(k => <th key={k}>{ k }</th>)}
          </tr>
        </thead>
        <tbody>
          { tags &&
            Array.from(tags).map(t => 
              <tr key={t.IdTag} onClick={e => handleShow(t.IdTag)}>
                <td> { t.IdTag } </td>
                <td> { t.Descrizione } </td>
              </tr>
            )
          }
        </tbody>
      </Table>
      <small>Fai click su una riga per vedere i dettagli.</small>
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dettaglio Tag {details.IdTag}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <strong>IdTag: </strong> {details.idTag}
          <br />
          <strong>Descrizione: </strong> {details.descrizione} 
          <br />
          <br />
          {
            details.viaggi.length > 0 &&
            <>
              <div className="text-center"><h3>Viaggi</h3></div>
              {
                details.viaggi.map(v =>
                  <Card key={v.IdViaggio}>
                    <Card.Header>{v.idViaggio}</Card.Header>
                    <Card.Body>
                      <Card.Title>{v.viaggio}</Card.Title>
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

export default TagController;
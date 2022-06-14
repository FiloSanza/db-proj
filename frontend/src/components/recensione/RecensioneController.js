import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import { httpHelper } from "../../helpers/httpHelper"
import NewRecensione from "./NewRecensione"

const RecensioneController = () => {
	const [recensioni, setRecensioni] = useState(null)

	const url = "http://localhost:8080/api/recensione";

	const api = httpHelper()

	useEffect(() => {
		getRecensioni();
	}, [])

	const postRecensione = recensione => {
		api
			.post(`${url}/create`, { body: recensione })
			.then(res => getRecensioni())
			.catch(err => console.log(err))
	}

	const getRecensioni = () => {
		api
			.get(`${url}`)
			.then(res => setRecensioni(res))
			.catch(err => console.log(err))
	}

	if (!recensioni) return null

	return (
		<>
    <h3>Nuova Recensione</h3>
    <NewRecensione 
      postRecensione={postRecensione}
    />
    <div className='all-users'>
      <h3>Recensioni</h3>
      <div>
        {
          recensioni.length > 0 &&
          <>
            {
              recensioni.map(r =>
                <Card key={r.IdRecensione}>
                  <Card.Body>
                    <Card.Title>Recensione {r.IdRecensione}</Card.Title>
                    <Card.Text>
                      <strong>Id: </strong> {r.IdRecensione}
                      <br />
                      <strong>Descrizione: </strong> {r.Descrizione}
                      <br />
                      <strong>Valutazione: </strong> {r.Valutazione}
                      <br />
                      <strong>DataPubblicazione: </strong> {(new Date(r.DataPubblicazione)).toLocaleDateString("it-IT")}
                      <br />
                      <strong>DescrizioneViaggio: </strong> {r.DescrizioneViaggio}
                      <br />
                      <strong>DataPartenza: </strong> {(new Date(r.DataPartenza)).toLocaleDateString("it-IT")}
                      <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              )
            }
          </>
        }
      </div>
    </div>
		</>
	)
}

export default RecensioneController;
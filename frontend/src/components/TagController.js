import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import NewTag from "./NewTag"
import { httpHelper } from "../helpers/httpHelper"

const TagController = () => {
	const [tags, setTags] = useState(null)

	const url = "http://localhost:8080/api/tag"
	const api = httpHelper()

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
              <tr key={t.IdTag}>
                <td> { t.IdTag } </td>
                <td> { t.Descrizione } </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
		</>
	)
}

export default TagController;
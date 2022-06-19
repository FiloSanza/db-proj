import React, { useState, useEffect } from "react"
import { httpHelper } from "../../helpers/httpHelper"
import { isGuidaLogged } from "../../helpers/auth"

const StatsController = () => {
	const [stats, setStats] = useState({
    valutazioneViaggio: {},
    valutazioneGuida: {},
    maxAvgAggiunteViaggio: {}
  })

	const url = "http://localhost:8080/api/stats"
	const api = httpHelper()

	useEffect(() => {
		loadData()
	}, [])

	const loadData = () => {
		api
			.get(`${url}`)
			.then(res => setStats(res))
			.catch(err => console.log(err))
	}

  if (!isGuidaLogged()) return <strong>Fai l'accesso come guida prima di visualizzare la pagina.</strong>

  return (
    <>
      <h3>Statistiche</h3>
      <strong>Viaggio con miglior valutazione: </strong> {stats.valutazioneViaggio.descrizione} - {stats.valutazioneViaggio.valutazione}
      <br />
      <strong>Guida con valutazioni migliori: </strong> {stats.valutazioneGuida.guida} - {stats.valutazioneGuida.valutazioneMedia}
      <br />
      <strong>Viaggio con spesa maggiore in aggiunte: </strong> {stats.maxAvgAggiunteViaggio.descrizione} - {stats.maxAvgAggiunteViaggio.avgAggiunte}€
      <br />
      <strong>Speda media clienti: </strong> {stats.spesaMediaClienti}€
    </>
  );
}

export default StatsController;
import { useQuery } from "react-query"
import { useRef } from "react"
import { getEntries } from "./fetches"
import Entries from "./Entries"
import { Link } from "react-router-dom"

function MainApp() {
  const html = useRef(null)
  const entries = useQuery('entries', getEntries)

  return (
    <div>
      <Link to='/'>« I want to add more</Link>
      <h1>XSS scripts demo</h1>
      <span style={{ 'display': 'none' }} ref={html}></span>
      <Entries entries={entries.data} />
    </div>
  )
}

export default MainApp
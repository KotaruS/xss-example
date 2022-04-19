import { useMutation, useQuery, useQueryClient } from "react-query"
import { useContext, useEffect, useRef, useState } from "react"
import { MainContext } from "./App"
import { createEntry, getEntriesOfAuthor, deleteEntry, getEntries } from "./fetches"
import Entries from "./Entries"

function MainApp() {
  const { context, setContext } = useContext(MainContext)
  // const [html, setHtml] = useState({ __html: '' })
  const html = useRef(null)
  const queryClient = useQueryClient()
  const deleter = useMutation(deleteEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('entries')
    }
  })
  const entries = useQuery('entries', getEntries)

  const handleClick = (e, content) => {
    html.current.innerHTML = content
  }

  return (
    <div>
      <h1>XSS scripts demo</h1>
      <span style={{ 'display': 'none' }} ref={html}></span>
      <Entries entries={entries.data} />
    </div>
  )
}

export default MainApp
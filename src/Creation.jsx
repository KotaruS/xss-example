import { useMutation, useQuery, useQueryClient } from "react-query"
import { useContext, useEffect, useRef, useState } from "react"
import { MainContext } from "./App"
import { createEntry, getEntriesOfAuthor, deleteEntry } from "./fetches"
import Entries from "./Entries"
import { Link } from "react-router-dom"

function Creation() {
  const { context, setContext } = useContext(MainContext)
  // const [html, setHtml] = useState({ __html: '' })
  const queryClient = useQueryClient()
  const create = useMutation(createEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('entries')
    }
  })
  const entries = useQuery(['entries', context.garbage], getEntriesOfAuthor, {
    enabled: !!context.garbage
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    create.mutate({ content: e.target.content.value })
  }

  return (
    <div>
      <Link to='/hub'>To the results »</Link>
      <h1>Enter Your scripts!</h1>
      <form className="main-form" action="/" onSubmit={handleSubmit} method="post">

        <textarea rows="4" name="content" id="content" />
        <button type="submit">Odeslat</button>
      </form>
      <Entries entries={entries.data} />
    </div>
  )
}

export default Creation
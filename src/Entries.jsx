import { useContext, useRef, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { MainContext } from "./App"
import { deleteEntry, updateEntry } from "./fetches"

function Entries({ entries, }) {
  const { context, setContext } = useContext(MainContext)
  const queryClient = useQueryClient()
  const [select, setSelect] = useState('')
  const html = useRef(null)

  const deleter = useMutation(deleteEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('entries')
    }
  })

  const updater = useMutation(updateEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('entries')
      setSelect('')
    }
  })

  const handleUpdate = e => {
    e.preventDefault()
    console.log(select);

    updater.mutate({
      data: {
        content: e.target.content.value
      },
      id: e.target.button.value,
    })
  }

  return (
    <div className="entries">
      <div style={{ 'display': 'none' }} ref={html}></div>
      {entries && entries.map((entry, index) => (
        <div className="entry" key={entry._id}>
          <p className="index">{index + 1}</p>

          {(select === entry._id) ?
            <form action='/' onSubmit={handleUpdate}>
              <textarea className="content" name='content' id='content' defaultValue={entry.content} />
              <button name='button' id='button' type="submit" value={entry._id}>Odeslat</button>
            </form>
            : <div className="content">{entry.content}</div>
          }
          <div className="buttons">
            <button onClick={e => { html.current.innerHTML = entry.content }}>Aktivovat XSS</button>
            {(context.garbage === entry.author) && (
              <button className="red" onClick={e => deleter.mutate(entry._id)}>Smazat</button>
            )}
            {(context.garbage === entry.author) && (
              <button className="neutral" onClick={e => setSelect(entry._id)}>Editovat</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
export default Entries
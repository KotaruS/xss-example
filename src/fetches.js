
const API_URL = '/api'

const getConfig = () => ({
  'Authorization': localStorage.getItem('garbage') ? `Bearer ${localStorage.getItem('garbage')}` : undefined,
})

const createEntry = async (data) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        ...getConfig(),
      },
      body: JSON.stringify(data),
    })
    const result = await res.json()
    if (!res.ok) {
      throw result.message
    }
    return result
  } catch (err) {
    throw new Error(err)
  }
}

const getEntry = async ({ queryKey }) => {
  try {
    const [_key, key, value] = queryKey
    const query = (key && value) ? `/?${key}=${value}` : ''
    const res = await fetch(`${API_URL}/posts${query}`, {
      headers: getConfig(),
    })
    const result = await res.json()
    if (!res.ok) {
      throw result.message
    }
    return result
  } catch (err) {
    throw new Error(err)
  }
}

const getEntries = async ({ queryKey }) => {
  try {
    const res = await fetch(API_URL)
    const result = await res.json()
    if (!res.ok) {
      throw result.message
    }
    return result
  } catch (err) {
    throw new Error(err)
  }
}


const getEntriesOfAuthor = async ({ queryKey }) => {
  try {
    const [_key, author] = queryKey
    const res = await fetch(`${API_URL}/my/${author}`)
    const result = await res.json()
    if (!res.ok) {
      throw result.message
    }
    return result
  } catch (err) {
    throw new Error(err)
  }
}

const updateEntry = async ({ id, data }) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        ...getConfig(),
      },
      body: JSON.stringify(data),
    })
    const result = await res.json()
    if (!res.ok) {
      throw result.message
    }
    return result
  } catch (err) {
    throw new Error(err)
  }
}

const deleteEntry = async (uri) => {
  try {
    const res = await fetch(`${API_URL}/${uri}`, {
      method: 'DELETE',
      headers: getConfig(),
    })
    const result = await res.json()
    if (!res.ok) {
      throw result.message
    }
    return result
  } catch (err) {
    throw new Error(err)
  }
}

export {
  createEntry,
  getEntry,
  getEntries,
  getEntriesOfAuthor,
  updateEntry,
  deleteEntry,
}

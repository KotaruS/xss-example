import { createContext, useMemo, useState, useEffect } from "react"
import { QueryClient, QueryClientProvider, } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainApp from './MainApp'
import Creation from './Creation'

const queryClient = new QueryClient()
const MainContext = createContext()

function App() {
  document.cookie = 'secret=oi22,lw4-2hjio24_'
  document.cookie = 'password=oh no my password'
  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>
        <Router >
          <MiddleApp />
        </Router>
      </MainProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function MiddleApp() {

  useEffect(() => {
    if (!localStorage.getItem('garbage')) {
      localStorage.setItem('garbage', Math.random().toString(36).slice(2, 19))
    }
  }, [])
  return (
    <div className='main'>
      <Routes>
        <Route path='/hub' element={<MainApp />} />
        <Route path='/' element={<Creation />} />
      </Routes>
    </div>
  )
}

function MainProvider(props) {
  const garbage = localStorage.getItem('garbage')
  const [context, setContext] = useState({
    garbage,
  })
  const value = useMemo(() => ({ context, setContext }), [context])
  return (
    <MainContext.Provider {...props} value={value} />
  )
}

export { App, MainContext }

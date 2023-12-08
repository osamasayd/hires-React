import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Header from './Components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Header />


      <Footer />
    </>
  )
}

export default App

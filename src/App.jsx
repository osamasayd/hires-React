import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Header from './Components/Header'
import UploadAndDisplayImage from './Components/UploadAndDisplayImage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Header />
      <UploadAndDisplayImage />

      <Footer />
    </>
  )
}

export default App

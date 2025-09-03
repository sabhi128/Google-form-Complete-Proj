import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Form1 from './Components/Form1'
import Responses from './Components/Responses'

const App = () => {
  const [currentView, setCurrentView] = useState('builder'); // 'builder' or 'responses'

  return (
    <div>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      {currentView === 'builder' ? (
        <Form1 />
      ) : (
        <Responses />
      )}

    </div>
  )
}

export default App
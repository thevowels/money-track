import { useState } from 'react'
import './styles/style.scss'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
        <button className={"btn btn-primary"}>Bootstrap</button>
    </div>
  )
}

export default App

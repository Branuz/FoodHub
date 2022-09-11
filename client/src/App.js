import React, {useState, useEffect} from "react"

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/users").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      Hello World!
    </div>
  )
}

export default App
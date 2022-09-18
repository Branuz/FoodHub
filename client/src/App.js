import {useState, useEffect} from 'react';
import {Deploy} from './components/Deploy/Deploy';

function App() {
  const [state, setState] = useState({})

  useEffect(() => {
    fetch("/api").then(response => {
      if(response.status === 200){
        return response.json()
      }
    }).then(data => setState(data))
    .then(error => console.log(error))
  },[])

  return (
    <div className="App">
      <Deploy prop={state}/>
    </div>
  );
}

export default App

/*
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
*/
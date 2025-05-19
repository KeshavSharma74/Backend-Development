import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const App = () => {

  const [pizzas,setPizzas]=useState([]);

  const fetchData=async()=>{
    const data=await axios.get('/api/pizza');
    setPizzas(data.data);
  }

  useEffect( ()=>{
    fetchData();
  },[] )

  return (
    <div>
      <h1>This is my Pizza Ordering Website</h1>
      {
        pizzas.map( (pizza)=>{
          return <div key={pizza.id}>
              <p>Title : {pizza.title}</p>
              <p>Description : {pizza.description}</p>
          </div>
          
        } )
      }
    </div>
  )
}

export default App
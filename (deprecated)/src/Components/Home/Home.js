import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const questionsList = [{
  id:0,
  ProjectTitle: 'Infinite Scrolling',
  link: 'infinite-scroll',
}] 

function Home() {
  return (
    <div className='home-container'>
      <h1 className='home-heading'>All-in-one React Interview Questions</h1>
      <span style={{fontWeight: '500'}}>Access the Questions here...</span>

    <ul style={{listStyleType: ''}}>
      {questionsList.map(obj => (
        <li key={obj.id}>
          <Link to={`/${obj.link}`} className='list-item'>{obj.ProjectTitle} </Link>
          </li>
      ))}
    </ul>
    </div>
  )
}

export default Home
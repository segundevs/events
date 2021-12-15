import React from 'react';
import Card from '../../components/Card/Card';
import './home.scss';

const Home = ({events}) => {
  return (
    <div className="event_container">
      {events.map(event => (
        <React.Fragment key={event.sys.id}>
          <Card event={event}/>
        </React.Fragment> 
      ))}  
    </div>
  )
}

export default Home

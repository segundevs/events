import React from 'react';
import Card from '../components/Card';
import { Oval } from 'react-loading-icons'

const Home = ({events, loading, err}) => {
  return (
    <div className="event_container">
      {loading && <div className="home_loading-spinner"><Oval stroke="#0a014a" strokeWidth={4}/></div>}
      {err && <div>{err}</div>}
      {events.map(event => (
        <React.Fragment key={event.sys.id}>
          <Card event={event}/>
        </React.Fragment> 
      ))}  
    </div>
  )
}

export default Home

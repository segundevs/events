import React from 'react';
import Card from '../components/Card';

const Home = ({events, loading, err}) => {
  return (
    <div className="event_container">
      {loading && ( <div style={{textAlign: 'center', marginTop: '30vh', marginLeft: '30vw'}}>Fetching...</div> )}
      {err && <div>{err}</div>}
      {events.map(event => (
        <React.Fragment key={event.sys.id}>
          <Card event={event}/>
          <Card event={event}/>
        </React.Fragment> 
      ))}  
    </div>
  )
}

export default Home

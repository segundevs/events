import React from 'react';
import Card from '../components/Card';
import SkeletonCard from '../components/SkeletonCard';

const Home = ({events, loading, err}) => {
  return (
    <div className="event_container">
      {loading && (
        <React.Fragment>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </React.Fragment>
      )}
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

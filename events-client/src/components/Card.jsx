import React from 'react';
import {Link} from 'react-router-dom';

const Card = ({event}) => {

  const date = event.fields.date.split('T')[0];
  const time = event.fields.date.split('T')[1];

  return (
    <div className="card_container">
      <img src={event.fields.thumbnail.fields.file.url} alt={event.fields.title} className="event-img"/>
      <div className="event-details">
        <h2>{event.fields.title}</h2>
        <h4>Date: <span>{date}</span></h4>
        <h4>Time: <span>{time}</span></h4>
        <h4>Location: <span>{event.fields.location}</span></h4>
        <Link to={`/details/${event.fields.slug}`} className="btn">See more</Link>
      </div>
    </div>
  )
}

export default Card

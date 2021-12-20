import React from 'react';

const About = () => {
  return (
    <div className="about_container">
      This is a prototype for an event booking website built with React and Contentful (Headless CMS). For testing, use the following details for the stripe payment.
      <ul className="card_details">
        <li>Email: Your email address</li>
        <li>Card number: 4242 4242 4242</li>
        <li>Expiry date: 03/2023</li>
        <li>CVV: 123</li>
      </ul>
    </div>
  )
}

export default About

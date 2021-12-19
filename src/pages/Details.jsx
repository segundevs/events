import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { createClient } from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import StripeCheckout from 'react-stripe-checkout';
import { useParams, useHistory } from 'react-router-dom';
import {MdOutlineArrowBack} from 'react-icons/md';
import Skeleton from '../components/Skeleton';

const Details = ({ setDetails, setLink }) => {
  const { slug } = useParams();
  const history = useHistory();
  const [singleEvent, setSingleEvent] = useState([]);
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('');
  const [contentLoading, setContentLoading] = useState(false);
  const [contentErr, setContentErr] = useState('');

    const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  useEffect(() => {
    const getSingleEvent = async () => {
      setContentLoading(true)
      try {
        const res = await client.getEntries({'fields.slug': slug, content_type: 'event'});
        setSingleEvent(res.items[0].fields);
        setContentLoading(false)
      } catch (error) {
        setContentErr(error.message);
        setContentLoading(false)
      }
      
    }
      getSingleEvent()
    }, [slug])

    const {featuredImage, title, type, description, categoryAndPrice, link, speakersperformers} = singleEvent;

    const onToken = (token) => {
      setToken(token)
    }

    useEffect(() => {  
      const makePayment = async () => {
        setLoading(true)
        try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment`, {
          tokenId: token.id,
          amount: `${amount}00`, 
        })
        setDetails(res.data)
        setLoading(false)
        history.push('/ticket')
        
        } catch (error) {
          setErr('Please enter a valid amount')
          setLoading(false)
        }
      }

      token && makePayment()

    }, [amount, token, setDetails, history])

    useEffect(() => {
      setLink(link)
    }, [setLink, link])

  return (
    <React.Fragment>
      {contentErr && <p style={{textAlign: 'center'}}>{contentErr}</p>}
      {contentLoading && <Skeleton />}
      {featuredImage && title && type && description && categoryAndPrice && speakersperformers && (
        <div className="details_container">
          <button onClick={() => history.push('/')} className="back-btn"><MdOutlineArrowBack className="icon"/>  Go back</button>
          <img src={featuredImage && featuredImage.fields.file.url} alt={title} loading='lazy'/>
          <h2>{title}</h2>
          <h4>Event Type: <span> {type}</span></h4>
          <div className='description'>{documentToReactComponents(description)}</div>

          <h3>Speakers/Performers</h3>
          <ul>{speakersperformers && singleEvent.speakersperformers.map((sp => (<li key={sp} className='speakers'>{sp}</li>)))}</ul>

          <div className="tickets_prices">
            <span>Tickets</span>

             <select value={amount} onChange={(e) => setAmount(e.target.value)}>
               {(categoryAndPrice && categoryAndPrice.includes('Free')) ? <option value='free'>Free</option> : <option value={0}>Price</option>}
           
            {categoryAndPrice && categoryAndPrice.map((cat => (
              <option value={cat.split(' ')[1]} key={cat}>{cat}</option>
            )))}   
          </select>
          {amount <= 0 && <span style={{marginTop: '10px'}}>Please enter a valid amount</span>}
          </div> 

          {categoryAndPrice && categoryAndPrice.includes('Free') ? (<button onClick={() => window.location.replace(link)} target="_blank" className='ticket_btn'>Join</button>) : 
          (<StripeCheckout
          name="Events"
          image="https://source.unsplash.com/C6oPXOatFD8"
          description={`Your total is ${amount}00`}
          amount={`${amount}00`}
          token={onToken}
          panelLabel="Pay for event"
          stripeKey={process.env.REACT_APP_STRIPE_CLIENT_KEY}
          className="stripe_checkout"
          >
            {err && <p>{err}</p>}
            {loading? <p>Loading...</p> : (amount <= 0 ? <button className='ticket_btn' disabled>Buy ticket</button> : <button className='ticket_btn'>Buy ticket</button>)}
          </StripeCheckout>)
          }
  
        </div>
      )}
    </React.Fragment>  )
}

export default Details

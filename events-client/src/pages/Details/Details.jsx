import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { createClient } from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import StripeCheckout from 'react-stripe-checkout';
import { useParams, useHistory } from 'react-router-dom';
import {MdOutlineArrowBack} from 'react-icons/md';
import './details.scss';

const Details = ({ setDetails, setLink }) => {
  const { slug } = useParams();
  const history = useHistory();
  const [singleEvent, setSingleEvent] = useState([]);
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState(null);

    const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  useEffect(() => {
    const getSingleEvent = async () => {
      const res = await client.getEntries({'fields.slug': slug, content_type: 'event'});
      setSingleEvent(res.items[0].fields)
    }
      getSingleEvent()
    }, [slug])

    const {featuredImage, title, type, description, categoryAndPrice, link, speakersperformers} = singleEvent;

    const onToken = (token) => {
      setToken(token)
    }

    useEffect(() => {
      const makePayment = async () => {
        try {
          const res = await axios.post('http://localhost:5000/api/payment', {
          tokenId: token.id,
          amount: `${amount}00`, 
        })
        setDetails(res.data)
        history.push('/ticket')
        } catch (error) {
          console.log(error.message)
        }
      }
      token && makePayment()

    }, [amount, token, setDetails, history])

  return (
    <React.Fragment>
      {console.log(amount)}
      {singleEvent && (
        <div className="details_container">
          <button onClick={() => history.push('/')} className="back-btn"><MdOutlineArrowBack className="icon"/>  Go back</button>
          <img src={featuredImage && featuredImage.fields.file.url} alt={title} />
          <h2>{title}</h2>
          <h4>{type}</h4>
          <div>{documentToReactComponents(description)}</div>

          <select value={amount} onChange={(e) => setAmount(e.target.value)}>
            <option value={0}>Price</option>
            {categoryAndPrice && categoryAndPrice.map((cat => (
              cat !== 'Free' ?
              <option value={cat.split(' ')[1]} key={cat}>{cat}</option> :
              <option value='free'>Free</option>
            )))}   
          </select> 

          {categoryAndPrice && categoryAndPrice.map((cat => (
              cat === 'Free' ? (<button onClick={() => window.location.replace(link)} target="_blank">Join</button>) : setLink(link))))}

          <h3>Speakers/Performers</h3>
          <div>{speakersperformers && singleEvent.speakersperformers.map((sp => (<h5 key={sp}>{sp}</h5>)))}</div>

          <StripeCheckout
          name="Events"
          image="https://source.unsplash.com/C6oPXOatFD8"
          description={`Your total is ${amount}00`}
          amount={`${amount}00`}
          token={onToken}
          panelLabel="Pay for event"
          stripeKey={process.env.REACT_APP_STRIPE_CLIENT_KEY}
          >
            <button >Buy ticket</button>
          </StripeCheckout>
        </div>
      )}
    </React.Fragment>  )
}

export default Details

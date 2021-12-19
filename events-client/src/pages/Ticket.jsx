import {useState} from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';

const Ticket = ({ link, details }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  console.log(details)


  const handleClick = async () => {
    setLoading(true)
    try {
       await axios.post('http://localhost:5000/api/create-pdf', {
      email: details.billing_details.name,
      amount: details.amount.toLocaleString(),
      status: details.outcome.seller_message,
      type: details.payment_method_details.type
    });
    const pdf = await axios.get('http://localhost:5000/api/get-pdf', { responseType: 'blob' });
    const pdfBlob = new Blob([pdf.data], { type: 'application/pdf' })

    saveAs(pdfBlob, 'receipt.pdf')
    setLoading(false)
    } catch (error) {
      setErr(error.message)
      setLoading(false)
    }
  }


  return (
    <div className='ticket_container'>
      {err && <p>{err}</p>}
      <h3 className='ticket_heading'>Download your ticket and bring it with you to the venue</h3>
      {link && <button onClick={() => window.location.replace(link)} target="_blank" className='ticket_btn'>Join</button>}
      <button onClick={handleClick} className='ticket_btn'>{ loading ? 'Downloading...' : 'Download receipt'}</button>
    </div>
  )
}

export default Ticket

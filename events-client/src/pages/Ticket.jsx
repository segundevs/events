import { saveAs } from 'file-saver';
import axios from 'axios';

const Ticket = ({ link, details }) => {

  console.log(details)


  const handleClick = async () => {
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
    } catch (err) {
      console.log(err.message)
    }
  }


  return (
    <div>
      {console.log(details)}
      {link && <button onClick={() => window.location.replace(link)} target="_blank">Join</button>}
      Ticket
      <button onClick={handleClick}>Download receipt</button>
    </div>
  )
}

export default Ticket

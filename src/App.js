import { createClient } from "contentful";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Ticket from "./pages/Ticket";
import Contact from "./pages/Contact";

function App() {
  const [events, setEvents] = useState([]);
  const [details, setDetails] = useState([]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await client.getEntries({ content_type: "event" });
        setEvents(res.items);
        setLoading(false);
      } catch (error) {
        setErr(error.message);
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    return () => setDetails([]);
  }, []);

  return (
    <Router>
      <Header />
      <div className="app__container">
        <Switch>
          <Route path="/" exact>
            <Home events={events} loading={loading} err={err} />
          </Route>
          <Route path="/details/:slug">
            <Details setDetails={setDetails} setLink={setLink} />
          </Route>
          <Route path="/ticket">
            <Ticket link={link} details={details} />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

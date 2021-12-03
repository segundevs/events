import { createClient } from "contentful";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Ticket from "./pages/Ticket/Ticket";
import Checkout from "./pages/Checkout/Checkout";
import Contact from "./pages/Contact/Contact";

function App() {
  const [events, setEvents] = useState([]);

  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  useEffect(() => {
    const getData = async () => {
      const res = await client.getEntries({ content_type: "event" });
      setEvents(res.items);
    };
    getData();
  }, []);

  return (
    <Router>
      <Header />
      <div className="app__container">
        <Switch>
          <Route path="/" exact>
            <Home events={events} />
          </Route>
          <Route path="/details/:slug" client={client}>
            <Details />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/ticket">
            <Ticket />
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

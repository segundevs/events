import { createClient } from "contentful";
import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);

  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  const getData = async () => {
    const res = await client.getEntries({ content_type: "event" });
    setEvents(res.items);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {console.log(events)}
      <h1>Hello from contentful</h1>
    </div>
  );
}

export default App;

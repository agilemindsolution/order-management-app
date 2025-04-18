import React, { useEffect, useState } from "react";
import axios from "axios";

function Clients() {
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/clients")
      .then(response => setClients(response.data))
      .catch(error => console.error("Error fetching clients:", error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Clients</h2>
      <ul className="list-disc pl-5">
        {clients.map(client => (
          <li key={client.client_id}>{client.client_name} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;

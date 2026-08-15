import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useState, useEffect } from "react";
import personService from './services/persons'

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setEntries(persons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = entries.find((entry) => entry.name === name)

    if (!existingPerson) {
      const newEntry = { name, number };

      personService
        .create(newEntry)
        .then(returnedPerson => {
          setEntries([...entries, returnedPerson])
          setName("");
          setNumber("");
          setMessage({ type: 'success', text: `Added ${name}` })
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })

      return;
    }

    if (window.confirm(`${name} is already added to the phonebook, replace the old number with a new one?`)) {
      const newEntry = { ...existingPerson, number }
      personService
        .update(existingPerson.id, newEntry)
        .then(returnedPerson => {
          setEntries(entries.map(entry => entry.id === existingPerson.id ? returnedPerson : entry))
          setName("");
          setNumber("");
          setMessage({ type: 'success', text: `Changed the number of ${name}` })
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(error => {
          setMessage({ type: 'error', text: `Information of ${name} has already been removed from server` })
          setTimeout(() => {
            setMessage(null)
          }, 4000)
          console.log(`error: ${error.message}`)
          setEntries(entries.filter(entry => entry.id !== existingPerson.id))
        })
    }
  };

  const handleDelete = (id) => {
    const personName = entries.find(entry => entry.id === id).name

    if (!window.confirm(`Delete ${personName} ?`)) {
      return
    }

    personService
      .remove(id)
      .then(() => {
        setEntries(entries.filter(entry => entry.id !== id))
      })
      .catch(error => {
        setMessage({ type: 'error', text: `Information of ${personName} has already been removed from server` })
        setTimeout(() => {
          setMessage(null)
        }, 4000)
        console.log(`error: ${error.message}`)
        setEntries(entries.filter(entry => entry.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        number={number}
        setNumber={setNumber}
        name={name}
        setName={setName}
      />
      <h2>Numbers</h2>
      <Persons entries={entries} filter={filter} handleDelete={handleDelete} />
    </div>
  );
}

export default App;

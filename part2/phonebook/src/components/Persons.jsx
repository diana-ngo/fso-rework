const Persons = ({ entries, filter, handleDelete }) => {
  const filteredEntries = entries.filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <ul>
      {filteredEntries.map(entry => (
        <li key={entry.id}>
          {entry.name} {entry.number}
          <button onClick={() => handleDelete(entry.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
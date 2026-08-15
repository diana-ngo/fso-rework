const PersonForm = ({ handleSubmit, number, setNumber, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name: </label>
        <input id="name" onChange={(event) => setName(event.target.value)} value={name} />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input id="number" onChange={(event) => setNumber(event.target.value)} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
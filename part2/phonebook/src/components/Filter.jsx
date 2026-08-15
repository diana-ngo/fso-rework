const Filter = ({ filter, setFilter }) => {
  return (
    <>
      <label htmlFor="filter">filter shown with </label>
      <input id="filter" onChange={(event) => setFilter(event.target.value)} value={filter} />
    </>
  )
      
}

export default Filter
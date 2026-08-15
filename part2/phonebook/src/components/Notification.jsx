const Notification = ({ message }) => {
  if (!message) return

  return (
    <div className={message.type === 'success' ? 'success' : 'error'}>
      {message.text}
    </div>
  )
}

export default Notification
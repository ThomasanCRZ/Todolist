function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
        <h2>Todolist</h2>
        <p>Copyright © {currentYear} Kaiodev</p>
    </div>
  )
}

export default Footer
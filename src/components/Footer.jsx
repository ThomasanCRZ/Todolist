function Footer() {
    const currentYear = new Date().getFullYear();
    const urlKaiodev = "https://kaiodev.com";
  return (
    <div className="footer">
        <h2>Todolist</h2>
        <p>Copyright © {currentYear} <a href={urlKaiodev}>Kaiodev</a></p>
    </div>
  )
}

export default Footer
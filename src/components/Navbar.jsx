import { Link } from "react-router-dom"
import ToggleTheme from "./ToggleTheme"

function Navbar() {
  return (
    <div className="navbar">
      <h1><Link to="/">Todolist</Link></h1>
      <ToggleTheme />
      
      </div>
  )
}

export default Navbar
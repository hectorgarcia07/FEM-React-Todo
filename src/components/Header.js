const Header = () => {
  return(
    <div className="header-display">
      <header>
        <h1 className="header-title">TO DO</h1>
      </header>
      <div className="theme-container" id="theme-toggle">
        <button className="svg-theme-btn todo-btn"></button>
      </div>
    </div>
  )
}

export default Header
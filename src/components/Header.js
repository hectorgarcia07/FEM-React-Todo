const Header = () => {

  //toggles the theme switcher
  const themeToggle = () => {
    const html = document.getElementsByTagName('html')[0]
    
    if(html.dataset.theme === 'light-theme'){
      html.dataset.theme = 'dark-theme'
    }else{
      html.dataset.theme = 'light-theme'
    }
  }

  return(
    <div className="header-display">
      <header>
        <h1 className="header-title">TO DO</h1>
      </header>
      <div className="theme-container" id="theme-toggle">
        <button onClick={themeToggle} className="svg-theme-btn todo-btn"></button>
      </div>
    </div>
  )
}

export default Header
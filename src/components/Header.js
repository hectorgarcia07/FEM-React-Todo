import { HeaderDisplay } from "./styles/HeaderDisplay.styled"
import { HeaderTitle } from "./styles/HeaderTitle.styled"
import { ThemeContainer } from "./styles/Containers.styled"
import { ThemeToggleBtn } from "./styles/Button.styled"

//will control the theme toggler
const Header = ({ changeTheme }) => {

  return(
    <HeaderDisplay>
      <header>
        <HeaderTitle>TO DO</HeaderTitle>
      </header>
      <ThemeContainer id="theme-toggle">
        <ThemeToggleBtn onClick={() => changeTheme() }></ThemeToggleBtn>
      </ThemeContainer>
    </HeaderDisplay>
  )
}

export default Header
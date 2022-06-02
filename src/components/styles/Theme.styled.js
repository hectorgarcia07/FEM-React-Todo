import darkBGMobile from '../../images/bg-mobile-dark.jpg'
import darkBGDesktop from '../../images/bg-desktop-dark.jpg'
import iconPlusLight from '../../images/icon-plus-light.svg'
import iconSun from '../../images/icon-sun.svg'

import lightBGMobile from '../../images/bg-mobile-light.jpg'
import lightBGDesktop from '../../images/bg-desktop-light.jpg'
import iconPlusDark from '../../images/icon-plus-dark.svg'
import iconMoon from '../../images/icon-moon.svg'

export const dark = {
  name: "dark-theme",
  colors: {
    background: "hsl(235, 21%, 11%)",
    borderBottomColor: "hsl(237, 14%, 26%)",
    nodeBackgroundColor: "hsl(235, 24%, 19%)",
    formFontColor: "hsl(234, 11%, 52%)",
    fadedTextColor: "hsl(233, 14%, 35%)",
    fontColor: "hsl(234, 39%, 85%)",
    titleColor: "white",
    startGradient: "hsl(192, 100%, 67%)",
    endGradient: "hsl(280, 87%, 65%)",
    optionHoverColor: "hsl(236, 33%, 92%)",
    activeOptionColor: "hsl(220, 98%, 61%)",
    focusedCheckbox: "white"
  },
  imgs: {
    backgroundMobile: darkBGMobile,
    bacgroundDesktop: darkBGDesktop,
    iconPlus: iconPlusLight,
    themeIcon: iconSun,
  }
}

export const light = {
  name: "light-theme",
  colors: {
    background: "hsl(236, 33%, 92%)",
    borderBottomColor: "hsl(233, 11%, 84%)",
    nodeBackgroundColor: "hsl(0, 0%, 98%)",
    formFontColor: "hsl(234, 11%, 52%)",
    fadedTextColor: "hsl(0, 0%, 55%)",
    fontColor: "hsl(0, 0%, 35%)",
    titleColor: "white",
    startGradient: "hsl(192, 100%, 67%)",
    endGradient: "hsl(280, 87%, 65%)",
    optionHoverColor: "hsl(235, 19%, 35%)",
    activeOptionColor: "hsl(220, 98%, 61%)",
    focusedCheckbox: "black"
  },
  imgs: {
    backgroundMobile: lightBGMobile,
    bacgroundDesktop: lightBGDesktop,
    iconPlus: iconPlusDark,
    themeIcon: iconMoon,
  }
}

export const minWidth = '375px'
export const maxWidth = '390px' 
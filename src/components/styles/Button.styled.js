import styled, { css } from "styled-components"

import crossSvg from "../../images/icon-cross.svg"
import { minWidth } from "./Theme.styled"

export const ThemeToggleBtn = styled.button`
  background: url(${({theme}) => theme.imgs.themeIcon}) no-repeat center;
  border: none;

  border-radius: 50%;
  padding: 0.8rem;
  border: 1px solid var(--fadded-text-color);
`

export const CrossBtn = styled.button`
  margin-left: auto;
  background: url(${crossSvg}) no-repeat center;
  flex-basis: 1rem;
`

export const TodoClear = styled.button`
  font-size: 0.7rem;
  align-self: center;
  color: ${({theme}) => theme.colors.formFontColor};
  padding: 1rem;
  text-decoration: none;
  color: inherit;

  ${ props => props.desktop && css`
    display: none;
  `}

  &:hover {
    color: ${({theme}) => theme.colors.optionHoverColor};
  }

  @media(min-width: ${minWidth}){
    display: block;
    margin-left: auto;
  }
`
export const TodoFilterBtn = styled.button`
  color: ${({theme}) => theme.colors.fadedTextColor};
  font-weight: 800;
  padding: 1rem 0.5rem;

  &:hover {
    color: ${({theme}) => theme.colors.optionHoverColor};
  }
  
  &.active-option {
    color: ${({theme}) => theme.colors.activeOptionColor};
  }
  &.active-option:hover {
    color: ${({theme}) => theme.colors.activeOptionColor};
  }
`
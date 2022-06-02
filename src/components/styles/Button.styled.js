import styled from "styled-components"

import crossSvg from "../../images/icon-cross.svg"

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
import styled, {css} from "styled-components"
import { minWidth, maxWidth } from "./Theme.styled"

export const TodosLeft = styled.p`
  font-size: 0.7rem;
  align-self: center;
  color: ${({theme}) => theme.colors.formFontColor };
  padding: 1rem;

  &:hover {
    color: ${({theme}) => theme.colors.optionHoverColor };
  }

  ${(props) => props.desktop && css`
    display: none;

    @media(min-width: ${minWidth}){
      display: block;
      margin-right: auto
    }
  `};
`
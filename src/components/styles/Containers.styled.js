import styled from "styled-components"
import { minWidth, maxWidth } from './Theme.styled'

export const BackgroundContainer = styled.div`
  background: url(${({theme}) => theme.imgs.backgroundMobile }) no-repeat;

  @media (min-width: ${ minWidth }){
    background-image: url(${({theme}) => theme.imgs.bacgroundDesktop});
    max-height: 200px;
  }
`

export const ContentContainer = styled.div`
  padding-top: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;

  width: 87%;
  margin: 0 auto;

  .todo-list-container {
    margin-top: 0.2rem;
    padding: 0;
    overflow: auto;
    max-height: 335px;
  }

  .todo-node {
    display: flex;
    padding: 0 0.8rem 0 1rem;
    background-color: ${({theme}) => theme.colors.nodeBackgroundColor};
    color: ${({theme}) => theme.colors.fontColor};
    font-size: 1rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderBottomColor};
    transition: background-color 0.5s;
  }
  
  .todo-node:hover {
    cursor: pointer;
  }
  
  .todo-node:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .todo-node:last-child {
    border-bottom: none;
  }

  @media (min-width: ${ minWidth }){
    max-width: 560px;
  }
`
export const ThemeContainer = styled.div`
  align-self: end;
`
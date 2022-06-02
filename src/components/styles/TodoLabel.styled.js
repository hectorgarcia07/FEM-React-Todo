import styled from "styled-components";
import checkSvg from "../../images/icon-check.svg"

export const TodoLabel = styled.label`
  display: flex;
  width: 100%;
  cursor: pointer;
  padding: 1rem 0;

  user-select: none;
  cursor: pointer;
  line-height: 1.4;

  p::before {
    content: "";
    transition: 0.3s;
    margin-right: 0.8rem;
    border-radius: 50%;
    padding: 0.6rem;
    border: 1px solid ${({theme}) => theme.colors.fadedTextColor};
    display: inline-block;
  }

  input[type="checkbox"] {
    display: absolute;
    margin: 0;
    padding: 0;
    opacity: 0;
    height: 0;
    width: 0;
    pointer-events: none;
  }

  input[type="checkbox"]:hover + p::before {
    background: linear-gradient(
          ${({theme}) => theme.colors.nodeBackgroundColor},
          ${({theme}) => theme.colors.nodeBackgroundColor}
        )
        padding-box,
      linear-gradient(90deg, ${({theme}) => theme.colors.startGradient}, ${({theme}) => theme.colors.endGradient})
        border-box;
    border-radius: 50%;
    border-color: transparent;
  }

  input[type="checkbox"]:hover:checked + p::before {
    background: no-repeat center url(${checkSvg}) padding-box,
      linear-gradient(90deg, ${({theme}) => theme.colors.startGradient}, ${({theme}) => theme.colors.endGradient})
        border-box;
    border-radius: 50%;
    border-color: ${({theme}) => theme.colors.nodeBackgroundColor};
  }

  input:checked + p::before {
    background: no-repeat center url(${checkSvg}),
      linear-gradient(90deg, ${({theme}) => theme.colors.startGradient}, ${({theme}) => theme.colors.endGradient});
    border-color: ${({theme}) => theme.colors.nodeBackgroundColor};
    transition: 0.3s;
  }
  
  input:focus + p::before {
    border-color: ${({theme}) => theme.colors.focusedCheckbox};
  }

  .todo-description {
    font-size: 1rem;
    display: flex;
    align-items: center;
  }

  .todo-compleated {
    text-decoration: line-through;
    color: var(--fadded-text-color);
    transition: 0.3s;
  }
`
import styled from "styled-components";

export const NoteFormStyle = styled.form`
  display: flex;
  font-size: 1rem;
  padding: 0.9em 1em;
  background-color: ${({theme}) => theme.colors.nodeBackgroundColor };
  border-radius: 8px;
  margin: 2rem 0 0.8rem;
  transition: background-color 0.5s;

  .svg-plus-btn {
    border: none;
    background: url(${({theme}) => theme.imgs.iconPlus }) no-repeat center;
    border-radius: 50%;
    padding: .8rem;
  }

  .input-note {
    width: 100%;
    margin-left: 0.3em;
    color: ${({theme}) => theme.colors.fontColor };
    background-color: ${({theme}) => theme.colors.nodeBackgroundColor };
    border: none;
    transition: background-color 0.5s;
    font-size: 0.75rem;
    outline: none;
  }

`
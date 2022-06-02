import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Outfit", sans-serif;
  background-color: ${ ({ theme }) => theme.colors.background };
  transition: background-color 0.5s;
}

ul {
  margin: 0;
}

p {
  margin: 0;
}

img {
  display: block; /* without it this will display a small gap */
  margin: 0 auto;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border: 0px;
}

`
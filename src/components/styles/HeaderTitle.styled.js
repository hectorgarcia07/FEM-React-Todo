import styled from "styled-components";

export const HeaderTitle = styled.h1`
  font-weight: 700;
  font-size: 1.7rem;
  color: ${({theme}) => theme.colors.titleColor};
  letter-spacing: 0.25em;
  word-spacing: -0.5em; /* make note that -0.25 is most space on font */
  margin: 0;
`
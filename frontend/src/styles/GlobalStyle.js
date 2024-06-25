import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Montserrat);
* {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  /*   outline: 1px solid white; */
}

body {
  background: #000000;
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 1rem;
}
`;

export default GlobalStyle;
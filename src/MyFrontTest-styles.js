/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *:before, *:after {
  box-sizing: inherit;
}

form {
  margin: 1rem;
  padding: 1rem;
}

bbva-divider {
  display: block;
  margin: 2rem;
}

bbva-form-text {
  margin: 0 0 1rem;
}

bbva-button-default {
  width: 100%;
}
`;
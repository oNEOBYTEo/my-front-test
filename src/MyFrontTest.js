import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './MyFrontTest-styles.js';
import '@bbva-web-components/bbva-form-text/bbva-form-text.js';
import '@bbva-web-components/bbva-form-password/bbva-form-password.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';
import '@bbva-web-components/bbva-progress-content/bbva-progress-content.js';
import '@bbva-web-components/bbva-divider/bbva-divider.js';
// import '@bbva-web-components/bbva-help-modal/bbva-help-modal.js';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@bbva-web-components/bbva-table-default/bbva-table-default.js';
import '@bbva-web-components/bbva-list-bullet/bbva-list-bullet.js';
import '@bbva-web-components/bbva-list-contact/bbva-list-contact.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<my-front-test></my-front-test>
```

##styling-doc

@customElement my-front-test
*/
export class MyFrontTest extends LitElement {
  static get is() {
    return 'my-front-test';
  }

  // Declare properties
  static get properties() {
    return {
      userInputLabel: {
        type: String,
        attribute: 'user-input-label'
      },
      userInputValue: {
        type: String,
        attribute: 'user-input-value'
      },
      buttonText: {
        type: String,
        attribute: 'button-text'
      },
      loading: {
        type: Boolean
      },
      payload: {
        type: Array
      },
      company: {
        type: Object
      }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.userInputLabel = 'NIT Empresa';
    this.userInputValue = '';
    this.passwordInputValue = '';
    this.buttonText = 'Obtener';
    this.loading = false;
    this.payload = []
    this.company = {}
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('my-front-test-shared-styles')
    ];
  }

  _submit(ev) {
    ev.preventDefault();
    this.loading = true;
    
    this.dispatchEvent(new CustomEvent('my-custom-element-submit', {
      bubbles: true,
      composed: true,
      detail: {
        NIT: this.userInputValue,
      }
    }));
    console.log(this.payload)
  }

  _setCompany(company) {
    if (company.hasOwnProperty("CantidadAccionitas")) {
      this.company = company
      return false
    }
    return true
  }

  uploadAccionist(data) {
    data = data.filter(item => this.userInputValue === item.NIT && Number(item.Porcentaje.slice(0, item.Porcentaje.length - 1)) > 5 && this._setCompany(item))

    this.payload = data
  }

  _alertar() {
    console.log("Hollalala")
  }

  // Define a template
  render() {
    return html`
      <slot></slot>
      <bbva-header-main></bbva-header-main>
      <form ?hidden="${this.loading}">
        <bbva-form-text
        label="${this.userInputLabel}"
        .value="${this.userInputValue}"
        type="text"
        @input="${(e) => this.userInputValue = e.target.value}"
        required="">
        </bbva-form-text>
        <bbva-button-default 
        type="submit" 
        ?disabled="${!this.userInputValue}"
        @click="${this._submit}">
        ${this.buttonText}
        </bbva-button-default>
      </form>
      <bbva-divider></bbva-divider>
        ${this.company.Nombre ? html`<bbva-list-contact 
        disabled-tabindex
        content-title="${this.company.Nombre}"
        action-icon-primary=""
        action-icon-secondary=""
        title-icon="bbva:bizum"
        no-link
        image="https://picsum.photos/50"
        ></bbva-list-contact>` : html`<bbva-list-bullet>Empresa no encontrada</bbva-list-bullet>`}
        ${this.payload.length > 0 ? this.payload.map(item => html`<bbva-list-contact disabled-tabindex
        content-title="${item.Nombre}"
        action-primary=""
        action-icon-secondary=""
        title-icon="bbva:bizum"
        image="https://picsum.photos/48"
        ></bbva-list-contact>`) : html`<bbva-list-bullet>No hay accionistas (Lista de accionistas)</bbva-list-bullet>`}
      
      <bbva-progress-content
      ?hidden="${!this.loading}"
      visible="">
      </bbva-progress-content>
    `;
  }
}

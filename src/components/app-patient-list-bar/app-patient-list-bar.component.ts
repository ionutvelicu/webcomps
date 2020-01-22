import template from './app-patient-list-bar.template.html';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

const ATTR_COUNT = 'data-count';

class AppPatientListBar extends HTMLElement {
  private shadow: ShadowRoot;
  private $count: HTMLElement;
  private $search: HTMLElement;

  static get observedAttributes() {
    return [ATTR_COUNT];
  }

  constructor() {
      super();

      this.shadow = this.attachShadow({ mode: 'open' });
      this.shadow.appendChild(templateEl.content.cloneNode(true));

      this.$count = this.shadow.querySelector('#count');
      this.$search = this.shadow.querySelector('#search');

      this.$search.addEventListener('keyup', this.onSearchKeyup.bind(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === ATTR_COUNT) {
        this.$count.innerText = newValue;
    }
  }

  private onSearchKeyup(ev: KeyboardEvent) {
    const event = new CustomEvent('search', {
      bubbles: true,
      composed: true,
      detail: {
        query: (<HTMLInputElement>ev.target).value
      }
    });
    this.dispatchEvent(event);
  }
}

window.customElements.define('app-patient-list-bar', AppPatientListBar);



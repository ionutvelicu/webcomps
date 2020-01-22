import template from './app-top-bar.template.html';
import { Routes } from '../../router.module';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

interface Btn {
  key: string;
  $elem: HTMLElement;
}

class AppTopBarComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private $btns: Btn[];

  constructor() {
      super();

      this.shadow = this.attachShadow({ mode: 'open' });
      this.shadow.appendChild(templateEl.content.cloneNode(true));
  }

  connectedCallback() {
    this.loadButtons();
    const selected = this.getAttribute('selected');

    this.$btns.forEach(it => {
        if (it.key === selected) {
          it.$elem.classList.add('selected');
        } else {
          it.$elem.classList.remove('selected');
        }
    });
  }

  private loadButtons() {
    this.$btns = [
      { key: Routes.CALENDAR, $elem: this.shadow.querySelector('.calendar')},
      { key: Routes.PATIENT, $elem: this.shadow.querySelector('.patient')},
      { key: Routes.PRESCRIPTION, $elem: this.shadow.querySelector('.prescription')}
    ]
  }
}

window.customElements.define('app-top-bar', AppTopBarComponent);



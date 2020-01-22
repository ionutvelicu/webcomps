import template from './app-work-bar.template.html';
import { ActionButton } from '../../model/action-button';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

const ATTR_ACTIONS = 'actions';
const ATTR_EVENT = 'data-event';
const WITH_ICONS = false;

class AppWorkBarComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private actions: ActionButton[];

  static get observedAttributes() {
    return [ATTR_ACTIONS];
  }

  constructor() {
      super();

      this.shadow = this.attachShadow({ mode: 'open' });
      this.shadow.appendChild(templateEl.content.cloneNode(true));
  }

  public connectedCallback() {
    if (this.hasAttribute(ATTR_ACTIONS)) {
      this.setActions();
    }
  }

  private setActions() {
    this.actions = JSON.parse(this.getAttribute(ATTR_ACTIONS));
      const $actions = this.shadowRoot.querySelector('#actions');
      this.actions.forEach(action => $actions.appendChild(this.getActionButton(action)));
  }

  private getActionButton(action: ActionButton): HTMLElement {
    const $button = document.createElement('li');
    const $lk = document.createElement('a');
    
    if (WITH_ICONS) {
      $lk.appendChild(this.getActionButtonIcon(action));
    }
    
    const $lbl = document.createElement('span');
    $lbl.innerText = action.label;
    $lk.appendChild($lbl);
    
    $lk.setAttribute(ATTR_EVENT, action.event);
    $button.appendChild($lk);

    $lk.addEventListener('click', () => this.onButtonClick.call($lk));

    return $button;
  }

  private onButtonClick() {
    const type = this.getAttribute(ATTR_EVENT);
    const event = new CustomEvent(type, {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private getActionButtonIcon(action: ActionButton): SVGSVGElement {
    const $icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const $use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    $use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#new-member');
    $icon.appendChild($use);
    return $icon;
  }

}

window.customElements.define('app-work-bar', AppWorkBarComponent);



import template from './app-calendar.template.html';
import { Routes } from '../../router.module';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

class AppCalendarComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(templateEl.content.cloneNode(true));

        shadow.querySelector('app-top-bar').setAttribute('selected', Routes.CALENDAR);
    }
}

window.customElements.define('app-calendar', AppCalendarComponent);



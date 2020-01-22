import template from './app-patient-details.template.html';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

class AppPatientDetailsComponent extends HTMLElement {

    static get observedAttributes() {
        return ['value'];
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(templateEl.content.cloneNode(true));
    }

    public connectedCallback() {
        console.log('=> main app is connected!');
    }

    public disconnectedCallback() {
        console.log('=> main app is disconnected!');
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(`=> main app attribute changed: ${name} is now ${newValue}`);
    }
}

window.customElements.define('app-patient-details', AppPatientDetailsComponent);

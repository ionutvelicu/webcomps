import template from './app-button.template.html';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

const ATTR_LOADING = 'loading';

class AppButtonComponent extends HTMLElement {
    private shadow: ShadowRoot;
    private $link: HTMLElement;
    private $loading: HTMLElement;
    private $label: HTMLElement;

    static get observedAttributes() {
        return [ATTR_LOADING];
    }

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(templateEl.content.cloneNode(true));

        this.$link = this.shadow.querySelector('a');
        this.$loading = this.$link.querySelector('.loading');
        this.$label = this.$link.querySelector('slot');
        
        if (this.hasAttribute('full')) {
            this.$link.classList.add('block');
        }
        this.$link.addEventListener('click', this.onClick);
    }

    private onClick() {
        const event = new CustomEvent('clicked', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === ATTR_LOADING) {
            this.$loading.style.display = newValue === 'true' ? 'block' : 'none';
            this.$label.style.display = newValue === 'true' ? 'none' : 'block';
        }
    }
}

window.customElements.define('app-button', AppButtonComponent);

const template = document.createElement('template');
template.innerHTML = `
    <style>
        a {
            font-family: Arial, sans-serif;
            display: inline-block;
            background: #AAA;
            color: #FFF;
            height: 100px;
            line-height: 100px;
            padding: 0 100px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            user-select: none;
            position: relative;
        }
        
        a span {
            position: absolute;
            top: 10px;
            right: 30px;
            font-size: 70px;
            line-height: 80px;
            opacity: .5;
            letter-spacing: -10px;
        }
    </style>
    <a>
        <slot></slot> <span id="count">0</span>
    </a>
`;

const COLOR = 'color';

class AppButtonComponent extends HTMLElement {
    static get observedAttributes() { return [COLOR]; }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.$button = this.shadowRoot.querySelector('a');
        this.$count = this.shadowRoot.querySelector('#count');
        this.count = 0;
    }

    connectedCallback() {
        this.setBackground(this.getAttribute(COLOR));
        this.$button.addEventListener('click', this.onClicked.bind(this));
    }

    onClicked() {
        this.count += 1;
        this.$count.innerHTML = this.count;

        const event = new CustomEvent('custom-click', {
            bubbles: true,
            composed: true,
            detail: {
                count: this.count
            }
        });
        this.dispatchEvent(event);
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === COLOR) {
            this.setBackground(newVal);
        }
    }

    setBackground(color) {
        let hex = '#AAA';
        switch (color) {
            case 'red': hex = '#eb7974'; break;
            case 'blue': hex = '#509bf5'; break;
            default: hex = '#AAA';
        }

        this.$button.style.backgroundColor = hex;
    }
}

window.customElements.define('app-button', AppButtonComponent);

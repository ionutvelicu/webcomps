import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('app-button')
export class AppButtonComponent extends LitElement {
    @property({ type: Boolean }) color: string = '';
    @property({ type: Boolean }) count: number = 0;

    static get styles() {
        return css`
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
        a.red {
          background: #eb7974;
        }
        
        a.blue {
          background: #509bf5;
        }
        `;
    }

    constructor() {
        super();
    }

    public connectedCallback() {
        super.connectedCallback();
        this.color = this.getAttribute('color') || '';
    }

    onClick() {
        this.count += 1;
        const event = new CustomEvent('custom-click', {
            bubbles: true,
            composed: true,
            detail: {
                count: this.count
            }
        });
        this.dispatchEvent(event);
    }

    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        super.attributeChangedCallback(name, oldVal, newVal);
        if (name === 'color') {
            this.color = newVal;
        }
    }

    render() {
        return html`
            <a @click=${ this.onClick.bind(this) } class="${this.color}">
                <slot></slot> <span>${this.count}</span>
            </a>
        `;
    }
}

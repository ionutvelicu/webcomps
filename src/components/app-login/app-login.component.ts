import template from './app-login.template.html';
import AuthService from '../../service/authService';

const errs: { [email: string]: string; } = {
    empty: 'Field(s) with * are mandatory.',
    wrong: 'Ihr Benutzername oder Passwort ist ungültig. Bitte versuchen Sie es erneut!'
}

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

class AppLoginComponent extends HTMLElement {
    private shadow: ShadowRoot;
    private $err: HTMLElement;
    private $btn: HTMLElement;
    
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(templateEl.content.cloneNode(true));

        this.$err = this.shadow.querySelector('#err');
        this.$btn = this.shadow.querySelector('app-button');

        this.$btn.addEventListener('clicked', this.login.bind(this));
        this.shadow.querySelectorAll('paper-input').forEach(it => it.addEventListener('keyup', this.onKeyUp.bind(this)));
    }

    public connectedCallback() {
        document.body.style.background = '#2b4154';
    }

    private onKeyUp(ev: KeyboardEvent) {
        this.hideErrMessage();
        if (ev.keyCode === 13) {
            this.login();
        }
    }

    private login(ev?: CustomEvent) {
        this.hideErrMessage();

        const name = (<HTMLInputElement>this.shadow.querySelector('#name')).value;
        const pass = (<HTMLInputElement>this.shadow.querySelector('#pass')).value;

        if (!name || !pass) {
            this.showErrMessage('empty');
            return;
        }
        
        this.$btn.setAttribute('loading', 'true');
        AuthService.login(name, pass)
            .then(resp => {
                if (resp.status !== 200) {
                    this.$btn.setAttribute('loading', 'false');
                    this.showErrMessage('wrong');
                    return;
                }
                AuthService.storeToken(resp.data);
                this.$btn.setAttribute('loading', 'false');
                location.href = '/patients';
            })
            .catch(err => {
                this.$btn.setAttribute('loading', 'false');
                this.showErrMessage('wrong');
            });
    }

    private showErrMessage(key: string) {
        this.$err.innerHTML = errs[key];
        this.$err.style.display = 'block';
    }

    private hideErrMessage() {
        this.$err.style.display = 'none';
    }
}

window.customElements.define('app-login', AppLoginComponent);

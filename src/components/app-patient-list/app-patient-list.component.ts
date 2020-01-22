import template from './app-patient-list.template.html';
import { Routes } from '../../router.module';
import { ActionButton, Actions } from '../../model/action-button';
import MemberService from '../../service/memberService';
import { Member } from '../../model/member';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

class AppPatientListComponent extends HTMLElement {
    private shadow: ShadowRoot;
    private $workBar: HTMLElement;
    private $bar: HTMLElement;
    private $list: HTMLElement;

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'closed' });
        this.shadow.appendChild(templateEl.content.cloneNode(true));

        this.shadow.querySelector('app-top-bar').setAttribute('selected', Routes.PATIENT);

        this.$list = this.shadow.querySelector('#list');

        this.$bar = this.shadow.querySelector('app-patient-list-bar');
        this.$bar.addEventListener('search', this.search.bind(this));
        
        this.$workBar = this.shadow.querySelector('app-work-bar');
        this.$workBar.addEventListener(Actions.NEW, this.newPatient.bind(this));
        this.$workBar.addEventListener(Actions.DELETE, this.deletePatient.bind(this));
        this.setActions();
    }

    public newPatient() {
        alert('New patient click');
    }

    public deletePatient() {
        alert('Delete patient click');
    }

    public connectedCallback() {
        this.populateList();
    }

    private search(ev: CustomEvent) {
        const query = ev.detail.query;
        this.populateList(query);
    }

    private populateList(query? : string) {
        MemberService.getList(query).then(resp => {
            if (resp.status !== 200) {
                return;
            }
            this.$list.innerHTML = '';
            resp.data.forEach((member: Member) => {
                this.$list.appendChild(this.getListLine(member));
            });
            this.$bar.setAttribute('data-count', resp.data.length.toString());
        })
        .catch(err => {
        });
    }

    private getListLine(member: Member): HTMLElement {
        const $node = document.createElement('div');
        $node.innerHTML = `
            <span class="check"><input type="checkbox" /></span>
            <span>${member.id}</span>
            <span>${member.lastName}</span>
            <span>${member.firstName}</span>
            <span>${member.dateOfBirth}</span>
            <span>${member.street || ''}, ${member.city || ''}</span>
            <span>${member.mobilePhone || ''}<br />${member.workPhone || ''} <br />${member.homePhone || ''}</span>
        `;
        
        $node.classList.add('line');
        return $node;
    }

    private setActions() {
        const actions: ActionButton[] = [];
        actions.push({ label: 'Neu', event: Actions.NEW });
        actions.push({ label: 'Löschen', event: Actions.DELETE });
        this.$workBar.setAttribute('actions', JSON.stringify(actions));
    }

}

window.customElements.define('app-patient-list', AppPatientListComponent);



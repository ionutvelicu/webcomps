import {Router} from '@vaadin/router';

const outlet = document.getElementById('outlet');
const router = new Router(outlet);

router.setRoutes([
    { path: '/', component: 'app-login' },
    {
        path: '/patients',
        children: [
            {path: '/', component: 'app-patient-list'},
            {path: '/new', component: 'app-patient-new'},
            {path: '/:id', component: 'app-patient-details'}
        ]
    },
    { path: '/calendar', component: 'app-calendar' },
    { path: '/prescriptions', component: 'app-prescription-list' },
]);

export enum Routes {
    PATIENT = 'patient',
    CALENDAR = 'calendar',
    PRESCRIPTION = 'prescription'
}
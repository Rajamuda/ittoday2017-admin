import { Routes, RouterModule }  from '@angular/router';

import { Registrant } from './registrant.component';
import { Participant } from './participant/participant.component';
import { AppsToday } from './appstoday/appstoday.component';
import { HackToday } from './hacktoday/hacktoday.component';
import { Seminar } from './seminar/seminar.component';
import { Single } from './viewsingle/single.component';
import { Team } from './viewteam/team.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Registrant,
    children: [
      { path: 'participant', component: Participant },
      { path: 'participant/:id', component: Single },
      { path: 'appstoday', component: AppsToday },
      { path: 'appstoday/:team', component: Team },
      { path: 'hacktoday', component: HackToday },
      { path: 'hacktoday/:team', component: Team },
      { path: 'seminar', component: Seminar }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

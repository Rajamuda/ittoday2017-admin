export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'news',
        data: {
          menu: {
            title: 'general.menu.news',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'view',
            data: {
              menu: {
                title: 'general.menu.news_child',
              }
            }
          },
          {
            path: 'publish',
            data: {
              menu: {
                title: 'general.menu.publish',
              }
            }
          }
        ]
      },
      {
        path: 'registrant',
        data: {
          menu: {
            title: 'general.menu.registrant',
            icon: 'ion-person-stalker',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'participant',
            data: {
              menu: {
                title: 'general.menu.reg_all',
              }
            }
          },
          {
            path: 'appstoday',
            data: {
              menu: {
                title: 'general.menu.reg_apps',
              }
            }
          },
          {
            path: 'hacktoday',
            data: {
              menu: {
                title: 'general.menu.reg_hack',
              }
            }
          },
          {
            path: 'seminar',
            data: {
              menu: {
                title: 'general.menu.reg_seminar',
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Main Website',
            url: 'https://ittoday.web.id',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];

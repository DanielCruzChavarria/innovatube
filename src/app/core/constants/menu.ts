import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: '',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Búsqueda', route: '/dashboard/search' },
            { label: 'Favoritos', route: '/dashboard/favorites' , needAuth: true},
          ],
        },
      ],
    },

    {
      group: 'Config',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
      ],
    },
  ];
}

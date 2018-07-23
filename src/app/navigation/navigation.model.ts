import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface {
  public model: any[];

  constructor() {
    this.model = [
      {
        'id': 'master',
        'title': 'Master Data',
        'type': 'group',
        'children': [
          {
            'id': 'user',
            'title': 'User',
            'type': 'item',
            'icon': 'people',
            'url': '/user'
          },
          {
            'id': 'role',
            'title': 'Role',
            'type': 'item',
            'icon': 'people',
            'url': '/role'
          }
        ]
      }
    ];
  }
}

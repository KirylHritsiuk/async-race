import { Components } from '../templates/templateHeader';
import { PageId } from '../../app/app';

const linkData = [
  {
    id: PageId.Garage,
    text: 'Garage',
    className: 'link',
  },
  {
    id: PageId.Winners,
    text: 'Winners',
    className: 'link',
  },
];

export class Header extends Components {
  constructor(tagName:string, className: string) {
    super(tagName, className);
    linkData.forEach((data) => {
      const headerLinkHTML = document.createElement('a');
      headerLinkHTML.href = `#${data.id}`;
      headerLinkHTML.innerHTML = data.text;
      headerLinkHTML.className = data.className;
      this.container.append(headerLinkHTML);
    });
  }
}

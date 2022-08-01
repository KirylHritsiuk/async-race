// import { Core } from "../components/template";

// export class Header extends Core{
//     static TextObject = {
//         Class: 'header',
//         ClassLink: 'link',
//         GarageLinkText: 'Garage',
//         GarageLinkPath: 'garage',
//         WinnerLinkText: 'Winners',
//         WinnerLinkPath: 'winners'
//     }
//     constructor(id: string) {
//         super(id);
//     }
//     private createHeaderLink(text: string, path: string) {
//         const headerLink: HTMLAnchorElement = document.createElement('a');
//         headerLink.textContent = text;
//         headerLink.href = path;
//         headerLink.className = Header.TextObject.ClassLink;
//         return headerLink;
//     }
//     render (){
//         const garageLink = this.createHeaderLink(Header.TextObject.GarageLinkText, Header.TextObject.GarageLinkPath);
//         const winnerLink = this.createHeaderLink(Header.TextObject.WinnerLinkText, Header.TextObject.WinnerLinkPath);
//         this.container.append(garageLink);
//         this.container.append(winnerLink);
//         return this.container
//     }
// }
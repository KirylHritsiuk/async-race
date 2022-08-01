import { App } from './app/app';
import './styles/style.css'

const app = new App();
(async function() {
    await app.run();
})()
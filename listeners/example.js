/*!
 * @plugin bastion-free-games-plugin
 * @author Christoph Szabo (Vast)
 * @license MIT
 */

"use strict";

const tesseract = require("@bastion/tesseract");
const rss = `https://steamcommunity.com/groups/freegamesfinders/rss/`;

class ExampleListenerPlugin extends tesseract.Listener {
    constructor() {
        // This will listen to the `message` event - https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
        // Refer https://bastion.gitbook.io/docs/plugins#supported-events for all supported events.
        super("message");
    }
    
    fetch(rss)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        const items = data.querySelectorAll("item");
        let html = ``;
        items.forEach(el => {
            html += `
                <article>
                    <img src="${el.querySelector("link").innerHTML}/image/large.png" alt="">
                <h2>
                <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
                ${el.querySelector("title").innerHTML}
                </a>
            </h2>
            </article>
        `;
        });
        document.body.insertAdjacentHTML("beforeend", html);
    });
    
    exec = async (message) => {
        console.log(message);
    }
}

module.exports = ExampleListenerPlugin;

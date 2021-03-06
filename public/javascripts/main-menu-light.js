﻿// const MotherOfReports = "http://127.0.0.1:3001/";
const MotherOfReports = "http://95.158.44.52:3001/";

const menuItemsList = [
    {
        tag: "div",
        classList: ["ecoMenu", "sticky"],
        properties: { id: "topmenu" },
        siblings: [
            {
                tag: "input",
                properties: {
                    id: "mobile__dropdown",
                    type: "checkbox"
                }
            },
            {
                tag: "label",
                classList: ["topmenu__label"],
                properties: {
                    id: "mobile_label",
                    for: "mobile__dropdown",
                    onclick: ""
                }
            },
            {
                tag: "ul",
                classList: ["topmenu__block", "sticky"],
                siblings: [
                    {
                        tag: "li", classList: ["topmenu__item"], siblings: [{
                            tag: "a", classList: ["topmenu__item__ref"], properties: { href: MotherOfReports }, siblings: [{ text: "Главная" }]
                        }]

                    },
                    {
                        tag: "li", classList: ["topmenu__item"], siblings: [{
                            tag: "a", classList: ["topmenu__item__ref"], properties: { href: MotherOfReports + "1" }, siblings: [{ text: "Котельная 1" }]
                        }]
                    },
                    {
                        tag: "li", classList: ["topmenu__item"], siblings: [{
                            tag: "a", classList: ["topmenu__item__ref"], properties: { href: MotherOfReports + "2" }, siblings: [{ text: "Котельная 2" }]
                        }]
                    },
                    {
                        tag: "li", classList: ["topmenu__item"], siblings: [{
                            tag: "a", classList: ["topmenu__item__ref"], properties: { href: MotherOfReports + "3" }, siblings: [{ text: "Котельная 3" }]
                        }]
                    }, {
                        tag: "li", classList: ["topmenu__item"], siblings: [{
                            tag: "a", classList: ["topmenu__item__ref"], properties: { href: MotherOfReports + "reports/day" }, siblings: [{ text: "Суточный отчет" }]
                        }]
                    },
                    {
                        tag: "li", classList: ["topmenu__item"], siblings: [{
                            tag: "a", classList: ["topmenu__item__ref"], properties: { href: MotherOfReports + "reports/month" }, siblings: [{ text: "Месячный отчет" }]
                        }]

                    },
                ]
            }
        ]
    }

]
    ;

function getNewHtmlNode(newNode) {
    let node;
    if (newNode.text) {
        node = document.createTextNode(newNode.text);
    } else {
        node = document.createElement(newNode.tag);
        if (newNode.classList) {
            newNode.classList.forEach(nextClass => {
                node.classList.add(nextClass);
            });

        }
        if (newNode.properties) {
            const props = Object.entries(newNode.properties);
            // console.log("### props  " , props)
            Object.entries(newNode.properties).forEach(prop => {
                node.setAttribute(prop[0],prop[1]);
            });
        }

        if (newNode.siblings) newNode.siblings.forEach(el => {
            node.appendChild(getNewHtmlNode(el));
        })
    }
    return node;
}

function addAllNodes(nodesList) {
    nodesList.forEach(element => {
        document.body.insertBefore(getNewHtmlNode(element), document.body.firstChild);
    })
}
window.addEventListener('load', () => {

    console.log("menu!!");
    try {
        addAllNodes(menuItemsList);

    } catch (error) {
        console.log(error.message);
    }
    ;
})

import "./customGroup.scss"

export default class CustomGroup extends HTMLElement {
    constructor() {
        super();
        this.addEvents();
    }

    private get parent() {
        return this.parentElement
    }

    private connectedCallback(): void {
        this.innerHTML = `<div>${this.innerHTML}</div>`
    }

    private addEvents(): void {
        this.parent.addEventListener("scroll", (): void => {
            const parentNode = this.parent.parentElement;
            const child = this.firstChild as HTMLElement;
            const paddingL = getComputedStyle(child).paddingLeft;
            const paddingR = getComputedStyle(child).paddingRight;
            if(this.getBoundingClientRect().top < parentNode.offsetTop && !this.classList.contains("fix")){
                this.classList.add("fix");
                child.style.width = `calc(100% - ${(this.parent.offsetWidth - this.parent.clientWidth)}px - (${paddingL} + ${paddingR})`;
            }else if(this.getBoundingClientRect().top >= parentNode.offsetTop && this.classList.contains("fix")){
                this.classList.remove("fix");
                child.style.width = "auto";
            }
        })
    }
}
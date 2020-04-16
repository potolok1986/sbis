import SimpleList from "../simpleList/SimpleList";
import "./mySimpleList.scss"
import "../style/flags/flags.scss"

const options = {
    url: "/data/countries.json",
    groupElement: "custom-group",
    rowElement: "custom-row",
    //data: ["1","2","3"] // если нужно передать просто данные в список
};

export default class MySimpleList extends SimpleList {
    constructor() {
        super(options);
    }

    parseResponse(data): any[] {
        return Object.values(data);
    }

    sort(data): [] {
        return data.sort()
    }

    generateHtmlTag(tagName: string, value: any, index: number, array: [], data: any): string {
        if (tagName) {
            if (tagName === options.rowElement) {
                let id = this.findId(value, data);
                return `<${tagName}><div><b>${id}</b> ${value} </div><i class="flagIco s21 flag_${id}"></i></${tagName}>`
            } else {
                return `<${tagName}>${value}</${tagName}>`
            }
        }
        return value
    }

    private findId(value: string, data: any): number {
        let id = 0;
        for (let i in data) {
            if (data[i] === value) {
                id = +i;
                break;
            }
        }
        return id;
    }
}
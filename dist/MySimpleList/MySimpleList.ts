import SimpleList from "../simpleList/SimpleList";
import "./mySimpleList.scss"
import "../style/flags/flags.scss"

const options = {
    url: "/data/countries.json", // для получения данных из вне
    groupElement: "custom-group", // елемент для группировки, если его не указывать то выведется просто список
    rowElement: "custom-row", // елемент для строки, если его не указывать то будет просто div обертка
    //data: ["1","2","3"] // если нужно передать просто данные в список
};

export default class MySimpleList extends SimpleList {
    constructor() {
        super(options);
    }

    private dataKeys: {} = {};

    parseResponse(data): any[] {
        // генерирование объекта для внутреннего использования и рендеринге
        for (let i in data) {
            this.dataKeys[data[i]] = i;
        }
        // возврат отсортированного объекта так как в список передаются данные с сервера, их необходимо преобразовать в массив
        return Object.values(data);
    }

    sort(data): [] {
        // сортировка по алфавиту, если убрать то выведется список как пришел с сервера
        return data.sort()
    }

    generateHtmlTag(tagName: string, value: any, index: number, array: [], data: any): string {
        // переопределенние дефолтного рендеринга, для рендера с флагами, если его убрать от выведется просто список стран
        if (tagName) {
            if (tagName === options.rowElement) {
                let id = this.findId(value);
                return `<${tagName}><div><b>${id}</b> ${value} </div><i class="flagIco s21 flag_${id}"></i></${tagName}>`
            } else {
                return `<${tagName}>${value}</${tagName}>`
            }
        }
        return value
    }

    private findId(value: string): number {
        return this.dataKeys[value]
    }
}
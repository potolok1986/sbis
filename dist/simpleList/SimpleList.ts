export default class SimpleList extends HTMLElement {
    constructor(options) {
        super();
        this.generateOptions(options);
    }

    private async connectedCallback() {
        let dataToRender = this.data;
        if (this.simpleSelectOptions.url) {
            this.data = await this.getData();
            dataToRender = this.parseResponse(this.data)
        }
        this.render(dataToRender);
    };

    private simpleSelectOptions: {
        url: string,
        groupElement: string,
        rowElement: string,
    };

    private data: any[];

    private generateOptions(options): void {
        this.data = options.data || [];
        delete options.data;
        this.simpleSelectOptions = {
            url: "",
            groupElement: "",
            rowElement: "div",
            ...options,
        };
    }

    private async getData() {
        let {url} = this.simpleSelectOptions;
        if (!url) {
            return []
        }
        this.beforeLoading();
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.ok){
            return await response.json()
        }else {
            this.errorCallback(response);
            return [];
        }
    }

    protected parseResponse(data): any[] {
        return data
    };

    protected beforeLoading(): void {
        this.innerHTML = "...Loading";
    }

    protected errorCallback(response): void {
        this.innerHTML = "Loading error";
    };

    private async render(data: any[]) {
        if (typeof data !== "object" || !data.hasOwnProperty("length")) {
            throw new Error("data must by array")
        }
        const sortData = this.sort(data);
        this.innerHTML = `<div>${this.generateList(sortData)}</div>`;
    }

    protected sort(data): [] {
        return data
    }

    protected generateList(sortData: []): string {
        let htmlStr = "";
        let groupChar = "";
        const {groupElement, rowElement} = this.simpleSelectOptions;

        for (let i = 0; i < sortData.length; i++) {
            let firstChar = (sortData[i] as string).charAt(0);
            if (!groupChar && groupElement) {
                groupChar = firstChar;
                htmlStr += this.generateHtmlTag(groupElement, groupChar, i, sortData, this.data)
            }
            if (sortData[i + 1] && firstChar !== groupChar) {
                groupChar = "";
            }
            htmlStr += this.generateHtmlTag(rowElement, sortData[i], i, sortData, this.data)
        }

        return htmlStr
    }

    protected generateHtmlTag(tagName: string, value: any, index: number, array: [], data: any): string {
        if (tagName) {
            return `<${tagName}>${value}</${tagName}>`
        }
        return value
    }
}
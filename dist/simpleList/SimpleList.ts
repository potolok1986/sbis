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
        this.innerHTML = "...Loading";
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            this.errorCallback(response)
        }
    }

    protected parseResponse(data): any[] {
        return data
    };

    protected errorCallback(response): void {
        this.innerHTML = "Loading error";
    };

    private async render(data: any[]) {
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
            if (!groupChar && groupElement) {
                groupChar = sortData[i][0];
                htmlStr += this.generateHtmlTag(groupElement, groupChar, i, sortData, this.data)
            }
            if (sortData[i + 1] && sortData[i + 1][0] !== groupChar) {
                groupChar = "";
            }
            htmlStr += this.generateHtmlTag(rowElement, sortData[i], i, sortData, this.data)
        }

        return htmlStr
    }

    protected generateHtmlTag(tagName: string, value: any, index: number, array: [], data:any): string {
        if (tagName) {
            return `<${tagName}>${value}</${tagName}>`
        }
        return value
    }
}
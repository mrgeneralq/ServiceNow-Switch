export class Instance {
    constructor(json){
        this.instanceGroup = json.instanceGroup;
        this.prefix = json.prefix;
        this.label = json.label;
        this.backgroundColor = json.backgroundColor;
        this.textColor = json.textColor;
    }
}
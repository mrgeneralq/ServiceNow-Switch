class Instance {
    constructor(json) {

        if (!json) return;
        this.instanceGroup = json.instanceGroup;
        this.prefix = json.prefix;
        this.label = json.label;
        this.backgroundColor = json.backgroundColor;
        this.textColor = json.textColor;
        this.order = json.order;
    }
}
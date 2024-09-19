class Action{
    constructor (type, description, amount){
        this.id=Math.floor(Math.random()*1001);
        this.type=type;
        this.description=description;
        this.amount=amount;
    }
}
export default Action;
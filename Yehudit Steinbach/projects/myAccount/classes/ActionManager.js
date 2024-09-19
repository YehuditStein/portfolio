import Action from "./Action.js"

class ActionManager{
    constructor(){
        this.actions=[];
        this.balance=0;
    }

    

    addAction(action){
        this.actions.push(action);
        this.calcaBalance();
    }

    deleteAction(id){
        this.actions=this.actions.filter((action)=> action.id !=id);
        this.calcaBalance();
    }

    updateAction(id, newAmount){
        let indexToUpdate=this.actions.findIndex((action)=> action.id ==id)
        this.actions[indexToUpdate].amount=newAmount;
        this.calcaBalance();
    }

    calcaBalance(){
        this.balance=0;
        for(let i=0; i<this.actions.length; i++){
            if(this.actions[i].type=="income")
                this.balance+=this.actions[i].amount;
            else 
                this.balance-=this.actions[i].amount;
        }
    }


}
export default ActionManager;
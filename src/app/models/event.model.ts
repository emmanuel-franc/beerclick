export class Event {
  id:number;
  name:string;
  message:string;
  messageEndPart:string;
  action: {
    loss:number,
    lossType:string,
    limit:number
  };
  
  constructor(id, name, message, messageEndPart, loss, lossType, limit) {
    this.id = id;
    this.name = name;
    this.message = message;
    this.messageEndPart = messageEndPart;
    this.action = {
      loss: loss,
      lossType: lossType,
      limit: limit
    };
  }
}

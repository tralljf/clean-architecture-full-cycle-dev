import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: any;

  constructor(eventData: string) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}

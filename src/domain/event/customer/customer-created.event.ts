import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: any;

  constructor(eventData: string) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}

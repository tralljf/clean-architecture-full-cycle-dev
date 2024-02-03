import EventHandlerInterface from "../../@shared/event.handler.interface";
import CustomerAddressChangeEvent from "../customer-address-change.event";

export default class SendConsoleLogEvent2Handler
  implements EventHandlerInterface<CustomerAddressChangeEvent>
{
  handle(event: CustomerAddressChangeEvent): void {
    console.log("Endereço do cliente: {id}, {nome} alterado para: {endereco}.");
  }
}

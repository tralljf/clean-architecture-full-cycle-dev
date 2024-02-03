import EventDispatcher from "../../../../src/domain/event/@shared/event.dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../../../src/domain/event/product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../../../src/domain/event/product/product-created.event";
import SendConsoleLogEvent1Handler from "../../../../src/domain/event/customer/handler/send-console-log-event-1.handler";
import SendConsoleLogEvent2Handler from "../../../../src/domain/event/customer/handler/send-console-log-event-2.handler";
import CustomerCreatedEvent from "../../../../src/domain/event/customer/customer-created.event";

describe("EventDispatcherInterface test", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers()["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers()).toEqual({
      ProductCreatedEvent: [eventHandler],
    });
    expect(
      eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length
    ).toBe(1);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers()["ProductCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length
    ).toEqual(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers()).toEqual({});
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "ProductCreatedEvent",
      data: {
        productId: "1",
        name: "Product 1",
        description: "Product 1 description",
        price: 100,
      },
    } as any);

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toBeCalledWith(productCreatedEvent);
  });

  it("should notify when customer as created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogEvent1Handler();
    const eventHandler2 = new SendConsoleLogEvent2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "CustomerCreatedEvent",
      data: {
        customerId: "1",
        name: "Customer 1",
        email: "",
      },
    } as any);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toBeCalledWith(customerCreatedEvent);
    expect(spyEventHandler2).toBeCalledWith(customerCreatedEvent);
  });
});

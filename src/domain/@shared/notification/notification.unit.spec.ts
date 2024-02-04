import Notification from "./notification";

describe("Notification unit test", () => {
  it("should create erros", async () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);
    expect(notification.message("customer")).toBe("customer: error message");

    const other_error = {
      message: "error message 2",
      context: "customer",
    };

    notification.addError(other_error);
    expect(notification.message("customer")).toBe(
      "customer: error message,customer: error message 2"
    );
  });

  it("should check if notification has error", async () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);
    expect(notification.hasError()).toBeTruthy();
  });

  it("should get errors", async () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);
    expect(notification.getErrors()).toEqual([error]);
  });

  it("should error is empty", async () => {
    const notification = new Notification();
    expect(notification.hasError()).toBeFalsy();
  });
});

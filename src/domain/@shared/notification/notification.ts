export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  message(context: string) {
    return this.errors
      .filter((error) => error.context === context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(",");
  }

  getErrors() {
    return this.errors;
  }

  hasError() {
    return this.errors.length > 0;
  }
}

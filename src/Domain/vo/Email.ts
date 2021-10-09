export class Email {
  constructor(private email: string) {}

  private validate(): boolean {
    //isEmail
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(!regexp.test(this.email)) {
        //Please enter a valid email address
        return false;
    }

    return true;
  }
}

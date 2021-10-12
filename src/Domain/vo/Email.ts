import { ObjectDefinition } from "../../Infrastructure/repositories/FsRepository";

const PLUS_ONLY = /\+.*$/;
const PLUS_AND_DOT = /\.|\+.*$/g;

const normalizeableProviders: ObjectDefinition = {
  'gmail.com': {
    'cut': PLUS_AND_DOT
  },
  'googlemail.com': {
    'cut': PLUS_AND_DOT,
    'aliasOf': 'gmail.com'
  },
  'hotmail.com': {
    'cut': PLUS_ONLY
  },
  'live.com': {
    'cut': PLUS_AND_DOT
  },
  'outlook.com': {
    'cut': PLUS_ONLY
  }
};

export class Email {
  constructor(private email: string) {
    this.validate();
  }

  public get value(): string {
    return this.email;
  }

  private validate(): void {
    this.email = this.email.trim();
    this.email = this.normalizeEmail(this.email);
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!regexp.test(this.email)) {
      throw new Error('Please enter a valid email');
    }
  }
 

  private normalizeEmail(email: string): string {
    this.email = email.toLowerCase();
    const emailParts = this.email.split('@');

    if (emailParts.length !== 2) {
      return email;
    }

    let [username, domain] = emailParts;    

    if (normalizeableProviders.hasOwnProperty(domain)) {
      if (normalizeableProviders[domain].hasOwnProperty('cut')) {
        username = username.replace(normalizeableProviders[domain].cut, '');
      }
      
      if (normalizeableProviders[domain].hasOwnProperty('aliasOf')) {
        domain = normalizeableProviders[domain].aliasOf;
      }
    }

    return `${username}@${domain}`;
  }
}

export interface Filter {
  getFilterDict(): Record<string, any>;
}

export abstract class AbstractFilter implements Filter {
  protected dict: Record<string, any> = {};

  abstract getValidKeys(): string[];
  protected abstract getCastTable(): Record<string, any>;
  
  constructor(dict: Record<string, any> = {}) {
    this.populateFromDict(dict);
  }

  isKeyValid(key: string): boolean {
    return this.getValidKeys().includes(key);
  }

  populateFromDict(dict: Record<string, any>): void {
    Object.entries(dict).forEach((entry) => {
      if (this.isKeyValid(entry[0])) {
        this.setParameter(entry[0], entry[1]);
      }
    });
  }
  
  setParameter(key: string, value: any) {
    if (!this.isKeyValid) {
      throw new Error(`Invalid Filter ${key}, please use one of: ${this.getValidKeys()}.`);
    }

    this.dict[key] = this.getCastTable()[key](value);
  }

  getFilterDict(): Record<string, any> {
    return this.dict;
  }
}

export let ConvertUtils = {
  toInt: (value: string): number => Number(value),
  toDate: (value: string): Date => new Date(value),
  identity: (value: any): any => value,
  toNumberArray: (value: string[]): number[] => value.map(v => Number(v)),
  toBoolean: (value: string): boolean => value.toString().toLowerCase() === "true"
}
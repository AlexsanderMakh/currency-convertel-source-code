declare module "@everapi/currencyapi-js" {
  export default class CurrencyAPI {
    constructor(apiKey: string);
    latest(params: {
      base_currency: string;
      currencies: string;
    }): Promise<{ data: { [key: string]: number } }>;
  }
}

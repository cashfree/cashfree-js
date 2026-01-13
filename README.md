# Cashfree.js ES Module

## Installation

Use `npm` to install the Cashfree.js module:

```sh
npm install @cashfreepayments/cashfree-js
```

## Usage

### `load`

This function returns a `Promise` that resolves with a newly created `Cashfree` object once Cashfree.js has loaded. 
If you call `load` in a server environment it will resolve to `null`.

```js
import {load} from '@cashfreepayments/cashfree-js';

const cashfree = await load({
	mode: "sandbox" //or production
});
```

For more information on how to use Cashfree.js, please refer to the [Cashfree.js API reference](https://www.cashfree.com/docs/payments/online/element/sdks) or learn to [accept a payment](https://www.cashfree.com/docs/api-reference/payments/overview) with Cashfree.

If you have deployed a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP), make sure to [include Cashfree.js in your directives].
-   `connect-src`, `https://api.cashfree.com` 
-   `frame-src`, `https://sdk.cashfree.com`, `https://api.cashfree.com`, `https://sandbox.cashfree.com` `https://payments.cashfree.com`, `https://payments-test.cashfree.com`
-   `script-src`, `https://sdk.cashfree.com`

# ChallengeKit TS

This is the challenge starter kit for TypeScript with the compiler setup for the Node.js runtime. It provides a recommended `eslint` config — `eslint-config-google` which uses Google's style guide.

This project has been prepared using yarn. It is recommended, but not necessary if you wish to continue using `npm`.

To use yarn, install it with `npm i -g yarn`.

## Scripts

```
  $ yarn build — TypeScript Compile to dist folder
  $ yarn start — Run compiled code in dist folder
  $ yarn test — Run the Jest test suite, defaults to all *.test.ts files
  $ yarn watch — Run te Jest test suite in watch mode
```

## VSCode Workspace

1. Format on save is enabled
2. Prettier is set as the default auto-formatter

# Grocery Store — Coding Challenge

A grocery store needs to prepare updates for two systems every night at 12:00 AM. The systems consume data in their own proprietary formats, one is already generated and needs to be updated and the other needs to be manually generated.  The first system is used for stock ordering. It needs to know how many products have been consumed throughout the day so that it can generate orders for the store. This data is formatted as XML. The second system is used for promotions to customers. It needs to know what products each customer purchased. It will only receive information about customers who used their customer loyalty card when ordering. This data is formatted as JSON.

The orders for the day are available in a CSV. Each order contains the order ID, department, product & customer ID (if available).

## Data Samples (files present in data folder of the repository)
 - `Customers.json`
 - `Orders.csv` 
 - `Stock.xml`

## TypeScript starter kit
If you're doing this challenge in TypeScript, please consider taking advantage of the starting kit available [here](https://github.com/coles-enterprise-services/challengekit-ts). This kit includes TypeScript, Jest, eslint & prettier already setup & ready to go.

## Challenge

### Part 1: Customer Order Grouping

For each customer that made a purchase on the day, group any orders together by their customer ID only including the products purchased & the quantity of each product purchased.

Do not include any orders that did not include a customer ID.

Write this JSON output to a file named `summaries/GroupedOrders.json`.

Treat the `Customers.json` file like a database — not all customers in the `Customers.json` file would have made a purchase that day, and when reading from the file consider memory efficient approaches.

### Part 2: Updating Stock

The Stock.xml file includes the quantity of each item purchased that day & it is incorrect until updated from today's orders. For each order, update the corresponding quantities in the `Stock.xml` file.

Remove any duplicates & add products if they do not exist.

The updated Stock should be output to `summaries/Stock.xml`.

## Considerations

1. Be memory efficient — although this challenge only has ~3000 total records, in the real world databases can contain trillions of records.

2. Treat the filesystem like a database — consider IOPS & the impact of many write operations at once.

3. Use asynchronous `fs` methods if you're doing the challenge in TypeScript.

4. Consider scalable coding — in an interview you may be asked to expand on the current challenge with new components or data.

5. Keep it DRY — don't repeat yourself. Use tests, avoid copying logic.

Have fun. Even if you don't get to the next round, you're learning new things.

## Submission

Commit regularly, although your first attempts may not be ideal it's good to show progression & may assist in telling a story about how you got to the final product.

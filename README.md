# YLLP - Yksinkertainen linkinlyhennyspalvelu 
Simple link shortening service created with Next.JS, TypeScript and MongoDB.

[Running demo](https://yllp.vercel.app/)

[API documentation](pages/api/v1/apiDocumentation.md)

## Features
- User can input an URL to be shortened
  - Shortened version of the URL will be returned to user
- Shortened URL redirects user to the original URL
- User can see analytics of the shortened URL
  - Number of link visits per day

## How to run

### Requirements

Node and NPM have to be installed.
Tested on Node v16.14.0 and NPM v8.3.1

### Environment variables
Copy .env.example file and rename it to .env and set environment variables accordingly

```
MONGO_URL=<full MongoDB connection URL>
```

### Terminal commands

```javascript
// Clone the repository
git clone git@github.com:aleksivaisanen/yllp.git
// Move to the project folder
cd yllp
// Install dependencies
npm install
// Run development environment
npm run dev
```
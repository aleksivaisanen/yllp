# How to use the API

## Endpoint: api/v1/shorten

API for getting shortened URLs.

Request type: **POST**  

Body: 
```
{
  url: <original URL>
}
```

Returns
```
{
    "originalUrl": <original URL>,
    "slug": <shortened URL slug>
}
```

cURL example

```
curl --location --request POST 'localhost:3000/api/v1/shorten' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://www.google.fi"
}'
```

## Endpoint: api/v1/analytics/[slug]

API for getting analytics data based on shortened URL slug.

Request type: **GET**  

Query parameters
```
startDate: <date in YYYY-MM-DD format>,
endDate: <date in YYYY-MM-DD format>,
```

Returns
```
{
    "originalUrl": <original URL>,
    "analytics": [
        {
            "_id": <date>,
            "visits": <number of visit per date>
        },
        ...
    ]
}
```

cURL example

```
curl --location --request GET 'localhost:3000/api/v1/analytics/07lzxfcn?startDate=2022-05-27&endDate=2022-05-28'
```

## Endpoint: api/v1/url/[slug]

API for getting shortened URL data and creating Analytics document for that URL.

Request type: **GET**  

Query parameters
```
// Set redirect to true, if API is used to actually redirect user to original url
// When redirect=true, a new Analytics document is created before sending response

redirect: <optional boolean value>
```

Returns
```
{
    "originalUrl": "https://www.google.fi",
    "slug": "07lzxfcn"
}
```

cURL example

```
curl --location --request GET 'localhost:3000/api/v1/url/07lzxfcn?redirect=true'
```
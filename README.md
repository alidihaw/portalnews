# Portalnews

## Hosting
[https://portalnews-86a4c.web.app](https://portalnews-86a4c.web.app "https://portalnews-86a4c.web.app")

## API Integration
API from Article: [https://developer.nytimes.com/docs/articlesearch-product/1/overview](https://developer.nytimes.com/docs/articlesearch-product/1/overview "https://developer.nytimes.com/docs/articlesearch-product/1/overview")
API from Stories: [https://developer.nytimes.com/docs/top-stories-product/1/overview](https://developer.nytimes.com/docs/top-stories-product/1/overview "https://developer.nytimes.com/docs/top-stories-product/1/overview")
Wrapping with Firebase Functions on folder functions because CORS on API NYTimes

POST:
[https://us-central1-portalnews-86a4c.cloudfunctions.net/getArticles](https://us-central1-portalnews-86a4c.cloudfunctions.net/getArticles "https://us-central1-portalnews-86a4c.cloudfunctions.net/getArticles")

POST:
[https://us-central1-portalnews-86a4c.cloudfunctions.net/getStories](https://us-central1-portalnews-86a4c.cloudfunctions.net/getStories "https://us-central1-portalnews-86a4c.cloudfunctions.net/getStories")

## Install Dependencies
`npm install --legacy-peer-deps`
(Have different version on main v18 and angular-three with v15 so need --legacy-peer-deps)

## Running on Localhost
`npm run start`

## KeyPoint
Key points:
- Rest API Implementation  ✅
- Implementation of Async, Promise ✅
- Management Display such as using tailwind ✅
- Routing Implementation ✅
- Management Data (State) (Ngxs) ✅
- Implementation of Animation Components such as three js ✅
- GIT Implementation ✅

Add Some Enhancement
- PWA ✅
- Firebase Functions ✅
- Firebase Hosting ✅
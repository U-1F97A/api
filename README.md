# api
API側、Node.js、Express、Glitch上で動作予定

## endpointとか
### /book
`/book`に`application/json`
```json
{
  "booktitle": "{{.本の名前}}"
}
```
をPOSTすると、
```json
{
    "title": "エンジニアの知的生産術",
    "pageCount": 253,
    "picture": "http://books.google.com/books/content?id=qFOHugEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
}
```
みたいなのが返される

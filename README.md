# How to Run

```bash
# Build the Image

docker build -t inventory:latest .

# Run the Image
docker run --rm --name inventory --env-file .env -v ${pwd}/credentials.json:/app/credentials.json  -p 8080:8080 inventory:latest

```

# Requirements

1. Have an Account with Azure

- It needs to be able to use CosmosDB

2. Have a Firebase Project

- Generate and Download a new Private Key and call it "credentials.json"

# Properties

- Each item has these properties, you can use/query them
  - For the API docs, you can add/remove these from the body
- Environment Variables
  - These are the environment variables you need to set (with example values)
```env
LOG_LEVEL=debug                                          # Defines the log level
PORT=8080                                                # Defines the port to run on
FIREBASE_SERVICE_ACCOUNT=credentials.json                # the firebase service account (needs to be named credentials.json) 
COSMOSDB_PRIMARY_KEY=sdasdsaadadhisaduhdahdhdh==         # The primary key for your cosmos database
COSMOSDB_ENDPOINT=https://xxxx.documents.azure.com:xxx/  # the url/endpoint of your db
# These should match the info for your terraform/main.tf
COSMOSDB_DATABASE=stuff                                  # the database's name
COSMOSDB_CONTAINER=products                              # the container's name
RESOURCE_GROUP=microservice                              # the resource groups name 
```   

```json
{
  "item" {
      "id"          : "string",
      "name"        : "string",
      "price"       : "number",       
      "quantity"    : "number",    
      "description" : "string", 
      "tags"        : "array",         
      "imgURL"      : "string",      
  }
}
```

# API Docs

## Note

- name, price and quantity are always needed in a body for creation

---

### Get All Items

- Returns an Array of all the Items inside the .items path

- Calling it

```js
fetch(API_URL / v1 / items, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

- Sample Output:

```json
{
  "status": "ok",
  "items": [
    {
      "id": "5b8e7968-b4d2-4562-a818-7f88732d0b99",
      "name": "water",
      "price": 12,
      "quantity": 15,
      "description": "item default desc",
      "tags": ["item"],
      "imgURL": "https://dummyimage.com/640x4:3/"
    },
    {
      "id": "24788d6e-6dcc-455b-a81c-b1e698204b16",
      "name": "bread",
      "price": 12.65,
      "quantity": 2,
      "description": "item default desc",
      "tags": ["item"],
      "imgURL": "https://dummyimage.com/640x4:3/"
    }
  ]
}
```

---

### Get Single Item

- Returns a single item matching the ID in the .item path
- Calling It

```js
fetch([API_URL] / v1 / item / [ITEM_ID], {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

- Sample Output

```json
{
  "status": "ok",
  "item": {
    "id": "24788d6e-6dcc-455b-a81c-b1e698204b16",
    "name": "bread",
    "price": 12.65,
    "quantity": 2,
    "description": "item default desc",
    "tags": ["item"],
    "imgURL": "https://dummyimage.com/640x4:3/"
  }
}
```

---

### Creating an Item

- Creates a single item into the DB
- Calling it

```js
const body = JSON.parse({ name: 'water', price: 12, quantity: 15 });
fetch(`[API_URL]/v1/item`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});
```

- Sample Output

```json
{
  "status": "ok",
  "id": "5b8e7968-b4d2-4562-a818-7f88732d0b99"
}
```

---

### Updating an Item

- Updates a single item on the DB
- Calling it

```js
const body = JSON.parse({
  name: 'bread',
  price: 12.65,
  quantity: 15,
  id: '24788d6e-6dcc-455b-a81c-b1e698204b16',
});

fetch(`[API_URL]/v1/item/[id]`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});
```

- Sample Output

```json
{
  "status": "ok",
  "id": "24788d6e-6dcc-455b-a81c-b1e698204b16"
}
```

---

### Deleting an Item

- Deletes the Item from the DB
- Calling it

```js
fetch(`[API_URL]/v1/item/[id]`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

- Sample Output

```json
{
  "status": "ok"
}
```

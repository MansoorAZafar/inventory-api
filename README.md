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

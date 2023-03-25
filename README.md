# Project Documentation
This project is a Node.js application that provides two APIs:
* `/api/v1/sirinfos/:sir`: returns information about a French company based on its SIREN or SIRET number.
* `/api/v1/conversion`: converts a value from one currency to another.

<ul>
  <li><a href="#project-documentation">Project Documentation</a>
    <ul>
      <li><a href="#getting-started">Getting Started</a></li>
      <li><a href="#apis">APIs</a>
        <ul>
          <li><a href="#api-v1sirinfossir">/api/v1/sirinfos/:sir</a></li>
          <li><a href="#api-v1conversion">/api/v1/conversion</a></li>
        </ul>
      </li>
      <li><a href="#license">License</a></li>
    </ul>
  </li>
</ul>

## Getting Started
To get started with this project, follow the steps below:

Clone the repository:
```shell
$ git clone https://github.com/FreeLance-Toi/Freelance-Flow-API
```

Install the dependencies:
```shell
$ npm install
```

Create a `.env` file at the root of the project and add the following variables:
```dotenv
PORT=3000
BIND_ADDRESS=0.0.0.0
SSL=FALSE
KEY_FILE=server.key
CERT_FILE=server.crt
```

Start the server:
```shell
$ npm start
```

## APIs
### /api/v1/sirinfos/:sir
This API returns information about a French company based on its SIREN or SIRET number.

#### Request
```http request
GET /api/v1/sirinfos/:sir
```
* `:sir` (required): the SIREN or SIRET number of the company.

#### Response
##### Success
```
Status: 200 OK
```
```json
{
    "facility_infos": {
        "siret": "12345678901234",
        "firstNames": [
        "John",
        "Doe"
        ],
        "lastName": "Doe",
        "companyName": "ACME Inc.",
        "address": {
            "number": "123",
            "address": "Main Street",
            "complement": "Building A",
            "city": "Paris",
            "zipCode": "75001",
            "country": "FRANCE"
        }
    }
}
```

#### Error
```
Status: 400 Bad Request
```
```json
{
    "error": "SIREN not found"
}
```
### /api/v1/conversion
This API converts a value from one currency to another.

#### Request
```http request
GET /api/v1/conversion?value=10&from=USD&to=EUR
```
* `value` (required): the value to convert.
* `from` (optional): the base currency (default is EUR).
* `to` (required): the target currency.

#### Response
##### Success
```
Status: 200 OK
```
```json
{
    "value": 8.56
}
```

#### Error
```
Status: 400 Bad Request
```
```json
{
    "error": "Missing value query parameter"
}
```

## License
This project is licensed under the **GNU General Public License v3.0**. For more information, please see the `LICENSE` file.

# ahmadREST
REST API using Node.js + Express + MongoDB + JWT

## API

### Login

* **URL** : `/api/auth`
* **Method** : `POST`
* **Header**: `Content-Type:application/json`
*  **URL Params**
   **Required:**
   `None`

* **Data Params**
  ```javascript
    {
    	"email": "email@mitrais.com",
    	"password": "password"
    }
  ```

* **Success Response:**

  * **Code:** `200`
  * **Content:** 
    ```javascript
    {
        "message": "Login successfully",
        "data": {
            "_id": "5c86095820d09a3f6c5ca7db",
            "email": "email@mitrais.com",
            "password": "$2a$08$kcR9u2Vggo9JG5iWuFhEOeDbzf7BEaL8p3e7qUoQyqWXbclgWI8Tq",
            "name": "Fullname",
            "updatedAt": "2019-03-11T07:08:09.004Z",
            "createdAt": "2019-03-11T07:08:09.004Z",
            "__v": 0
        },
        "token": "string token"
    }
    ```
 
* **Error Response:**

  * **Code:** `401`
  * **Content:**
    ```javascript
    {
        "message": "Email or Password is not valid"
    }
    ```

### Registration

* **URL** : `/api/auth/register`
* **Method** : `POST`
* **Header**: `Content-Type:application/json`
*  **URL Params**
   **Required:**
   `None`

* **Data Params**
  ```javascript
    {
    	"email": "email@mitrais.com",
    	"password": "password",
    	"name": "Fullname"
    }
  ```

* **Success Response:**

  * **Code:** `200`
  * **Content:** 
    ```javascript
    {
        "message": "Register successfully",
        "data": {
            "_id": "5c872d3164d17010a009b545",
            "email": "dwi@mitrais.com",
            "password": "$2a$08$JxrDBVd9DRcfI/UbFaR6reTUCFKWc6lgFxElNkcWeVItua0nIGfg.",
            "name": "Dwi Nuha",
            "updatedAt": "2019-03-12T03:53:21.408Z",
            "createdAt": "2019-03-12T03:53:21.408Z",
            "__v": 0
        }
    }
    ```
 
* **Error Response:**

  * **Code:** `500`
  * **Content:**
    ```javascript
    {
        "message": "string message"
    }
    ```
    
### Vehicle
This API is used to get data Vehicle, Edit, and delete.

#### List Vehicle
* **URL** : `/api/vehicles`
* **Method** : `GET`
* **Header**:
    - `Content-Type:application/json`
    - `Authorization: Bearer [string token]`
*  **URL Params**
   **Required:**
   `None`

* **Data Params**
  `None`

* **Success Response:**

  * **Code:** `200`
  * **Content:** 
    ```javascript
    {
    "message": "vehicles retrieved successfully",
    "data": [
        {
            "_id": "5c8609a620d09a3f6c5ca7dd",
            "name": "Ayla 2",
            "class": "City Car",
            "manufacture": "Toyota",
            "production": "2017",
            "transmission": "Manual",
            "color": "Black",
            "description": "description",
            "updatedAt": "2019-03-11T07:09:26.270Z",
            "createdAt": "2019-03-11T07:09:26.270Z",
            "__v": 0
        }
    ]
}
    ```
 
* **Error Response:**

  * **Code:** `500`
  * **Content:**
    ```javascript
    {
        "message": "string message"
    }
    ```
    
#### Add Vehicle
* **URL** : `/api/vehicles`
* **Method** : `POST`
* **Header**:
    - `Content-Type:application/json`
    - `Authorization: Bearer [string token]`
*  **URL Params**
   **Required:**
   `None`

* **Data Params**
  ```javascript
    {
    	"name": "All New Ayla",
    	"class": "City Car",
    	"manufacture": "Toyota",
    	"production": "2018",
    	"transmission": "Manual",
    	"color": "Red Valvet",
    	"description": "description"
    }
  ```

* **Success Response:**

  * **Code:** `201`
  * **Content:** 
    ```javascript
    {
        "message": "New vehicle created!",
        "data": {
            "_id": "5c872edb64d17010a009b546",
            "name": "All New Brio",
            "class": "City Car",
            "manufacture": "Honda",
            "production": "2018",
            "transmission": "Matic",
            "color": "Black",
            "description": "description",
            "updatedAt": "2019-03-12T04:00:27.274Z",
            "createdAt": "2019-03-12T04:00:27.274Z",
            "__v": 0
        }
    }
    ```
 
* **Error Response:**

  * **Code:** `500`
  * **Content:**
    ```javascript
    {
        "message": "string message"
    }
    ```
    
#### Get Vehicle by ID
* **URL** : `/api/vehicles/[vehicle_id]`
* **Method** : `POST`
* **Header**:
    - `Content-Type:application/json`
    - `Authorization: Bearer [string token]`
*  **URL Params**
   **Required:**
   `vehicle_id:string`

* **Data Params**
  `none`

* **Success Response:**

  * **Code:** `200`
  * **Content:** 
    ```javascript
    {
        "message": "vehicles retrieved successfully",
        "data": {
            "_id": "5c872edb64d17010a009b546",
            "name": "All New Brio",
            "class": "City Car",
            "manufacture": "Honda",
            "production": "2018",
            "transmission": "Matic",
            "color": "Black",
            "description": "description",
            "updatedAt": "2019-03-12T04:00:27.274Z",
            "createdAt": "2019-03-12T04:00:27.274Z",
            "__v": 0
        }
    }
    ```
 
* **Error Response:**

  * **Code:** `500`
  * **Content:**
    ```javascript
    {
        "message": "string message"
    }
    ```
    
#### Edit Vehicle
* **URL** : `/api/vehicles/[vehicle_id]`
* **Method** : `PUT`
* **Header**:
    - `Content-Type:application/json`
    - `Authorization: Bearer [string token]`
*  **URL Params**
   **Required:**
   `vehicle_id:string`

* **Data Params**
  ```javascript
    {
    	"name": "All New Ayla",
    	"class": "City Car",
    	"manufacture": "Toyota",
    	"production": "2018",
    	"transmission": "Manual",
    	"color": "Red Valvet",
    	"description": "description"
    }
  ```

* **Success Response:**

  * **Code:** `200`
  * **Content:** 
    ```javascript
    {
        "message": "Vehicle Info updated",
        "data": {
            "_id": "5c872edb64d17010a009b546",
            name": "All New Ayla",
        	"class": "City Car",
        	"manufacture": "Toyota",
        	"production": "2018",
        	"transmission": "Manual",
        	"color": "Red Valvet",
            "description": "description",
            "updatedAt": "2019-03-12T04:00:27.274Z",
            "createdAt": "2019-03-12T04:00:27.274Z",
            "__v": 0
        }
    }
    ```
 
* **Error Response:**

  * **Code:** `500`
  * **Content:**
    ```javascript
    {
        "message": "string message"
    }
    ```
    
#### Delete Vehicle
* **URL** : `/api/vehicles/[vehicle_id]`
* **Method** : `DELETE`
* **Header**:
    - `Content-Type:application/json`
    - `Authorization: Bearer [string token]`
*  **URL Params**
   **Required:**
   `vehicle_id:string`

* **Data Params**
  `none`

* **Success Response:**

  * **Code:** `302`
  * **Content:** 
    ```javascript
    {
        "message": "User deleted"
    }
    ```
 
* **Error Response:**

  * **Code:** `500`
  * **Content:**
    ```javascript
    {
        "message": "string message"
    }
    ```
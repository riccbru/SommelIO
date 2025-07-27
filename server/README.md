# SommelIO - Server

## `LOGIN & JWT`
Endpoint: `POST /api/v1/auth/login`.

### REQUEST
- Header
    - 
    - Content-Type: application/json

- Body
    - 
    ```json
    {
        "username": <USERNAME>,
        "password": <PASSWORD>
    }
    ```
### RESPONSE
- HTTP Status: `200 OK`
- Header
    -
    - Set-Cookie: refreshToken=<REFRESH_TOKEN>; Max-Age=604800; Path=/; Expires=<EXPIRE_TIME> GMT; HttpOnly; SameSite=Strict
- Body
    -
    ```json
    {
        "token": <ACCESS_TOKEN>
    }
    ```

## `REFRESH`
Endpoint: `POST /api/v1/auth/refresh`.

### REQUEST
- Header
    -
    - Cookie: refreshToken <REFRESH_TOKEN>
- Body
    -
    ```json
    {}
    ```

### RESPONSE
- HTTP Status: `200 OK`
- Header
    -
    - Set-Cookie: refreshToken=<REFRESH_TOKEN>; Max-Age=604800; Path=/; Expires=<EXPIRE_TIME> GMT; HttpOnly; SameSite=Strict
- Body
    -
    ```json
    {
        "token": <ACCESS_TOKEN>
    }
    ```

## `LOGOUT`
Endpoint: `POST /api/v1/auth/logout`.

JWT Authorization is stateful, and it is meaningless to logout, unless the secret to sign JWT's payload changes. This route just deletes the _refreshToken_ cookie.

### REQUEST
- Header
    -
    - Cookie: refreshToken <REFRESH_TOKEN>
- Body
    -
    ```json
    {}
    ```
### RESPONSE
- HTTP Status: `204 No Content`
- Header
    -
    - 
- Body
    -
    ```json
    {}
    ```

## `GET USER`
Endpoint: `GET /api/v1/users/me`.

### REQUEST
- Header
    -
    - Authorization: Bearer <ACCESS_TOKEN>
- Body
    -
    ```json
    {}
    ````

### RESPONSE
- HTTP Status: `200 OK`
- Header
    -
    -
- Body
    -
    ```json
    {
        "uid": <UUID-32>,
        "username": <USERNAME>,
        "full_name": <FULL_NAME>,
        "email": <EMAIL>
    }
    ```

## `GET TASTING(S)`
Endpoint: `GET /api/v1/tastings/:tasting_uuid`.

If the URL parameter `tasting_uuid` is passed the route returns the single tasting object, else it returns the tastings list belonging to the user.

### REQUEST
- Header
    -
    - Accept-Language: it 
    - Authorization: Bearer <ACCESS_TOKEN>
- Body
    -
    ```json
    {}
    ```

### RESPONSE
- HTTP Status: `200 OK`
- Header
    -
    -
- Body
    -
    ```json
    {
        "tastings":
        [
            {
                "tid": <UUID-32>,
                "uid": <UUID-32>,
                "full_name": <FULL_NAME>,
                "wine_category_name": <TEXT>,
                "sample_number": <TEXT>,
                "wine_denomination": <TEXT>,
                "alcohol_content": <TEXT %>,
                "vintage": <YEAR>,
                "wine_temperature": <TEXT°C>,
                "ambient_temperature": <TEXT°C>,
                "tasting_date": <YYYY-MM-DD>,
                "tasting_time": <HH:MM>,
                "tasting_location": <TEXT>,
                "created_at": <DATE_ISO-8601>,
                "updated_at": <DATE_ISO-8601>
            },
        ]
    }
    ```

## `CREATE TASTING`
Endpoint: `POST /api/v1/tastings`.

### REQUEST
- Header
    -
    - Accept-Language: it
    - Authroization: Bearer <ACCESS_TOKEN>
    - Content-Type: application/json
- Body
    -
    ```json
    {
        "wine_category_name": <TEXT>,
        "sample_number": <TEXT>,
        "wine_denomination": <TEXT>,
        "alcohol_content": <TEXT %>,
        "vintage": <YEAR>,
        "wine_temperature": <TEXT°C>,
        "ambient_temperature": <TEXT°C>,
        "tasting_date": <YYYY-MM-DD>,
        "tasting_time": <HH:MM>,
        "tasting_location": <TEXT>
    }
    ```

### RESPONSE
- HTTP Status: `201 Created`
- Header
    -
    -
- Body
    -
    ```json
    {
        "tid": <UUID-32>,
        "uid": <UUID-32>,
        "full_name": <FULL_NAME>,
        "wine_category_name": <TEXT>,
        "sample_number": <TEXT>,
        "wine_denomination": <TEXT>,
        "alcohol_content": <TEXT %>,
        "vintage": <YEAR>,
        "wine_temperature": <TEXT°C>,
        "ambient_temperature": <TEXT°C>,
        "tasting_date": <YYYY-MM-DD>,
        "tasting_time": <HH:MM>,
        "tasting_location": <TEXT>,
        "created_at": <DATE_ISO-8601>,
        "updated_at": <DATE_ISO-8601>
    }
    ```

## `GET ALL EXAMS`
Endpoint: `GET /api/v1/exams/:tasting_uuid`.

This route returns all the exams related to URL parameter `tasting_uuid`.

### REQUEST
- Header
    -
    - Accept-Language: it
    - Authorization: Bearer <ACCESS_TOKEN>
- Body
    -
    ```json
    {}
    ```

### RESPONSE
- HTTP Status: `200 OK`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "tasting_uuid": <UUID-32>,
            "exams": {
                "visual_exam": {},
                "olfactory_exam": {},
                "taste_olfactory_exam": {},
                "final_considerations": {}
            }
        }
        ```
- HTTP Status: `400 Bad Request`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "error": "URL parameter 'tasting_uuid' is {undefined/an invalid UUID-32}"
        }
        ```

## `GET SINGLE EXAM`
Endpoint: `GET /api/v1/exams/:tasting_uuid/:exam_type`.

The route returns dynamically a single exam associated to `tasting_uuid` using the URL parameter `exam_type`, which can assume the following values:
1. **visual**
2. **olfactory**
3. **taste**
4. **final**


### REQUEST
- Header
    -
    - Authorization: Bearer <ACCESS_TOKEN>
- Body
    -
    ```json
    {}
    ```

### RESPONSE
- HTTP Status: `200 OK`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "tasting_uuid": <UUID-32>,
            "{visual/olfactory/tast/final}_exam": {}
        }
        ```

## `CREATE EXAM`
Endpoint: `POST /api/v1/exams/:tasting_uuid/:exam_type`.



### REQUEST
- Header
    -
    - Authorization: Bearer <ACCESS_TOKEN>
    - Content-Type: application/json
- Body
    -
    ```json
    {}
    ```

### RESPONSE
- HTTP Status: `201 Created`
- Header
    -
    -
- Body
    -
    ```json
    {}
    ```








## ``
Endpoint: ``.


### REQUEST
- Header
    -
    -
- Body
    -
    ```json
    {}
    ```

### RESPONSE
- HTTP Status: ``
- Header
    -
    -
- Body
    -
    ```json
    {}
    ```
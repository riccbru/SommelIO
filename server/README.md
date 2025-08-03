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
- `200 OK`
    - Header
        -
        - Set-Cookie:
            - refreshToken=<REFRESH_TOKEN>;
            - Max-Age=604800;
            - Path=/;
            - Expires=<EXPIRE_TIME> GMT;
            - HttpOnly;
            - SameSite=Strict
    - Body
        -
        ```json
        {
            "token": <ACCESS_TOKEN>
        }
        ```
- `400 Bad Request` (at least one credential is empty)
    - Header
        -
        - 
    - Body
        -
        ```json
        {
            "error": "Username and password required"
        }
        ```
- `401 Unauthorized` (credentials are incorrect)
    - Header
        -
        - 
    - Body
        -
        ```json
        {
            "error": "Invalid username and/or password"
        }
        ```

## `SINGUP`
Endpoint: `POST /api/v1/auth/signup`.


### REQUEST
- Header
    -
    -
- Body
    -
    ```json
    {
        "full_name": <FULL_NAME>,
        "username": <USERNAME>,
        "email": <USER@HOSTNAME.DOMAIN>,
        "birthdate": <YYYY-MM-DD>,
        "password": <PASSWORD>
    }
    ```

### RESPONSE
- `201 Created`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "success": "User <UUID-32> created successfully"
        }
        ```
- `409 Conflict`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "error": "Username or email already taken"
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
- `200 OK`
    - Header
        -
        - Set-Cookie:
            - refreshToken=<REFRESH_TOKEN>;
            - Max-Age=604800;
            - Path=/;
            - Expires=<EXPIRE_TIME> GMT;
            - HttpOnly;
            - SameSite=Strict
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
- `204 No Content`
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
- `200 OK`
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

## `GET TASTING BY UUID`
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
- `200 OK`
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
            "updated_at": <DATE_ISO-8601>,
            "visual_exam": { ... },
            "olfactory_exam": { ... },
            "taste_olfactory_exam": { ... },
            "final_considerations": { ... }
        }
        ```

## `GET TASTINGS`
Endpoint: `GET /api/v1/tastings`.

Returns a list of all tastings made by the current user.


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
- `200 OK`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "tastings": [
                { ... },
                { ... }
            ]
        }
        ```


## `CREATE TASTING`
Endpoint: `POST /api/v1/tastings`.

All the vlaues explained:
| **Field Name**           | **Type**   | **Expected Format**         | **Example**                |
|--------------------------|------------|-----------------------------|----------------------------|
| `wine_category_name`     | TEXT       | Free text                   | `"Vino rosso fermo"`       |
| `sample_number`          | TEXT       | Alphanumeric / numeric ID   | `"12A"`, `"001"`, `"B3"`   |
| `wine_denomination`      | TEXT       | Free text                   | `"Chianti Classico DOCG"`  |
| `alcohol_content`        | TEXT       | Number + `%` as string      | `"13.5%"`, `"14%"`         |
| `vintage`                | YEAR       | 4-digit year                | `2020`, `2018`             |
| `wine_temperature`       | TEXT       | Temperature + unit          | `"18°C"`, `"16-18°C"`      |
| `ambient_temperature`    | TEXT       | Temperature + unit          | `"20°C"`                   |
| `tasting_date`           | DATE       | `YYYY-MM-DD`                | `"2025-07-28"`             |
| `tasting_time`           | TIME       | `HH:MM` (24h format)        | `"14:30"`                  |
| `tasting_location`       | TEXT       | Free text                   | `"Torino"`                 |

### REQUEST
- Header
    -
    - Accept-Language: it
    - Authorization: Bearer <ACCESS_TOKEN>
    - Content-Type: application/json
- Body
    -
    ```json
    {
        "wine_category_name": <TEXT>,
        "sample_number": <TEXT>,
        "wine_denomination": <TEXT>,
        "alcohol_content": <TEXT>,
        "vintage": <YEAR>,
        "wine_temperature": <TEXT>,
        "ambient_temperature": <TEXT>,
        "tasting_date": <YYYY-MM-DD>,
        "tasting_time": <HH:MM>,
        "tasting_location": <TEXT>
    }
    ```

### RESPONSE
- `201 Created`
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
- `200 OK`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "tasting_uuid": <UUID-32>,
            "exams": {
                "visual_exam": { ... },
                "olfactory_exam": { ... },
                "taste_olfactory_exam": { ... },
                "final_considerations": { ... }
            }
        }
        ```
- `400 Bad Request`
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
- `200 OK`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "tasting_uuid": <UUID-32>,
            "{visual/olfactory/tast/final}_exam": { ... }
        }
        ```

## `CREATE EXAMS`
Endpoint: `POST /api/v1/exams/:tasting_uuid`.

All the possible values are described below:

- ### VISUAL Exam
    | **Attribute**           | **Allowed Values**                                                                        |
    |-------------------------|-------------------------------------------------------------------------------------------|
    | **Limpidity**           | `velato`, `abbastanza_limpido`, `limpido`, `cristallino`, `brillante`                     |
    | **Color Family**        | `giallo`, `rosa`, `rosso`                                                                 |
    | **Color Shade**         | **GIALLO**: `verdolino`, `paglierino`, `dorato`, `ambrato` <br> **ROSA**: `tenue`, `cerasuolo`, `chiaretto` <br> **ROSSO**: `porpora`, `rubino`, `granato`, `aranciato`                                                                                      |
    | **Consistency**         | `fluido`, `poco_consistente`, `abbastanza_consistente`, `consistente`, `viscoso`          |
    | **Bubble Grain**        | `grossolane`, `abbastanza_fini`, `fini`                                                   |
    | **Bubble Number**       | `scarse`, `abbastanza_numerose`, `numerose`                                               |
    | **Bubble Persistence**  | `evanescenti`, `abbastanza_persistenti`, `persistenti`                                    |
    | **notes**               | Free text                                                                                 |


- ### OLFACTORY Exam
    | **Attribute**           | **Allowed Values**                                                                        |
    |-------------------------|-------------------------------------------------------------------------------------------|
    | **Intensity**           | `carente`, `poco_intenso`, `abbastanza_intenso`, `intenso`, `molto_intenso`               |
    | **Complexity**          | `carente`, `poco_complesso`, `abbastanza_complesso`, `complesso`, `ampio`                 |
    | **Quality**             | `comune`, `poco_fine`, `abbastanza_fine`, `fine`, `eccellente`                            |
    | **Descriptors**         | `aromatic` <br> `vinous` <br> `floral` <br> `fruity` <br> `fragrant` <br> `herbaceous` <br> `mineral` <br> `spicy` <br> `ethereal` <br> `frank`                                                                                                               |
    | **Notes**               | Free text                                                                                 |

- ### TASTE-OLFACTORY Exam
    | **Attribute**           | **Allowed Values**                                                                        |
    |-------------------------|-------------------------------------------------------------------------------------------|
    | **Sugars**              | `secco`, `amabile`, `abboccato`, `dolce`, `stucchevole`                                   |
    | **Alcohols**            | `leggero`, `poco_caldo`, `abbastanza_caldo`, `caldo`, `alcolico`                          |
    | **Polyalcohols**        | `spigoloso`, `poco_morbido`, `abbastanza_morbido`, `morbido`, `pastoso`                   |
    | **Acids**               | `piatto`, `poco_fresco`, `abbastanza_fresco`, `fresco`, `acidulo`                         |
    | **Tannins**             | `molle`, `poco_tannico`, `abbastanza_tannico`, `tannico`, `astringente`                   |
    | **Minerals**            | `scipito`, `poco_sapido`, `abbastanza_sapido`, `sapido`, `salato`                         |
    | **Balance**             | `poco_equilibrato`, `abbastanza_equilibrato`, `equilibrato`                               |
    | **Intensity**           | `carente`, `poco_intenso`, `abbastanza_intenso`, `intenso`, `molto_intenso`               |
    | **Persistence**         | `corto`, `poco_persistente`, `abbastanza_persistente`, `persistente`, `molto_persistente` |
    | **Quality**             | `comune`, `poco_fine`, `abbastanza_fine`, `fine`, `eccellente`                            |
    | **Structure**           | `magro`, `debole`, `di_corpo`, `robusto`, `pesante`                                       |
    | **Notes**               | Free text                                                                                 |

- ### FINAL-CONSIDERATIONS Exam
    | **Attribute**           | **Allowed Values**                                                                        |
    |-------------------------|-------------------------------------------------------------------------------------------|
    | **Evolution**           | `immaturo`, `giovane`, `pronto`, `maturo`, `vecchio`                                      |
    | **Harmony**             | `poco_armonico`, `abbastanza_armonico`, `armonico`                                        |
    | **Pairings**            | Free text                                                                                 |
    | **Notes**               | Free text                                                                                 |

### REQUEST
- Header
    -
    - Authorization: Bearer <ACCESS_TOKEN>
    - Content-Type: application/json
- Body
    -
    ```json
    {
        "visual_exam": {
            "limpidity": <TEXT>,
            "color_family": <TEXT>,
            "color_shade": <TEXT>,
            "consistency": <TEXT>,
            "bubble_grain": null OR <TEXT>,
            "bubble_number": null OR <TEXT>,
            "bubble_persistence": null OR <TEXT>,
            "notes": <TEXT>
        },
        "olfactory_exam": {
            "intensity": <TEXT>,
            "complexity": <TEXT>,
            "quality": <TEXT>,
            "aromatic": <BOOLEAN>,
            "vinous": <BOOLEAN>,
            "floral": <BOOLEAN>,
            "fruity": <BOOLEAN>,
            "fragrant": <BOOLEAN>,
            "herbaceous": <BOOLEAN>,
            "mineral": <BOOLEAN>,
            "spicy": <BOOLEAN>,
            "ethereal": <BOOLEAN>,
            "frank": <BOOLEAN>,
            "notes": <TEXT>
        },
        "taste_olfactory_exam": {
            "sugars": <TEXT>,
            "alcohols": <TEXT>,
            "polyalcohols": <TEXT>,
            "acids": <TEXT>,
            "tannins": <TEXT>,
            "minerals": <TEXT>,
            "balance": <TEXT>,
            "intensity": <TEXT>,
            "persistence": <TEXT>,
            "quality": <TEXT>,
            "structure": <TEXT>,
            "notes": <TEXT>
        },
        "final_considerations": {
            "evolution": <TEXT>,
            "harmony": <TEXT>,
            "pairings": <TEXT>,
            "notes": <TEXT>
        }
    }
    ```

### RESPONSE
- `201 Created`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "tasting_uuid": <UUID-32>,
            "exams": {
              "visual_exam": {
                "eid": <UUID-32>,
                "limpidity": <TEXT>,
                "color_family": <TEXT>,
                "color_shade": <TEXT>,
                "consistency": <TEXT>,
                "bubble_grain": null OR <TEXT>,
                "bubble_number": null OR <TEXT>,
                "bubble_persistence": null OR <TEXT>,
                "notes": <TEXT>
            },
              "olfactory_exam": {
                "eid": <UUID-32>,
                "intensity": <TEXT>,
                "complexity": <TEXT>,
                "quality": <TEXT>,
                "aromatic": <BOOLEAN>,
                "vinous": <BOOLEAN>,
                "floral": <BOOLEAN>,
                "fruity": <BOOLEAN>,
                "fragrant": <BOOLEAN>,
                "herbaceous": <BOOLEAN>,
                "mineral": <BOOLEAN>,
                "spicy": <BOOLEAN>,
                "ethereal": <BOOLEAN>,
                "frank": <BOOLEAN>,
                "notes": <TEXT>
              },
              "taste_olfactory_exam": {
                "eid": <UUID-32>,
                "sugars": <TEXT>,
                "alcohols": <TEXT>,
                "polyalcohols": <TEXT>,
                "acids": <TEXT>,
                "tannins": <TEXT>,
                "minerals": <TEXT>,
                "balance": <TEXT>,
                "intensity": <TEXT>,
                "persistence": <TEXT>,
                "quality": <TEXT>,
                "structure": <TEXT>,
                "notes": <TEXT>
              },
              "final_considerations": {
                "eid": <UUID-32>,
                "evolution": <TEXT>,
                "harmony": <TEXT>,
                "pairings": <TEXT>,
                "notes": <TEXT>
              }
            }
        }
        ```
- `409 Conflict`
    - Header
        -
        -
    - Body
        -
        ```json
        {
            "error": "Tasting <UUID-32> has already been examined"
        }
        ```

## `CREATE SINGLE EXAM`
Endpoint: `POST /api/v1/exams/:tasting_uuid/:exam_type`.

The URL parameter `exam_type` can assume the following values:
1. **visual**: for visual exams
2. **olfactory**: for olfactory exams
3. **taste**: for taste-olfactory exams
4. **final**: for final considerations


### REQUEST
- Header
    -
    - Content-Type: application/json
    - Authorization: Bearer {{token}}
- Body
    - 
    - The request body contains the same entries of each exam (without exam's name key)
    ```json
    {
        ...,
        "notes": <TEXT>
    }
    ```

### RESPONSE
- `201 Created`
    - Header
        -
        -
    - Body
        -
        ```json
        {
          "eid": <UUID-32>,
          ...
        }
        ```
- `409 Conflict`
    - Header
        -
        -
    - Body
        -
        ```json
        {
          "error": "Tasting <UUID-32> already has (visual/olfactory/taste/final) exam"
        }
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
- ``
    - Header
        -
        -
    - Body
        -
        ```json
        {}
        ```
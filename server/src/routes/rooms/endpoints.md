# Rooms
## List
- Method: `GET`
- URL: `/api/rooms/`

Response
```
{
    "rooms": [
        {
            "_id": string,
            "isActive": boolean,
            "name": string,
            "creator": {
                "_id": string,
                "username": string,
            },
            "created": string,
        }
    ]
}
```

## Create
- Method: `POST` 
- URL: `/api/rooms`

Request
```
{
    "name": string,
}
```

Response
```
{
    "room": {
        "_id": string,
        "isActive": boolean,
        "name": string,
        "creator": {
            "_id": string,
            "username": string,
        },
        "created": string,
    }
}
```

## Remove (Not Available)
- Method `DELETE`
- URL `/api/rooms/:id`

Response
```
Not implemented
```

## Retrieve
- Method `GET`
- URL `/api/rooms/:id`

Response 
```
{
    "room":{
        "_id":"string",
        "isActive":boolean,
        "invitedMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "currentMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "name": string,
        "creator": {
            _id": string,
            "username": string,
        },
        "created": string,
    }
}
```

## Update
- Method `PUT`
- URL `/api/rooms/:id`

Request
```
{
    "name": string
}
```

Response
```
{
    "room": {
        "_id": string,
        "isActive": boolean,
        "name": string,
        "creator": {
            "_id": string,
            "username": string,
        },
        "created": string,
    }
}
```

## Invite Member
- Method `PUT`
- URL `/api/rooms/:id/inviteMembers`

Request
```
{
    "users": string[], // list of user ids
}
```

Response
```
{
    "room":{
        "_id":"string",
        "isActive":boolean,
        "invitedMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "currentMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "name": string,
        "creator": {
            _id": string,
            "username": string,
        },
        "created": string,
    }
}
```


## Uninvite Member
- Method `PUT`
- URL `/api/rooms/:id/uninviteMembers`

Request
```
{
    "users": string[],
}
```

Response
```
{
    "room":{
        "_id":"string",
        "isActive":boolean,
        "invitedMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "currentMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "name": string,
        "creator": {
            _id": string,
            "username": string,
        },
        "created": string,
    }
}
```

## Join
- Method `POST`
- URL `/api/rooms/:id/join`

Request
```
{

}
```

Response
```
{
    "room":{
        "_id":"string",
        "isActive":boolean,
        "invitedMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "currentMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "name": string,
        "creator": {
            _id": string,
            "username": string,
        },
        "created": string,
    }
}
```

## Leave
- Method `POST`
- URL `api/rooms/:id/leave`

Request
```
{

}
```

Response
```
{
    "room":{
        "_id":"string",
        "isActive":boolean,
        "invitedMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "currentMembers":[
            {
                "_id": string,
                "username": string,
            }
        ],
        "name": string,
        "creator": {
            _id": string,
            "username": string,
        },
        "created": string,
    }
}
```
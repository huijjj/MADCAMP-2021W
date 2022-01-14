# Drunken Farm Back

<img width="100%" src="https://user-images.githubusercontent.com/74184274/149309062-f60c57a3-f7d3-453d-a0d5-a4328dec2043.gif" />
<p align="center"><em>백엔드는 프로가 아니니까..!</em></p>
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-000000?style=flat-square&logo=MySQL&logoColor=white"/>
</p>

    http://192.249.18.138:433

##  API - user

  ### Get Every User Information
   - HTTP Protocol
   
    GET /api/user/all
   - respond - Respond every `User` information by `json`
   
    [
      {
        "id": "ID",
        "nick": "NAME",
        "tier": 0,
        "graduateCount": 0,
        "pwd": "PWD",
        "Money": 0
      },
      {
        "id": "ID",
        "nick": "NAME",
        "tier": 0,
        "graduateCount": 0,
        "pwd": "PWD",
        "Money": 0
      }
    ]
   
  ### Get User Information
   - HTTP Protocol
   
    GET /api/user/show/:id
   - respond
   
    [
      {
        "id": "ID",
        "nick": "NAME",
        "tier": 0,
        "graduateCount": 0,
        "pwd": "PWD",
        "Money": 0
      }
    ]
  ### Register
   - HTTP Protocol
   
    POST /api/user/register
   - respond - success
   
    [
      {
        "id": "ID",
        "nick": "NAME",
        "tier": 0,
        "graduateCount": 0,
        "pwd": "PWD",
        "Money": 0
      }
    ]
      - respond - success
   
   - respond - fail
    
    {status : "invalid"}

   ### Login
   - HTTP Protocol
   
    POST /api/user/login
   - respond - success
   
    [
      {
        "id": "ID",
        "nick": "NAME",
        "tier": 0,
        "graduateCount": 0,
        "pwd": "PWD",
        "Money": 0
      }
    ]
   
   - respond - fail

    {status : "invalid"}

##  API - animal

  ### Get Every Animal Information
   - HTTP Protocol
   
    GET /api/animal/all
   - respond 
   
    [
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      },
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      }
    ]
    
   ### Get Every Animal Info Which Owner Has
   - HTTP Protocol
   
    GET /api/animal/owner/:ownerId
   - respond 
   
    [
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      },
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      }
    ]

   ### Get Single Animal Information
   - HTTP Protocol
   
    GET /api/animal/info/:id
   - respond 
   
    [
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      }
    ]
  ### Buy From Animal Market
   - HTTP Protocol
   
    GET /api/animal/buy/:ownerId/:name/:sex/:type/:price
   - respond - success
   
    [
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      }
    ]
   - respond - fail

    {status : "invalid"}
  
  ### Abandon Animal
   - HTTP Protocol
   
    GET /api/animal/abandon/:id
   - respond

    {status : "success"}
   ### Get Every Animal Info Which Owner Has
   - HTTP Protocol
   
    GET /api/animal/abandoned
   - respond 
   
    [
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      },
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      }
    ]
### Adopt From Animal Market
   - HTTP Protocol
   
    GET /api/animal/adopt/:id/:ownerId
   - respond 
   
    [
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      }
    ]

### Change Status
   - HTTP Protocol
   
    GET /api/animal/change/:id/:geee/:duck/:chae/:adventureCount/:itemCount
   - respond 
   
    [
      {
        "id": "ID",
        "name": "NAME",
        "type": "TYPE1",
        "sex": "M",
        "owner": "OWNER",
        "adventureCount": 0,
        "itemCount": 0,
        "geee": 0,
        "duck": 0,
        "chae": 0,
        "isAbandoned": 0,
        "X": 0,
        "Y": 0
      }
    ]
  ### Die Animal
   - HTTP Protocol
   
    GET /api/animal/kill/:id
   - respond - success

    {status : "Success"}
   - respond - fail

    {status : "Fail"}
  ### Graduate Animal
   - HTTP Protocol
   
    GET /api/animal/graduate/:id/:ownerId/:reward
   - respond - success

    {status : "Success"}
   - respond - fail

    {status : "Fail"}

##  API - item

 ### Get Every Item Information
   - HTTP Protocol
   
    GET /api/item/all
   - respond 
   
    [
      {
        "id": "ID",
        "type": "TYPE",
        "owner": "OWNER",
        "geee": 0,
        "duck": 0,
        "chae": 0
      },
      {
        "id": "ID",
        "type": "TYPE",
        "owner": "OWNER",
        "geee": 0,
        "duck": 0,
        "chae": 0
      }
    ]
 ### Get Single Item Information
   - HTTP Protocol
   
    GET /api/item/info/:id
   - respond 
   
    [
      {
        "id": "ID",
        "type": "TYPE",
        "owner": "OWNER",
        "geee": 0,
        "duck": 0,
        "chae": 0
      }
    ]
   ### Buy Item From Shop
   - HTTP Protocol
   
    GET /api/item/buy/:ownerId/:type/:geee/:duck/:chae/:price
   - respond 
   
    [
      {
        "id": "ID",
        "type": "TYPE",
        "owner": "OWNER",
        "geee": 0,
        "duck": 0,
        "chae": 0
      }
    ]
 ### Get Every Item Owner Has
   - HTTP Protocol
   
    GET /api/item/owner/:ownerId
   - respond 
   
    [
      {
        "id": "ID",
        "type": "TYPE",
        "owner": "OWNER",
        "geee": 0,
        "duck": 0,
        "chae": 0
      },
      {
        "id": "ID",
        "type": "TYPE",
        "owner": "OWNER",
        "geee": 0,
        "duck": 0,
        "chae": 0
      }
    ]
    
  ### Use Item
   - HTTP Protocol
   
    GET /api/item/use/:animalId/:itemId
   - respond - success

    {status : "Success"}
   - respond - fail

    {status : "Fail"}
    
## coding convention
+ feat : 새로운 기능에 대한 커밋 (feat: add react router)
+ fix : 오류 수정에 대한 커밋 (fix: minor bugs)
+ build : 빌드 관련 파일 수정에 대한 커밋 (새로운 node package 추가 등)
+ chore : 그 외 자잘한 수정에 대한 커밋
+ docs : 문서 수정에 대한 커밋 (readme 등)
+ style : 디자인 관련 커밋 (css)
+ refactor : 코드 리팩토링에 대한 커밋 
+ test : 테스트 코드 수정에 대한 커밋
+ WIP: working in progress  하는 중!

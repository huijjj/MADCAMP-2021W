# Drunken Farm Back

<img width="100%" src="https://user-images.githubusercontent.com/74184274/149309062-f60c57a3-f7d3-453d-a0d5-a4328dec2043.gif" />
<p align="center"><em>백엔드는 프로가 아니니까..!</em></p>
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-000000?style=flat-square&logo=MySQL&logoColor=white"/>
</p>

    http://192.249.18.138:443


##  USER

  ### Get Every User Information
  <span style="color:green">GET</span>
    
    /api/user/all

  Example response

    [
      {
          "id": "seungjae",
          "nick": "임승재",
          "tier": 0,
          "graduateCount": 0,
          "pwd": "1234",
          "Money": 9950
      },
      {
          "id": "ddungiii",
          "nick": "김기영",
          "tier": 0,
          "graduateCount": 0,
          "pwd": "1234",
          "Money": 100
      },
      {
          "id": "mim",
          "nick": "김민채",
          "tier": 0,
          "graduateCount": 0,
          "pwd": "1234",
          "Money": 100
      },
      {
          "id": "junseo",
          "nick": "강준서",
          "tier": 0,
          "graduateCount": 0,
          "pwd": "1234",
          "Money": 100
      },
      {
          "id": "bae",
          "nick": "배설영",
          "tier": 0,
          "graduateCount": 0,
          "pwd": "1234",
          "Money": 100
      }
    ]
   
  ### Get User Information
  #### <span style="color:green">GET</span>
    
    /api/user/show/:id
   
  #### PATH VARIABLE
  
   |id|
|:---:|
|seungjae|

  #### Example Response
   
    [
      {
          "id": "seungjae",
          "nick": "임승재",
          "tier": 0,
          "graduateCount": 0,
          "pwd": "1234",
          "Money": 9950
      }
    ]
    
  ### Give Money To User
  #### <span style="color:blue">PUT</span>
    
    /api/user/money/:id
   
  #### PATH VARIABLE
  
   |id|
|:---:|
|seungjae|
  #### BODY
  
   |money|
|:---:|
|10000|

  #### Example Response
   
    {
      "status": "Success"
    }

### Register
  #### <span style="color:yellow">POST</span>
    
    /api/user/register
   
  #### BODY
  
   |id|nick|pwd|
|:---:|:---:|:---:|
|gildong|홍길동|1234|

  #### Example Response
      
    [
      {
          "id": "gildong",
          "nick": "홍길동",
          "tier": 0,
          "graduateCount": 0,
          "pwd": "1234",
          "Money": 100
      }
    ]
   ### Login
  #### <span style="color:yellow">POST</span>
    
    /api/user/login
   
  #### BODY
  
   |id|pwd|
|:---:|:---:|
|gildong|1234|

  #### Example Response
   
    [
        {
            "id": "gildong",
            "nick": "홍길동",
            "tier": 0,
            "graduateCount": 0,
            "pwd": "1234",
            "Money": 100
        }
    ]

##  ANIMAL

  ### Get Every Animal Information
  #### <span style="color:green">GET</span>

   
    /api/animal/all
  #### Example Response
      
    [
        {
            "id": "2024222261",
            "name": "김기영",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 1998,
            "duck": 1998,
            "chae": 1998,
            "isAbandoned": 1,
            "X": 5,
            "Y": 5
        },
        {
            "id": "4024222320",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 1998,
            "duck": 1998,
            "chae": 1998,
            "isAbandoned": 1,
            "X": 649,
            "Y": 173
        },
        {
            "id": "0024222327",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 999,
            "duck": 999,
            "chae": 999,
            "isAbandoned": 1,
            "X": 559,
            "Y": 99
        },
        {
            "id": "0024222329",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 630,
            "Y": 250
        },
        {
            "id": "0024222330",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 844,
            "Y": 318
        },
        {
            "id": "6024222331",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 1113,
            "Y": 246
        },
        {
            "id": "9024222333",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 596,
            "Y": 288
        },
        {
            "id": "5024222341",
            "name": "김기십일",
            "type": "김기영2",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 1502,
            "Y": 194
        },
        {
            "id": "7024222345",
            "name": "김기십",
            "type": "김기영2",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 1258,
            "Y": 102
        }
    ]
    
   ### Get Every Animal Info Which Owner Has
  #### <span style="color:green">GET</span>
    
    /api/animal/owner/:ownerId
   
  #### PATH VARIABLE
  
   |ownerId|
|:---:|
|qwer|

  #### Example Response
   
    [
        {
            "id": "0024222329",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 630,
            "Y": 250
        },
        {
            "id": "0024222330",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 844,
            "Y": 318
        },
        {
            "id": "6024222331",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 1113,
            "Y": 246
        },
        {
            "id": "9024222333",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 596,
            "Y": 288
        },
        {
            "id": "5024222341",
            "name": "김기십일",
            "type": "김기영2",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 1502,
            "Y": 194
        },
        {
            "id": "7024222345",
            "name": "김기십",
            "type": "김기영2",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 1258,
            "Y": 102
        }
    ]


   ### Get Single Animal Information
  #### <span style="color:green">GET</span>
    
    /api/animal/info/:id
   
  #### PATH VARIABLE
  
   |id|
|:---:|
|6024222331|

  #### Example Response
   
    [
        {
            "id": "6024222331",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 0,
            "X": 1113,
            "Y": 246
        }
    ]

### Update Animal X, Y
  #### <span style="color:blue">PUT</span>
    
    /api/animal/move
   
  #### BODY
  
   |id|X|Y|
|:---:|:---:|:---:|
|6024222331|10|300|

  #### Example Response
   
    {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 34,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }

  ### Buy From Animal Market
    
  #### <span style="color:yellow">POST</span>
    
    /api/animal/move

  #### PATH VARIABLE
  
   |ownerId|
|:---:|
|gildong|

  #### BODY
  
   |name|sex|type|price|
|:---:|:---:|:---:|:---:|
|임꺽정|M|임승재1|50|

  #### Example Response
   
    [
        {
            "id": "7025173938288",
            "name": "임꺽정",
            "type": "임승재1",
            "sex": "M",
            "owner": "gildong",
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

  
  ### Abandon Animal
  #### <span style="color:blue">PUT</span>
    
    /api/animal/abandon

  #### BODY
  
   |id|
|:---:|
|7025173938288|

  #### Example Response
   
    {
        "status": "Success"
    }

   ### Get Animal Info Which Abandoned

  #### <span style="color:green">GET</span>
    
    /api/animal/abandoned

  #### Example Response
   
    [
        {
            "id": "2024222261",
            "name": "김기영",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 1998,
            "duck": 1998,
            "chae": 1998,
            "isAbandoned": 1,
            "X": 5,
            "Y": 5
        },
        {
            "id": "4024222320",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 1998,
            "duck": 1998,
            "chae": 1998,
            "isAbandoned": 1,
            "X": 649,
            "Y": 173
        },
        {
            "id": "0024222327",
            "name": "김기",
            "type": "김기영1",
            "sex": "M",
            "owner": "seungjae",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 999,
            "duck": 999,
            "chae": 999,
            "isAbandoned": 1,
            "X": 559,
            "Y": 99
        },
        {
            "id": "7025173938288",
            "name": "임꺽정",
            "type": "임승재1",
            "sex": "M",
            "owner": "gildong",
            "adventureCount": 0,
            "itemCount": 0,
            "geee": 0,
            "duck": 0,
            "chae": 0,
            "isAbandoned": 1,
            "X": 0,
            "Y": 0
        }
    ]

### Adopt From Animal Market
  #### <span style="color:blue">PUT</span>
    
    /api/animal/adopt/:ownerId

  #### PATH VARIABLE
  
   |ownerId|
|:---:|
|gildong|

  #### BODY
  
   |id|
|:---:|
|7025173938288|

  #### Example Response
   
    [
        {
            "id": "7025173938288",
            "name": "임꺽정",
            "type": "임승재1",
            "sex": "M",
            "owner": "gildong",
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
  #### <span style="color:blue">PUT</span>
    
    /api/animal/change/:id

  #### PATH VARIABLE
  
   |id|
|:---:|
|7025173938288|

  #### BODY
  
   |geee|duck|chae|adventureCount|itemCount|
|:---:|:---:|:---:|:---:|:---:|
|10|10|10|1|0

  #### Example Response
   
    [
        {
            "id": "7025173938288",
            "name": "임꺽정",
            "type": "임승재1",
            "sex": "M",
            "owner": "gildong",
            "adventureCount": 1,
            "itemCount": 0,
            "geee": 10,
            "duck": 10,
            "chae": 10,
            "isAbandoned": 0,
            "X": 0,
            "Y": 0
        }
    ]

  ### Die Animal
  #### <span style="color:red">DELETE</span>
    
    /api/animal/kill


  #### BODY
  
   |id|
|:---:|
|7025173938288|

  #### Example Response
   
    {
        "status": "Success"
    }


  ### Graduate Animal
   #### <span style="color:red">DELETE</span>
    
    /api/animal/graduate/:ownerId

  #### PATH VARIABLE
  
   |ownerId|
|:---:|
|seungjae|

  #### BODY
  
   |id|reward|
|:---:|:---:|
|4024222320|110|

  #### Example Response
   
    {
        "status": "Success"
    }

  ### Evolve Animal
  #### <span style="color:blue">PUT</span>
    
    /api/animal/evolve/:id

  #### PATH VARIABLE
  
   |id|
|:---:|
|seungjae|

  #### BODY
  
   |type2|
|:---:|
|김기영2|

  #### Example Response
   
    {
        "status": "Success"
    }

##  ITEM

 ### Get Every Item Information
  #### <span style="color:green">GET</span>
    
    /api/item/all

  #### Example Response
   
    [
        {
            "id": "1024223410758",
            "type": "흑장미",
            "owner": "seungjae",
            "geee": 999,
            "duck": 999,
            "chae": 999
        },
        {
            "id": "3024223411887",
            "type": "흑장미",
            "owner": "seungjae",
            "geee": 999,
            "duck": 999,
            "chae": 999
        }
    ]

 ### Get Single Item Information
  #### <span style="color:green">GET</span>
    
    /api/item/info/:id

  #### PATH VARIABLE
  
   |id|
|:---:|
|1024223410758|

  #### Example Response
   
    [
        {
            "id": "1024223410758",
            "type": "흑장미",
            "owner": "seungjae",
            "geee": 999,
            "duck": 999,
            "chae": 999
        }
    ]

   ### Buy Item From Shop
   #### <span style="color:yellow">POST</span>
    
    /api/item/buy/:ownerId

  #### PATH VARIABLE
  
   |ownerId|
|:---:|
|gildong|

  #### BODY
  
   |type|geee|duck|chae|price|
|:---:|:---:|:---:|:---:|:---:|
|흑장미|0|50|0|100|

  #### Example Response
   
    [
        {
            "id": "7025191727581",
            "type": "흑장미",
            "owner": "gildong",
            "geee": 0,
            "duck": 50,
            "chae": 0
        }
    ]

 ### Get Every Item Owner Has
   #### <span style="color:green">GET</span>
    
    /api/item/owner/:ownerId

  #### PATH VARIABLE
  
   |ownerId|
  |:---:|
  |tester|

  #### Example Response
   
    [
        [
            {
                "id": "6027172854104",
                "type": "book",
                "owner": "tester",
                "geee": 50,
                "duck": 0,
                "chae": 0
            }
        ],
        [
            {
                "id": "8027172836890",
                "type": "rose",
                "owner": "tester",
                "geee": 0,
                "duck": 50,
                "chae": 0
            },
            {
                "id": "8027172837204",
                "type": "rose",
                "owner": "tester",
                "geee": 0,
                "duck": 50,
                "chae": 0
            }
        ],
        [
            {
                "id": "7027172912318",
                "type": "dumbell",
                "owner": "tester",
                "geee": 0,
                "duck": 0,
                "chae": 50
            },
            {
                "id": "8027172912199",
                "type": "dumbell",
                "owner": "tester",
                "geee": 0,
                "duck": 0,
                "chae": 50
            }
        ]
    ]
    
  ### Use Item
  #### <span style="color:red">DELETE</span>
    
    /api/item/use/:animalId

  #### PATH VARIABLE
  
   |animalId|
|:---:|
|1024223410758|

  #### BODY
  
   |itemId|
|:---:|
|1024223410758|

  #### Example Response
   
    {
        "status": "Success"
    }
    
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

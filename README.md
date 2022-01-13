# Drunken Farm Back

<img width="100%" src="https://user-images.githubusercontent.com/74184274/149309062-f60c57a3-f7d3-453d-a0d5-a4328dec2043.gif" />
<p align="center"><em>백엔드는 프로가 아니니까..!</em></p>

## API
```
/*root*/
/
```
```
/*get every user information*/
/api/user/all
```
```
/*get user info, create new row when it doesn't exist*/
/api/user/:id/:nickname
```
```
/*get every animal info which owner has*/
/api/animal/owner/:ownerId
```
```
/*get single animal info*/
/api/animal/info/:id
```
```
/*get animal info which abandoned*/
/api/animal/abandoned
```
```
/*buy from animal market*/
/api/animal/buy/:id
```
```
/*adopt from animal market*/
/api/animal/adopt/:id
```
```
/*adandon animal*/
/api/animal/abandon/:id
```
```
/*change status*/
/api/animal/change/:id/:geee/:duck/:chae/:adventureCount/:itemCount
```
```
/*die animal*/
/api/animal/kill/:id
```
```
/*graduate animal*/
/api/animal/graduate/:id
```
```
/*get single item info*/
/api/item/info/:id
```
```
/*get every item owner has*/
/api/item/owner/:ownerId
```
```
/*use item*/
/api/item/use/:animalId/:itemId
```

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

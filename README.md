# Mad Camp Week1

We made an single activity application with 3 tabs with Kotlin and android studio for the first week common project.
3 tabs are like below.

첫 주 과제로 android studio와 Kotlin을 사용하여 3개의 탭으로 구성된 응용프로그램을 제작하였습니다.
각 탭의 구성은 아래와 같습니다.

- Contacts (연락처)
- Gallery (갤러리)
- Advent calendar (이벤트 달력)



<p align="center">
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147923580-bf94fa43-a64d-4c2d-a444-f7f30b380d88.gif" />
</p>

### Tab 1. Contacts (연락처)
***
To meet the projects requirements, our first tab is contacts. This tab is implemented with fragment and recycler view for efficient screen rendering.
Contacts shown are read from assets/contacts.json using asset manager and inserted in to list by recycler view's adapter.
At the top of the contact list, information of user is shown. User information can be edited by clicking the edit icon at the right top.
Changes in user data is stored in application's data file, so that the changes can remain after application resart.
Please refer to src/main/java/ui/contact and src/main/res/layout/fragment_contact.xml, contact_list_item.xml, contact_user_item.xml for detailed information.

프로젝트의 요구 사항에 맞춰, 첫 번째 탭으로 연락처를 구현하였습니다. 효율적인 화면 구성을 위해 fragment와 recycler view를 사용하였습니다. 
보여지는 연락처는 assets/contacts.json에 저장되어 있으며 asset manager를 사용해 읽어와 adapter를 통해 리스트에 삽입됩니다.
연락처 리스트의 최상단에는 사용자의 정보가 있으며, 우상단의 수정 아이콘을 클릭하여 사용자 정보를 수정할 수 있습니다.
수정된 사용자 정보는 앱의 data file에 저장되어, 앱 재시작시에도 반영됩니다.
자세한 정보는 src/main/java/ui/contact와 src/main/res/layout/fragment_contact.xml, contact_list_item.xml, contact_user_item.xml를 참고 바랍니다.


<p align="center">
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147923726-425695e4-06a3-473b-9142-a108f252904e.gif" />
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147923890-ac9e4d1a-91c5-4bff-9034-1aa6f21afff3.gif" />
</p>

### Tab 2. Gallery (갤러리)
***
Our second tabs is gallery, this tab show photos in src/main/drawable. Like contacts tab, this tab uses fragment and recycler view. 
For efficient loading and orienting of image file we used Glide library when creating list item in adapter. 
You can click the individual photos to get a closer look in the detail page.
At the detail page, you can zoom & scroll over chosen image and date information is shown below.
We seperated images metadata(file name, date information) in seperated json file(photos.json) for extensibility and easy resource management.
And image itself is included in the app file as resource file.
Please refer to src/main/java/ui/gallery and src/main/res/layout/fragment_gallery.xml, contact_gallery_list_item.xml for implementation details.

두 번째 탭은 갤러리를 구현하였습니다. 연락처와 마찬가지로 fragment와 recycler view를 사용했으며 추가로, 빠른 이미지 로딩을 위해 adapter에서 Glide 라이브러리를 사용하였습니다. 갤러러에서 각 사진을 클릭할 경우, 선택된 사진의 디테일 페이지로 전환되며 디테일 페이지에서는 확대 및 축소가 가능합니다.
디테일 페이지의 하단에는 사진이 찍힌 날짜가 출력됩니다. 이미지 추가의 확장성과 관리의 편의성을 위해 파일명을 비롯한 사진의 metadata를 별개의 json 파일로 저장하며, 사진 파일 자체는 앱의 리소스로 포함되어 있습니다.
추가적인 정보는 src/main/java/ui/gallery와 src/main/res/layout/fragment_gallery.xml, contact_gallery_list_item.xml를 참고 바랍니다.

<p align="center">
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147918115-c98415bd-decd-4b9c-bcac-82f37e04c55b.gif" />
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147918348-2e78581e-ddfc-4be6-b43c-3db599517be0.gif" />
</p>

### Tab 3. Advent calendar(이벤트 달력)
***
Last but not least, out final third tab is advent calendar!
An Advent calendar is a special calendar used to count the days of Advent in anticipation of Christmas.
You can open up the ornaments one at a time, one for each day to recieve small but pleasing presents.
You can also enjoy the joyful carol and feel the vibe of christmas.
Checkout the codes at src/main/java/ui/calendar and src/main/res/layout/fragment_calendar.xml to see how this is done.
Every ornament images used are carefully hand-drawn by **Minhee Kim** a.k.a. **minizzang**.
You can get a pleasant gift if you open the presents in right order.
```
You better watch out!
You better not cry!
You better not pout!
I'm telling you why,
Santa Claus is coming to town
He's making a list!
He's checking it twice!
He's gonna find out who's naughty or nice
Santa Claus is coming to town
```

마지막 자유 주제 탭은 재림절 달력을 만들어보았습니다. 재림절 달력은 크리스마스를 기다리며 하루에 하나씩 작은 선물을 열어볼 수 있는 달력입니다.
또한, 이 탭에서는 즐거운 캐럴을 들으며 연말 분위기에 흠뻑 취할 수 있습니다. 
자세한 구현은 src/main/java/ui/calendar와 src/main/res/layout/fragment_calendar.xml의 코드를 참고해주시길 바랍니다.
사용된 모든 장식품 이미지는 **김민희(minizzang)** 께서 손수 그리신 이미지입니다.
나쁜 아이는 선물을 받을 수 없어용~
```
울면 안 돼!
울면 안 돼!
산타할아버지는 우는 아이에겐
선물을 안 주신대
산타할아버지는 알고 계신대
누가 착한 앤지 나쁜 앤지
오늘밤에 다녀가신대
잠 잘 때나 일어날 때
짜증날 때 장난할 때도
산타할아버지는
모든 것을 알고 계신대
```

<p align="center">
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147918646-ff2b80be-012d-47e2-b896-f93a1d6e0557.gif" />
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147918804-d5541c9d-3351-426f-9702-98702958f285.gif" />
</p>

# Credit
+ Minhee Kim(minizzang): minizzang@kaist.ac.kr
+ Huijong Jeong(huijjj): hui0213@postech.ac.kr

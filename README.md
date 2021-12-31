# Mad Camp Week1

We made an single activity application with 3 tabs with Kotlin and android studio for the first week common project.
3 tabs are like below.

첫 주 과제로 android studio와 Kotlin을 사용하여 3개의 tab으로 구성된 응용프로그램을 제작하였습니다.
각 탭의 구성은 아래와 같습니다.

- Contacts (연락처)
- Gallery (갤러리)
- Advent calendar (이벤트 달력)

### Tab 1. Contacts (연락처)
***
To meet the projects requirements, our first tab is contacts. This tab is implemented with fragment and recycler view for efficient screen rendering.
Please refer to src/main/java/ui/contact and src/main/res/layout/fragment_contact.xml, contact_list_item.xml, contact_user_item.xml for detailed information.
Contacts shown are read from assets/contacts.json using asset manager and inserted in to list by recycler view's adapter.

프로젝트의 요구 사항에 맞춰, 첫 번째 탭으로 연락처를 구현하였습니다. 효율적인 화면 구성을 위해 fragment와 recycler view를 사용하였습니다. 
보여지는 연락처는 assets/contacts.json에 저장되어 있으며 asset manager를 사용해 읽어와 adapter를 통해 리스트에 삽입됩니다.
자세한 정보는 src/main/java/ui/contact와 src/main/res/layout/fragment_contact.xml, contact_list_item.xml, contact_user_item.xml를 참고 바랍니다.

### Tab 2. Gallery (갤러리)
***
Our second tabs is gallery, this tab show photos in src/main/drawable. Like contacts tab, this tab uses fragment and recycler view. 
For efficient loading and orienting of image file we used Glide library when creating list item in adapter.
We seperated images metadata(file name, date information) in seperated json file(photos.json) for extensibility and easy resource management.
Please refer to src/main/java/ui/gallery and src/main/res/layout/fragment_gallery.xml, contact_gallery_list_item.xml for implementation details.

두 번째 탭은 갤러리를 구현하였습니다. 연락처와 마찬가지로 fragment와 recycler view를 사용했으며 추가로, 빠른 이미지 로딩을 위해 adapter에서 Glide 라이브러리를 사용하였습니다.
이미지 추가의 확장성과 관리의 편의성을 위해 파일명을 비롯한 이미지의 metadata를 별개의 json 파일로 저장합니다.
추가적인 정보는 src/main/java/ui/gallery와 src/main/res/layout/fragment_gallery.xml, contact_gallery_list_item.xml를 참고 바랍니다.

### Tab 3. Advent calendar(이벤트 달력)
***
Last but not least, out final third tab is advent calendar!
An Advent calendar is a special calendar used to count the days of Advent in anticipation of Christmas.
You can open up the ornaments one at a time, one for each day to recieve small but pleasing presents.
You can also enjoy the joyful carol and feel the vibe of christmas.
Checkout the codes at src/main/java/ui/calendar and src/main/res/layout/fragment_calendar.xml to see how this is done.
Every ornament images used are carefully hand-drawn by talented artist **Minhee Kim** a.k.a. **minizzang**.

마지막 자유 주제 탭은 재림절 달력을 만들어보았습니다. 재림절 달력은 크리스마스를 기다리며 하루에 하나씩 작은 선물을 열어볼 수 있는 달력입니다.
또한, 이 탭에서는 즐거운 캐럴을 들으며 연말 분위기에 흠뻑 취할 수 있습니다. 
자세한 구현은 src/main/java/ui/calendar와 src/main/res/layout/fragment_calendar.xml의 코드를 참고해주시길 바랍니다.
사용된 모든 장식품 이미지는 아티스트 **김민희(minizzang)** 께서 손수 그리신 이미지입니다.


# Credit
+ Minhee Kim(minizzang): minizzang@kaist.ac.kr
+ Huijong Jeong(huijjj): hui0213@postech.ac.kr

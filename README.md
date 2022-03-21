# Song

![cover picture](https://line.sally-handmade.com/lineimg/44b433a.jpg)

Demo:
  - 前台 <https://song.sally-handmade.com>
  - 後台 <https://song.sally-handmade.com/#/admin>

## 專案介紹
>使用 VUE 開發的音樂播放網站
>靈感來自Spotify網站
>為練習 Vue 框架、與後端串API開發的專案。

## 開發技術
- HTML、CSS、JavaScript、Tailwind
- VUE框架 : vue3 composition API、vue-cli、vue-router、vuex
- 套件 : vee-validate(驗證)、howler.js(音樂播放相關)、axios、mitt、nprogress...

## 功能
### 前台

1. 首頁音樂列表選擇後即可播放
  + 列表使用Infinite Scroll
  + 使用howler.js操作音樂檔案
  + 可調整音量與快進/快退時間

2. 查詢
  + 可針對曲風或關鍵字做搜尋

3. 註冊與登入
  + 表單驗證與提示
  + refresh_Token 功能 : 會自動刷新Token 不用重新登入
  + Localstorage 存取登入相關Token

4. 收藏
  + 登入後可以使用收藏/取消收藏功能

### 後台 (管理樂曲)
1. 曲風管理
  + 針對曲風做新增/刪除/修改功能
  + 製作Delete Modal 確認刪除功能

2. 音樂管理
  + 針對音樂做新增/刪除/修改功能
  + 可修改音樂狀態，上架/下架音樂
  + 製作Delete Modal 確認刪除功能

3. 音樂上傳
  + 新增檔案、拖曳新增檔案功能
  + 上傳音樂圖片檔與音樂檔案
  + 預覽圖片


音樂使用 : <https://www.bensound.com/royalty-free-music>

假圖使用 : <https://picsum.photos/>

Vue官網 : <https://vuejs.org/>

refresh Token 參考 : <https://segmentfault.com/a/1190000020210980>

Infinite Scroll 參考 : <https://learnvue.co/>


## 開發人員
### 前端
  yx-chill

  - 網站開發
  - 路由設定
  - API串接
  - 網站部署

### 後端
  KOIE

  - API開發(Laravel)
  - 資料庫設定與開發(MongoDB)
  - 網域、網站空間提供
  - 網站部署

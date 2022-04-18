---
title: Ubuntu 20.04 安裝新酷音及設定 chewing
date: 2022-04-17 23:00:00
tags: ['linux', '新酷音', 'chewing', 'ubuntu']
catalog: true # Table of Contents (TOC) 快捷鉚釘
sticky: 999
#ExternalLink: 
#showScroll: no
#iframeHight: 17500px
# header-img: ""
---
# Ubuntu 20.04 安裝新酷音及設定 chewing
> 本文編修自： https://medium.com/@scofield44165/ubuntu-20-04%E4%B8%AD%E6%96%B0%E5%A2%9E%E6%96%B0%E9%85%B7%E9%9F%B3%E8%BC%B8%E5%85%A5%E6%B3%95-add-chinese-chewing-in-ubuntu-20-04-5ce78563638b

## 介紹
chewing 是 Jserv 有共同維護的輸入法

## 安裝
* 官網：
    * http://chewing.im/download.html
    * https://github.com/chewing/libchewing/releases
* 根據官網說明，目前主流的 input method system 是安裝 Ibus
    > 現今的主流發行版大多採用IBus輸入法框架，如果有收錄進套件庫的話，請安裝 ibus-chewing 即可。
    1. apt install
    ```
    sudo apt install ibus-chewing
    ```
    2. reboot
    ```
    reboot
    ```
    3. ubuntu settings
    ![](https://i.imgur.com/8wRxYxf.png)

    4. Region & Language -> Input Sources -> click "+" to add new language
    ![](https://i.imgur.com/f3ZGj03.png)

    5. add more icon "…"
    ![](https://i.imgur.com/LNZhmqk.png)

    6. Other
    ![](https://i.imgur.com/55PVMk4.png)

    7. choose "Chinese (Chewing)" and "add"
    ![](https://i.imgur.com/R82X2Cp.png)

    8. check Input Sources add Chinese (Chewing)
    ![](https://i.imgur.com/7zyr84C.png)

    9. some icon show up at right-up corner
    ![](https://i.imgur.com/tTDFMsl.png)
    
    10. Super key (Win key) + Space 進行切換
    ![](https://i.imgur.com/ccb9vN4.png)

## Chewing 設定
![](https://i.imgur.com/7zyr84C.png)
Chewing 右側齒輪為設定紐
1. Maximum chinese characters 記得調到最大 （目前最大是 33）
2. Caps Lock toggles chinese mode 記得取消勾選， 否則大寫鎖定的功能會依預設變成切換語言輸入法 

## 變更輸入法快捷鍵
ubuntu 20.04 預設是 Super key (Win key) + Space
對於非蘋果擁有而言非常不習慣、不方便、不人性的設定，
可以至 ubuntu settings -> keyboard shortcuts -> 找到 `Typing`
然後點選 switch to next input source
可以改成 ctrl + space，但不是任何組合都能改，例如 ctrl + shift 就無效、不給改
下方的返回切換前一個輸入法也會跟著自動變換
 


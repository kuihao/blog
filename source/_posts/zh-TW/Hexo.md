---
title: Hexo 很棒嗎? 靜態網站建置與維護
date: 2022-04-03 13:49:13
tags: ['Hexo']
catalog: true
---
# 靜態網站 Hexo
> Hexo 是靜態網站框架，可以協助作者快速建立專業好看的部落格
> Hexo 的文章使用 markdown 語法撰寫
> [內文參考: 試著學 Hexo](https://israynotarray.com/hexo/20200914/3741834499/)

## 環境建置
1. 安裝 Node.js 環境: [nvm 環境管理](https://github.com/coreybutler/nvm-windows)
    > **NVM**: **N**ode.js **V**ersion **M**anager
2. nvm 安裝 Node.js
    ```shell 
    nvm install latest 64
    ```
3. nvm 啟用 node.js
    * 正常啟動:
        ```
        nvm on
        ```
        顯示以下訊息表示正常啟動:
        ```
        nvm enabled
        Now using node v17.8.0 (64-bit)
        ```
    * **troubleshooting**:
        使用命令 nvm on 或 nvm use latest 64，卻出現:
        ```
        exit status 1: �s���Q�ڡC
        ```
        這是因為[權限不足](https://blog.csdn.net/qq_41715885/article/details/120449480)，請使用管理員權限開啟
4. nvm 啟動之後便可檢視 node.js 版本
    ```
    node --version
    ```
5. nvm 安裝 Hexo
    ```
    npm install -g hexo-cli
    ```
6. 顯示 Hexo version
    ```
    hexo -v
    ```

## 開始 Hexo
1. 建立 Hexo 網站專案
於當前目錄生成 hexo 網站目錄
```
hexo init <myblog: DirName>
```
2. 建立第一篇文章
```
hexo new "first-artical"
```
可於 source/_post 目錄下看到 first-artical.md 生成

## 預覽網誌: Hexo 的編譯、內建 Web Server 等重要指令
> Ref.: [不能忘記的 Hexo 指令](https://israynotarray.com/hexo/20200919/55362084/)
1. 編譯並產生網頁檔案
    ```
    hexo generate
    ```
2. 啟動 Hexo web server
    ```
    hexo server
    ```
3. 其他中止、清除相關指令
    清除暫存檔案: 清除快取檔案 (db.json) 以及編譯檔案 (public)
    ```
    hexo clean
    ```
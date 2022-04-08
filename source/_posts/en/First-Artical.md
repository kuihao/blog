---
title: Is Hexo awesome? Static website construction and maintenance
date: 2022-04-04 11:50:00
tags: Hexo
catalog: true # Table of Contents (TOC) 快捷鉚釘
sticky: 999
---
# Static website **Hexo**
> Hexo is a static website framework that helps authors quickly build professional-looking blogs
> Hexo's articles are written in markdown syntax
> [Reference: Try to learn Hexo](https://israynotarray.com/hexo/20200914/3741834499/)

## Environmental Construction
1. Install [nvm](https://github.com/coreybutler/nvm-windows)
    > **NVM**: **N**ode.js **V**ersion **M**anager
2. nvm install Node.js
    ```shell 
    nvm install latest 64
    ```
3. nvm activate node.js
    * Normal Activation:
        ```
        nvm on
        ```
        The following message is displayed to indicate normal activation:
        ```
        nvm enabled
        Now using node v17.8.0 (64-bit)
        ```
    * **troubleshooting**:
        Use command `nvm on` or `nvm use latest 64`, but show up:
        ```
        exit status 1: �s���Q�ڡC
        ```
        This is due to [insufficient privileges](https://blog.csdn.net/qq_41715885/article/details/120449480), please open it with administrator privileges.
4. View the node.js version after nvm is activated
    ```
    node --version
    ```
5. nvm install Hexo
    ```
    npm install -g hexo-cli
    ```
6. View Hexo version
    ```
    hexo -v
    ```

## Start Hexo
1. Buold Hexo website project
Generate hexo web directory in current directory
```
hexo init <myblog: DirName>
```
2. Create the first article
```
hexo new "first-artical"
```
You can see the first-artical.md generated in the source/_post directory

## Preview blogs: Hexo compilation, built-in Web Server, and other important commands
> Ref.: [The Hexo command you can't forget](https://israynotarray.com/hexo/20200919/55362084/)
1. Compile and generate web files
    ```
    hexo generate
    ```
2. Activate Hexo web server
    ```
    hexo server
    ```
3. Other abort and clear related commands
    Clear cache files: Clear cache files (db.json) and compiled files (public)
    ```
    hexo clean
    ```
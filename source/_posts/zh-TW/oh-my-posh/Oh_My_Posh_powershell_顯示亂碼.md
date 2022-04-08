---
title: Oh My Posh powershell 顯示亂碼
date: 2022-04-05 23:34:00
tags: ['Oh-My-Posh','powershell','顯示亂碼']
catalog: true # Table of Contents (TOC) 快捷鉚釘
#sticky: 999
#ExternalLink: 
#showScroll: no
#iframeHight: 17500px
# header-img: ""
---
# Oh My Posh powershell 顯示亂碼
根據[官方](https://ohmyposh.dev/docs/config-fonts)解法 Steps:
1. 下載 Meslo LGM NF 字型
    > Oh My Posh was designed to use **Nerd Fonts**. Nerd Fonts are popular fonts that are patched to include icons. We recommend [**Meslo LGM NF**](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip), but any Nerd Font should be compatible with the **standard themes**.
2. 開啟 Winsdows Terminal 的 **settings.json**
    ![1](https://i.imgur.com/c0sweJe.png)
    ![2](https://i.imgur.com/0REzlfj.png)
3. 將 powershell 的 font 底下的 face 改成 **"Meslo LGM NF"**
    ![3](https://i.imgur.com/BycczG3.png)
4. 儲存並關閉後，新開一個 powershell terminal 即可看見顯示恢復正常
 
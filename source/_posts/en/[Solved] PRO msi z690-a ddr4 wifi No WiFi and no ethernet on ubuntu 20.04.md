---
title: Solved PRO msi z690-a ddr4 wifi No WiFi and no ethernet on ubuntu 20.04
date: 2022-04-18 13:00:00
tags: ['nwtwork','Z690-A','nowifi','msi','linux','ubuntu']
catalog: true # Table of Contents (TOC) 快捷鉚釘
#sticky: 999
#ExternalLink: 
#showScroll: no
#iframeHight: 17500px
# header-img: ""
---
# \[Solved\] PRO msi z690-a ddr4 wifi No WiFi and no ethernet on ubuntu 20.04
2022/04/18
## Description
Installed ubuntu 20.04 LTS desktop, but Wifi, BlueTooth and wired ethernet all wouldn’t’ work.

## Solved Ethernet
1. Setting IP
2. Download intel `iwlwifi` firmware support linux
    * Download link: https://www.intel.com.tw/content/www/tw/zh/support/articles/000005511/wireless.html
    * Download firmware: 
        * The `MSI PRO Z690-A WIFI DDR4`'s wifi card suppose [AX201](https://www.technextday.co.uk/product/msi-pro-z690-a-wifi-ddr4-12th-generation-intel-atx-motherboard), so download the AX201 firmware:
            | Device | Kernels | Firmware |
            | ------ | ------- | -------- |
            | Intel® Wi-Fi 6 AX201 160MHz | 5.2+ | iwlwifi-Qu-48.13675109.0.tgz |
        * Notice, the `MSI Pro Z690-A WIFI (DDR5) & Z690-A (DDR5)`'s wifi card suppose [AX210](https://www.anandtech.com/show/16970/the-intel-z690-motherboard-overview-over-50-new-models-with-ddr5-support/41)
        * The brainless methoed is download and install all Wi-Fi 6 firmware of `AX210` `AX201` `AX200`
3. Extract the iwlwifi-???.tgz and follow the step of README file in it.
    * open the terminal and copy firmware file into `/lib/firmware`
    E.g.:
        ```linux 
        sudo cp iwlwifi-???.ucode /lib/firmware
        ```
4. reboot
```linux  
reboot
```

5. The ethernet work~ but my wifi still not work...

6. If the method above no work, I had done the step below, I'm not sure which method make it work though.
    * [Update Firmware on Ubuntu](https://itsfoss.com/update-firmware-ubuntu/)
        ```
        sudo apt update && sudo apt upgrade -y
        ```
        ```
        sudo service fwupd start
        ```
        ```
        sudo fwupdmgr refresh
        ```
        ```
        sudo fwupdmgr update
        ```
        ```
        reboot
        ```
        
## other reference:
* https://askubuntu.com/questions/990363/how-to-load-iwlwifi-driver
* https://jianjiesun.medium.com/ubuntu-20-04-intel-ax200-wifi-driver-install-2ac4c0dc4601
* https://askubuntu.com/questions/1340800/wifi-not-working-on-asus-rog-zephyrus-g14-2021
* https://kernel.ubuntu.com/~kernel-ppa/mainline/?C=N;O=D
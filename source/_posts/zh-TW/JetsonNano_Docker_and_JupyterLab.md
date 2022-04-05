---
title: JetsonNano Docker and JupyterLab
date: 2022-04-05 23:33:00
tags: JetsonNano Docker JupyterLab
catalog: true # Table of Contents (TOC) 快捷鉚釘
#sticky: 999
#ExternalLink: 
#showScroll: no
#iframeHight: 17500px
# header-img: ""
---
# JetsonNano Docker and JupyterLab
###### tags: `docker` `Jupyter` `JetsonNano`
'''
本教學參考/翻譯自 Nvidia 線上免費課程(英文教學):
https://courses.nvidia.com/courses/course-v1:DLI+S-RX-02+V2/about
'''
## 名詞解釋:
* DLI: 全名為 Deep Learning Institute，給大專院校教職員提供免費下載的課程教材
* NGC: 全名為 NVIDIA GPU CLOUD，提供深度學習、機器學習和HPC的GPU最佳化應用軟體免費下載，有豐富的 docker image可下載

## usb ip: 192.168.55.1 


## Download Docker And Start JupyterLab
### 應用版:
* Terminal ssh 連線
* 撰寫command執行檔 docker_jupyter_run.sh:
  (實際上仍是使用教程的dli-image，但不掛載鏡頭)
    sudo docker run --runtime nvidia -it --rm --network host \
    --volume ~/nvdli-data:/nvdli-nano/data \
    nvcr.io/nvidia/dli/dli-nano-ai:v2.0.1-r32.5.0
* 重點:
    * 啟動: ./docker_jupyter_run.sh
    * IP and port: <ssh ip>:8888
    * Jupyter 密碼: dlinano
    * 檔案儲存位置: ~/nvdli-data

## 初學者教學版:
* 首先於遠端SSH連線進 Jetson nano
    * win10 開啟 powershell 
        ssh <Jetson Nano user name>@<ip> 

* 建立一個專案資料夾(用來保存docker-container更動的檔案): nvdli-data
    mkdir -p ~/nvdli-data

* 撰寫一個 docker_dli_run.sh 檔案
    echo "sudo docker run --runtime nvidia -it --rm --network host \
        --volume ~/nvdli-data:/nvdli-nano/data \
        --device /dev/video0 \
        nvcr.io/nvidia/dli/dli-nano-ai:v2.0.1-填入L4T版本" > docker_dli_run.sh
    * L4T_version: r32.5.0
    * L4T_version查詢方式
        * [!!!] 輸入: jetson_release 即可
        * 輸入指令查看JetsonNano的版本: cat /etc/nv_tegra_release
            目前得到: # R32 (release), REVISION: 5.1, GCID: 27362550, BOARD: t210ref, EABI: aarch64, DATE: Wed May 19 18:07:59 UTC 2021
            表示版本為: r32 5.1
        * 前往官網查看提供的 docker image 版本: https://ngc.nvidia.com/catalog/containers/nvidia:dli:dli-nano-ai
            * 對應最新版似乎只有 r32.5.0，只好硬裝看看 (一開始誤裝 r32.4.4 結果無法執行)
            * 結果: 幸好可以執行
* 賦予 docker_dli_run.sh 執行權限
    chmod +x docker_dli_run.sh
* 以後要執行這個 docker 就輸入以下指令即可:
    ./docker_dli_run.sh

* Logging Into The JupyterLab Server
    1. Open the following link address: 
        於遠端機器瀏覽器輸入: <ssh ip>:8888
        若是使用 usb 連接筆電，則固定IP為: 192.168.55.1:8888
        * The JupyterLab server running on the Jetson Nano will open up with a login prompt the first time.
    2. Enter the password: dlinano
    3. You will see this screen. Congratulations!


----
old-one: ssh 連線時千萬不可以 reboot，會導致 ssh public key 對不上等可怕問題, vnc關閉(這似乎會堵塞所有連線)
old user: kuihao
password: same as laptop (force change passwd: sudo passwd <username>)
docker中有實驗記錄
安裝 jupyter, password = same as laptop

----
new-one: kuihao
password: same as laptop
剛設定完，並已安裝基本必要套件、設定cuda、swap(應該是設定失敗，要照官方重新設定)

* 調整功耗模式
    * 鎖住功率使其不過載
        sudo jetson_clocks
    * 顯示當前模式
        sudo nvpmodel -q
    *  check the current performance mode, issue:
        $ sudo nvpmodel -q --verbose
    * 預設為高效能模式MAX N模式(10W) (這個功率需要接DC 5V 4A，不然會突然關機)
        sudo nvpmodel -m 0
    * 切換換到 5W 模式(Micro-USB供電)
        sudo nvpmodel -m 1
* 調整swap空間
    * 檢查一些目前系統是否有設定 Swap 空間, 可以用 “swapon -s” 指令
    *  check your memory and swap values with this command:
        free -m
    * If you don't have the right amount of swap, or want to change the value, use the following procedure to do so (from a terminal):
        * 根據某網友實測，設定8G才比較不會當機
        * Disable ZRAM:
        sudo systemctl disable nvzramconfig

        * Create 8GB swap file
        sudo fallocate -l 8G /mnt/8GB.swap
        sudo chmod 600 /mnt/8GB.swap
        sudo mkswap /mnt/8GB.swap

        * Append the following line to /etc/fstab
        [可能失敗]:  sudo echo "/mnt/8GB.swap swap swap defaults 0 0" >> /etc/fstab
        [若失敗則改成開檔改寫]:
            1. sudo nano /etc/fstab
            2. 新增或修改原本的 swap 設定，填入 /mnt/8GB.swap swap swap defaults 0 0
            3. ctrl+s 儲存
            4. ctrl+x 退出

        * REBOOT! (重新啟動才會套用新設定)

        * 檢視更改是否成功:
        free -m
        應會看到多了一行: Swap: total 8191


# docker image:
    * image: L4T 測試 docker on jetson(?)
        * https://ngc.nvidia.com/catalog/containers/nvidia:l4t-base
        #xhost +
        #sudo docker run -it --rm --net=host --runtime nvidia  -e DISPLAY=$DISPLAY -v /tmp/.X11-unix/:/tmp/.X11-unix nvcr.io/nvidia/l4t-base:r32.4.3
        #apt-get update && apt-get install -y --no-install-recommends make g++
        root@nano:/# cp -r /usr/local/cuda/samples /tmp
        root@nano:/# cd /tmp/samples/5_Simulations/nbody
        root@nano:/# make
        root@nano:/# ./nbody
    * Tensorflow (失敗: ARM 硬體版本不合):
        * https://ngc.nvidia.com/catalog/containers/nvidia:tensorflow
            docker pull nvcr.io/nvidia/tensorflow:21.06-tf1-py3
        * Run the container image.
            sudo docker run --gpus all -it --rm -v /home/kuihao/K/DockerData/TensorflowImage:/K/DockerData nvcr.io/nvidia/tensorflow:21.06-tf1-py3
            
            - `-it` means run in interactive mode (以使用者身分進入 bash/container)
            - `--rm` will delete the container when finished
            - `-v` is the mounting directory
            - `local_dir` is the directory or file from your host system (absolute path) that you want to access from inside your container.  For example, the `local_dir` in the following path is `/home/jsmith/data/mnist`.  

            ```
            -v /home/jsmith/data/mnist:/data/mnist
            ```
            
            If you are inside the container, for example, `ls /data/mnist`, you will see the same files as if you issued the `ls /home/jsmith/data/mnist` command from outside the container.
            
            - `container_dir` is the target directory when you are inside your container.  For example, `/data/mnist` is the target directory in the example:
            
            ```
            -v /home/jsmith/data/mnist:/data/mnist
            ```
            
            - `xx.xx` is the container version. For example, `20.01`.
            - `tfx` is the version of TensorFlow. For example, `tf1` or `tf2`.
        * TensorFlow is run by importing it as a Python module:
            $ python
            >>> import tensorflow as tf
            >>> print(tf.__version__)
    * L4T 版本的 Tensorflow:
        * https://ngc.nvidia.com/catalog/containers/nvidia:l4t-tensorflow
            docker pull nvcr.io/nvidia/l4t-tensorflow:r32.5.0-tf2.3-py3
        * Running the Container:
            (X) sudo docker run -it --rm --runtime nvidia --network host nvcr.io/nvidia/l4t-tensorflow:r32.5.0-tf1.15-py3
        * Running the Container && Mounting Directories from the Host Device:
            * Tensorflow 1.15:
                sudo docker run -it --rm --runtime nvidia --network host -v /home/kuihao/K/DockerData/TF1Image:/K/DockerData nvcr.io/nvidia/l4t-tensorflow:r32.5.0-tf1.15-py3
            * Tensorflow 2.3:
                sudo docker run -it --rm --runtime nvidia --network host -v /home/kuihao/K/DockerData/TF2Image:/K/DockerData nvcr.io/nvidia/l4t-tensorflow:r32.5.0-tf2.3-py3
    * docker container 指令:
        * https://ithelp.ithome.com.tw/articles/10191634
        * --restart=always：如果 container 遇到例外的情況被 stop 掉，例如是重新開機，docker 會試著重新啟動此 container
        * --name=<name>：設定 container 的 name 為 <name>
        * [日常執行重複使用container]  
            * 建立:
            sudo docker run -it --runtime nvidia --restart=always --network host -v /home/kuihao/K/DockerData/TF2Image:/K/DockerData --name contain_TF2 nvcr.io/nvidia/l4t-tensorflow:r32.5.0-tf2.3-py3
            * 日後進入:
            sudo docker exec -it contain_TF2 bash
            * 刪除 container:
            sudo docker rm <container ID or name>
        * 更多 docker 指令:
            * https://docs.docker.com/cloud/aci-integration/
            * https://ithelp.ithome.com.tw/articles/10191727

* 取得 abslute path
    readlink -f file.txt

* 風扇控制 (可撰寫開機自動啟動):
    * https://blog.cavedu.com/2019/10/04/nvidia-jetson-nano-fan/
    * 自訂風速 0~255，設為 0 就關閉風扇:
        sudo sh -c 'echo 100 > /sys/devices/pwm-fan/target_pwm'
    * 更佳的選擇 (已安裝) https://github.com/Pyrestone/jetson-fan-ctl

* 監測 jetson nano 溫度:
    * https://www.programmersought.com/article/25313505100/
        sudo jtop 
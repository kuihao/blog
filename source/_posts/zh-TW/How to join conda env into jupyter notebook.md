---
title: How to join conda env into jupyter notebook
date: 2022-04-18 14:00:00
tags: ['jupyter', 'conda', 'liunx', 'JupyterLab', 'JupyterNotebook', 'ipykernel']
catalog: true # Table of Contents (TOC) 快捷鉚釘
sticky: 999
#ExternalLink: 
#showScroll: no
#iframeHight: 17500px
# header-img: ""
---
# How to join conda env into jupyter notebook
來源:
1. [ref. medium](https://medium.com/@nrk25693/how-to-add-your-conda-environment-to-your-jupyter-notebook-in-just-4-steps-abeab8b8d084)
2. [ipython doc](https://ipython.readthedocs.io/en/stable/install/kernel_install.html)
3. https://jupyter.org/install

---

## 安裝 Jupyter (Jupyter Lab, Jupyter Notebook) 
首先要有安裝 jupyter notebook/lab，兩者挑一個安裝即可，
我建議用 conda 建一個只用來建制 Jyputer Server 的環境, 以方便管理
(anaconda 已內建、miniconda 要自己裝)

### Jupyter Notebook (類似 google colab)
install the classic Jupyter Notebook
```
pip install notebook
```
To run the notebook:
```
jupyter notebook
```
### JupyterLab (有整合 command line)
Install JupyterLab with pip:
```
pip install jupyterlab
```
To run JupyterLab:
```
jupyter-lab
```
---

可透過已下命令，可於任意虛擬環境查看目前 jupyter 已連動的 kernel
```bash 
jupyter kernelspec list
```

## 將指定的 comda python 環境加進 jupyter kernel
1. Create a Conda environment.
```bash  
conda create --name <myenv>
```
or [create a tensorflow with gpu env](https://docs.anaconda.com/anaconda/user-guide/tasks/tensorflow/):
```bash 
conda create -n <myenv-gpu> python=<version> tensorflow-gpu
```
2. Activate \<myenv\>
```bash 
conda activate <myenv>
```
install any package you need in this environment.
```bash 
pip install <package>
```
3. Set this conda environment on your jupyter notebook, to do so please install ipykernel. <mark>(install in this myenv)</mark>
```bash 
conda activate myenv # `source activate myenv` in linux, 若已開啟 myenv 則不用這行
conda install pip
conda install ipykernel # or pip install ipykernel
```
可透過已下命令，可查看目前虛擬環境允許被 jupyter 連動 (當啟動 jyputer notebook 會自動帶入此環境為 jyputer kernel)
```bash 
jupyter kernelspec list
```
4. Install a `Python environment Kernel` in a myenv.
```bash 
conda activate myenv # `source activate myenv` in linux, 若已開啟 myenv 則不用這行 
python -m ipykernel install --user --name <this-myenv-name> --display-name "name-you-want-show-in-notebook"
```
當然，你也可以為其他虛擬環境增加 ipykernel (使 jupyter notebook 可以使用此 env 作為 kernel)
```bash 
conda activate other-env # `source activate other-env` in linux, 若已開啟 myenv 則不用這行 
python -m ipykernel install --user --name <this-env-name> --display-name "Python (other-env)"
```
---

移除 ipykernel
* 列出目前 jupyter 追蹤的虛擬環境與其路徑 (光是刪除 conda env 是無效的，還必須將其從清單中移除)
```linux 
jupyter kernelspec list
```
移除對應的 env-name
```linux 
jupyter kernelspec remove <myenv>
```
---
title: Sigmoid 推導至 Softmax
date: 2022-04-05 12:52:00
tags: sigmoid softmax
catalog: true # Table of Contents (TOC) 快捷鉚釘
sticky: 999
ExternalLink: https://hackmd.io/@Kuihao/Softmax_Derive
showScroll: no
iframeHight: 5500px
# header-img: ""
---
# Sigmoid 推導至 Softmax

* **假設**
    * 令 Classes 數量: C
* **Softmax**: 
    * 說明: **將C個實數轉換成 Multi-classes 的機率分佈，可由Sigmoid推廣而成**
    * 功能1: 輸入 C 個數值，輸出分數總和為 1 (即機率)
    * 功能2: exp() 可以使數值差距加大
    * **數學式:** 機率 = Softmax( C 個數值 )
        * $\sigma(x)_j = \dfrac{e^{x_j}}{\sum_{i=1}^{C}e^{x_i}}\\where \ j = 1,...,C.$
    * **條件機率意義:** 樣本向量 x 屬於第 j 個分類的機率
        * $P(y=j|x) = \dfrac{e^{x_j}}{\sum_{i=1}^{C}e^{x_i}}\\where \ j = 1,...,C.$
* **Sigmoid**:
    * 本身功能1: 將實數轉換成 [0,1] 之間的實數
    * 本身功能2: exp(x) 可以使數值差距加大，並使x趨近零的時候，Sigmoid(x)的斜率增大
    * 本身功能3: 本身是連續型函數，可以微分
    * 說明: **將2個實數轉換成 Binary-classes 的機率分佈**
    * 
    * 功能1: 輸入 2 個數值，輸出分數總和為 1 (即機率)
    * 功能2: exp() 可以使數值差距加大
        * **數學式:** 機率 = Sigmoid( x )
            * $\sigma(x) = \dfrac{1}{1+e^{-x}}$
        * 理論上 Binary classes 轉換應為:
            * $\sigma(x)_j = P(y=j|x=a) = \dfrac{1}{1+e^{-(a-b)}} \\ where \ j = {a,b}$
* **Sigmoid推導**
    * 核心想法1: 設計一個類似階層函數的連續型邏輯函數，(類似電波學的脈衝信號)，推測性質有:
        1. 將線性函數轉變成非線性
        2. 疊加多個脈衝信號，(傅立葉的概念)，理論上可以產生各種函數變化
        3. 限制數值在 [0,1]，並明確描述信號的有與無
    * 核心想法2: 輸出 [0,1] 之間，可以視為一種機率分布
    * 核心想法3: 可以計算兩個輸入數值之間的比率 (Ratio)，並 Ratio 總和為 1，象徵其機率關係
    * **推導自: 兩輸入數值 a,b 之比率關係 (a 在 a,b 兩者總和之中所佔有的量)，$a:b => R = \dfrac{a}{a+b}$**
    * **Claim: $\sigma(x) = \dfrac{1}{1+e^{-x}}$** 
    * **將原式的變數先取標準指數 exp(.)，則兩變數仍存在一個比率關係，只是 $e^a$, $e^b$ 兩者的比例較 a:b 更加懸殊。** PS. exp(.) 是微分等於自己 $[e^x]'=e^x$，負數趨近0且斜率逐漸平緩、正數趨近無窮且斜率逐漸陡峭。
        * 得 $\dfrac{e^a}{e^a+e^b}$
    * 分數的性質是上下可同時提出一個公因數使之化簡，**將此推廣，我們可以上下同除 $e^b$** (對此Ratio用 $e^b$做標準化__Normalize with $e^b$)
        * 得 $\dfrac{\dfrac{e^a}{e^b}}{\dfrac{e^a+e^b}{e^b}} = \dfrac{\dfrac{e^a}{e^b}}{\dfrac{e^a}{e^b}+\dfrac{e^b}{e^b}} = \dfrac{e^{a-b}}{e^{a-b}+e^0} = \dfrac{e^{a-b}}{e^{a-b}+1}$
    * **令 x = a-b**
        * 得 $\sigma(x)=\dfrac{e^{x}}{e^{x}+1}$
        * ==這就是 sigmoid 的第一種型態==
    * 但這作為函數不好看，可以再簡化，用上一步的方法，**Ratio再用 $e^x$ 做標準化 (Normalize with $e^x$)**
        * 得 $\sigma(x)=\dfrac{1}{1+e^{-x}}$
        * ==這就是最常見的 sigmoid 的第二種型態==
* **Sigmoid 的意義**
    * 解釋 Sigmoid 的意義要從第一型態來說明，先將 $e^x$ 視為一個正實數 N，則**函數意義就是「給出 N 與 1 之間的比率」**
    * 則應用到深度學習就會有些奇怪，Sigmoid 是 Binary Classifier (Logistic Regression) 的輸出，既然是二元分類，則兩相比較的變數應該是 $e^a$ 與 $e^b$，若要使用 $\sigma(x)=\dfrac{e^{x}}{e^{x}+1}$，則應輸入 x = a-b，先進行標準化轉換，如此一來 $\sigma(x)$ 的輸出才會是二元機率分布。
    * 但實際上，也許不必特地做這件事情，由於神經網路其實就是線性轉換，我們可以期待神經網路透過梯度下降可以學會將權重值包含做正規化這件事情，畢竟只要讓輸入值減去一個 bias，這應該並非難事，*~~或是可以嘗試直接設 bias 就是 -b (?)~~*。
* **推廣至 Softmax**
    * 由 Sigmoid 推導過程可知，binary condition probility 應寫成:
        * $P(y|x) = \sigma(x) = \dfrac{e^{x}}{e^a+e^b} \\ 
            where \ 
            x = \{a,b\}, \
            y= 
            \begin{cases} 
                1, \quad belong \ to \ class \ 1 \\ 
                0, \quad belong \ to \ class \ 2
            \end{cases}$
        * $\dfrac{e^{x}}{e^a+e^b}$ 可以改寫成 $\dfrac{e^{x_j}}{\sum_{i=1}^{2}e^{x_i}} \\ 
            where \ x_j = \{a,b\}, \ x_1 = a, \ x_2 = b$
        * 當分類不止兩類，而是 C 類，便得到 Softmax 函數：
            * $\sigma(x)_j = \dfrac{e^{x_j}}{\sum_{i=1}^{C}e^{x_i}}\\where \ j = 1,...,C.$

## 補充
* ==**Softmax with predicted-label smoothing** (控制Softmax標籤平滑化程度)==
    * 公式:
        * $\sigma(x)_j = \dfrac{e^{(x_j/\tau)}}{\sum_{i=1}^{C}e^{(x_i/\tau)}}\\where \ j = 1,...,C.$ $\tau$ is called a temperature parameter (溫度參數) and $\infty \gt \tau \gt 0$
    * 當 $\tau$ 越大，則所有類別的輸入值燈會變得越趨近 0，反應在標準指數的輸出就會越趨近 1，最後所有類別的 Softmax 輸出都會接近[等分](https://pedia.cloud.edu.tw/Entry/Detail/?title=%E7%AD%89%E5%88%86)。
    * 在 Reinforcement learning 稱為 Action probabilities function
    * 在 Knowledge distillation 為產生 Soft-label 的方法 (~~可解釋為蒸餾?~~) 
* **Logit Function** ([羅吉特函數](https://terms.naer.edu.tw/search/?q=Logit&field=ti&op=AND&group=&num=10))
    * ==**[Logit Function](https://en.wikipedia.org/wiki/Logit) 並不是指 Logistic Regression!!!**==
    * **Logit Function 就是 Sigmoid Function 的反函數 (Inverse)**
    * 公式:
        * $\begin{split}
            logit(p) &= \sigma^{-1}(p) \\
            &= \ln(\dfrac{p}{1-p}) \\
            &= \ln(p) - \ln(1-p) \\
            &= -ln(\frac{1}{p}-p) \\
            &for \ p \in [0,1]
            \end{split}$
    * 這個名稱常常出現在 Tensorflow 的 Loss Function中，例如:
        * from_logits
        ```python=
        tf.keras.losses.CategoricalCrossentropy(
            from_logits=False, label_smoothing=0.0, axis=-1,
            reduction=losses_utils.ReductionV2.AUTO,
            name='categorical_crossentropy'
        )
        ```
        * logits
        ```python=
        tf.nn.sigmoid_cross_entropy_with_logits(
            labels=None, logits=None, name=None
        )
        ```
    * [官方解釋:](https://www.tensorflow.org/api_docs/python/tf/nn/softmax_cross_entropy_with_logits) 
        * Per-label activations, typically a linear output. These activation energies are interpreted as **unnormalized log probabilities**.
    * 其實 Tensorflow 的意思就是將尚未套用 Sigmoid 系列 Activation 的 Tensor，都稱其為 Logits tensor。例如:
        ```python=
        out = tf.keras.layers.Dense(n_units)  # <-- linear activation function
        ```
    
    * 當 CategoricalCrossentropy 設定 from_logits=True，函式會幫你把輸入 Tensor 補通過一個 Softmax Function，使 Tensor 轉成機率。當然預設為 False，表示預期你輸入的 Tensor 已經是 probability distribution。([相關連結](https://datascience.stackexchange.com/questions/73093/what-does-from-logits-true-do-in-sparsecategoricalcrossentropy-loss-function))
    * 由下圖可知 logit 就是 sigmoid 反函數，即未套用 sigmoid 的輸入值。
        * <iframe src="https://www.geogebra.org/calculator/mzyjrsjs?embed" width="800" height="600" allowfullscreen style="border: 1px solid #e4e4e4;border-radius: 4px;" frameborder="0"></iframe>

* CrossEntropy
![](https://i.imgur.com/TJMABwq.png)


###### tags: `sigmoid` `softmax` `logits` `temperature` `soft-label` `softmax推導` `CrossEntropy` `entropy`
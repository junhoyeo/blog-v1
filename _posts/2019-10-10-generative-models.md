---
layout: post
title: "OpenAI Releases #1 생성 모델(Generative Models)"
on_progress: true
tag:
  - OpenAI
  - translation
---

시간 날 때마다 ML에 대한 지식도 배우고 방치된 블로그도 살릴 겸 [OpenAI 마일스톤 릴리즈](https://openai.com/progress/#releases)에 있는 포스트들을 하나씩 번역해보려고 합니다. 첫 번째 포스트, 2016년 6월 16일에 나온 [Generative Models](https://openai.com/blog/generative-models/)로 시작하겠습니다. 오역이나 부자연스러운 번역이 있을 수 있으니 양해해 주시면 감사하겠습니다. 또한, 누구나 이해할 수 있는 글을 쓰는 것이 목표기 때문에 세부적인 설명이나 자료를 따로 추가하게 될지도 모릅니다. 잘못된 내용이 있다면 제게 꼭 연락주세요! 😉

# Generative Models
이 포스트는 [비지도학습(Unsupervised Learning)](https://www.quora.com/What-is-the-difference-between-supervised-and-unsupervised-learning-algorithms) 머신 러닝의 한 부문인 생성 모델을 이용하거나 향상시키는 것을 공통 주제로 하는 네 개의 프로젝트들을 다룹니다. 단순히 OpenAI의 성과를 서술하는 것 말고도, 이 포스트는 여러분에게 생성 모델에 대해서 더 알려줄 수 있을 것입니다: 생성 모델이 무엇인지, 왜 중요한지, 그리고 어디로 가고 있는지 같은 질문들에 대한 대답이죠.

-----

OpenAI의 핵심 포부 중 하나는 컴퓨터에게 우리 세계에 대한 이해를 부여하는 알고리즘과 기술을 개발하는 것입니다.

우리가 세상에 대해서 얼마나 알고 있는지를 잊어버리는 것은 쉽습니다. 여러분은 세상이 3D 환경으로 되어 있다는 것을 이해하고 있습니다. 움직이고, 충돌하고, 상호작용하는 사물들; 걷고, 말하고, 생각하는 사람들; 지나가고, 날고, 뛰거나 짖는 동물들; 오늘 날씨가 어떤지와 누가 농구 경기를 이겼는지, 1970년에 어떤 일들이 일어났는지에 대한 정보들이 언어라는 형식으로 인코딩된 채로 나타나는 모니터들.

이렇게 세상에는 엄청난 양의 정보가 존재하고, 원자들의 물리적 세계나 비트로 된 디지털 세계 모두에서 쉽게 접근할 수 있습니다. 유일하게 까다로운 점이 있다면, 데이터를 이해하고 분석할 모델과 알고리즘들을 개발하는 것이겠지요.

**생성 모델(Generative models)은 우리의 목표에 대한 가장 유망한 연구 중 하나입니다.** 생성 모델을 학습시키기 위해서 우리는 먼저 하나의 분야에서 많은 양의 데이터를 수집합니다(백만 개의 이미지, 문장, 음성 등을 생각해 보세요). 그 뒤 모델이 그와 유사한 데이터를 생성하도록 학습시킵니다. 이 접근에 사용되는 직관은 [리처드 파인만(Richard Feynman)](https://ko.wikipedia.org/wiki/리처드_파인만)의 명언을 따릅니다. 

> "내가 만들어 낼 수 없다면, 이해하지 못한 것이다."

우리가 생성 모델로 사용하는 뉴럴 네트워크는 우리가 사용하는 학습 데이터의 양보다 현저히 작은 수의 파라미터를 지니기 때문에, 생성 모델은 데이터를 생성하기 위해 그 본질을 찾고 내면화하도록 강제되는 것입니다.

생성 모델은 많은 단기적인 응용프로그램들로 이루어져 있습니다. 그러나 장기적으로 이들은 데이터셋의 자연적인 특징들을 자동으로 배울 수 있는 잠재력을 가지고 있습니다. 

## 이미지 생성하기
이제 예시를 통해 이걸 좀 더 구체적으로 살펴봅시다. 우리가 많은 양의 이미지의 모음을 가지고 있다고 합시다. ImageNet 데이터셋에 있는 120만 개의 이미지처럼요(하지만 결국에는 인터넷이나 로봇에서 얻은 많은 양의 사진 또는 동영상이 될 수 있다는 것도 생각해 보세요). 각각의 이미지를 가로 세로 256픽셀로 줄였다고 한다면(일반적으로도 흔하게 발생하죠), 우리의 데이터셋은 `1,200,000x256x256x3`개의 픽셀 블록으로 이루어져 있습니다. 약 200GB 정도 되는 양이네요. 아래는 이 데이터셋에 있는 몇 개의 이미지들입니다:

![example images of the dataset](/blog/assets/images/posts/20191010/gen_models_img_1.jpg)

> 세상은 넓고 별별 이미지는 많다.

이 이미지들은 우리의 세상이 어떻게 생겼는지를 보여줍니다. 즉 *실제 데이터 분포에서 추출한 샘플*이라고도 할 수 있죠. 우리는 이제 이런 이미지를 밑바닥부터 생성하도록 학습시킬 생성 모델을 만들 겁니다. 조금 더 구체적으로 말하자면, 이 경우에서 생성 모델은 *모델에서의 샘플*이라고 하는 이미지를 출력하는 하나의 커다란 뉴럴 네트워크가 되겠지요.

<div class="comment">
  <h1>
    <i class="fas fa-bookmark"></i>
    북마크
  </h1>
  <strong>Samples from the true data distribution</strong>을 어떻게 번역해야 할지 찾아보던 도중, 몇 가지 재미있는 글들을 보게 되었습니다.
  <ul>
    <li><a href="https://towardsdatascience.com/do-gans-really-model-the-true-data-distribution-or-are-they-just-cleverly-fooling-us-d08df69f25eb">
      Do GANs really model the true data distribution, or are they just cleverly fooling us? - Gal Yona
    </a></li>
    <li><a href="https://stats.stackexchange.com/questions/254303/is-the-machine-learning-community-abusing-true-distribution">
      Is the machine learning community abusing "true distribution"? - weakmoons
    </a></li>
  </ul>
</div>

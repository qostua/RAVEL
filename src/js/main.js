let banner = document.querySelector('.promo__banner');
let slogans = document.querySelectorAll('.promo__slogan');
let bannerBtnNext = document.querySelector('.promo__pag-btn--right');
let bannerBtnPrevious = document.querySelector('.promo__pag-btn--left');
let pagNumber = document.querySelector('.promo__pag-number');

let slideNum = slogans.length;

let getCurrentNum = function() {
  for (let i = 1; i <= slideNum; i++) {
    let bannerClass = 'promo__banner--' + i;
    if (banner.classList.contains(bannerClass)) {
      return i;
    };
  }
}

let makeBannerClass = function(num) {
  return ('promo__banner--' + num);
}
let currentNum = getCurrentNum();

bannerBtnPrevious.onclick = function() {
  if (currentNum > 1) {
    bannerBtnPrevious.classList.remove('btn--pag-disable');
    banner.classList.remove(makeBannerClass(currentNum));
    banner.classList.add(makeBannerClass(currentNum - 1));
    currentNum--;
    pagNumber.textContent = '0' + currentNum;
  }
  if (currentNum == 1) {
    bannerBtnPrevious.classList.add('btn--pag-disable');
  }
  if (currentNum < 3) {
    bannerBtnNext.classList.remove('btn--pag-disable');
  }
};

bannerBtnNext.onclick = function() {
  if (currentNum < 3) {
    bannerBtnNext.classList.remove('btn--pag-disable');
    banner.classList.remove(makeBannerClass(currentNum));
    banner.classList.add(makeBannerClass(currentNum + 1));
    currentNum++;
    pagNumber.textContent = '0' + currentNum;
  }
  if (currentNum == 3) {
    bannerBtnNext.classList.add('btn--pag-disable');
  }
  if (currentNum > 1) {
    bannerBtnPrevious.classList.remove('btn--pag-disable');
  }
};

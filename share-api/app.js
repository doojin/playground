function makeShareable(articleElement) {
  if (navigator.share) {
    function share(articleElement) {
      navigator.share({
        title: articleElement.querySelector('h1').innerText,
        text: articleElement.querySelector('p').innerText,
        url: window.location.href
      });
    }

    function createShareButton() {
      const shareButton = document.createElement('button');
      shareButton.insertAdjacentText('afterbegin', 'Share');
      shareButton.classList.add('share-button');
      return shareButton;
    }

    const shareButton = createShareButton();
    shareButton.addEventListener('click', () => share(articleElement));
    articleElement.insertAdjacentElement('afterbegin', shareButton);
  }
}

[...document.querySelectorAll('article')].forEach(makeShareable);
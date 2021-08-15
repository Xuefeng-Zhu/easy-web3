window.addEventListener('DOMContentLoaded', () => {
  /*----------------------------------
Smooth scroll to sections
------------------------------------*/
  let allAnchors = document.querySelectorAll('a[href^="#"]');
  const listenAllA = (alllinks) => {
    if (!alllinks) return;
    alllinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        if (!link.href.includes('#')) {
          if (link.target) {
            window.open(link.href, '_blank');
            return;
          }
          window.location.href = link.href;
          return;
        }
        e.preventDefault();
        if (!link.hash.substring(1)) return;
        const targetSection = document.querySelector(
          'section#' + link.hash.substring(1)
        );
        let goTo = targetSection.offsetTop;
        window.scrollTo({ top: goTo - 100, behavior: 'smooth' });
      });
    });
  };

  listenAllA(allAnchors);
});

window.addEventListener('unlockProtocol.status', function (event) {
  // We hide all .unlock-content elements
  document.querySelector('.unlock-content').style.display = 'none';
  // We show only the relevant element
  document
    .querySelectorAll(`.unlock-content.${event.detail.state}`)
    .forEach((element) => {
      element.style.display = 'block';
    });
});

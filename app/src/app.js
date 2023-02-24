const server = "http://localhost:8080";


function initObserverSelectNavbar() {
  const [vectorSkull, vectorClock] = document.querySelectorAll('.navbar__vector--hidden');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar__buttons-link')

  function activeSectionHandler(currentSectionId) {{
    navLinks.forEach((link) => {
      if (link.dataset.section === currentSectionId) {
        link.classList.add('navbar__buttons-link--active');

        if (currentSectionId === 'landing' || currentSectionId === 'history') {
          vectorSkull.classList.add('navbar__vector--show');
        } else vectorSkull.classList.remove('navbar__vector--show');

        if (currentSectionId === 'discography') {
          vectorClock.classList.add('navbar__vector--show');
        } else vectorClock.classList.remove('navbar__vector--show');

        return;
      }
      link.classList.remove('navbar__buttons-link--active');
    });

  }};

  function sectionWatcherCallback(section, sectionWatcher) {
    section.forEach((section) => {
      if (!section.isIntersecting) return;
      activeSectionHandler(section.target.id);
    });
  }

  const sectionWatcherOptions = { threshold: 0.3, rootMargin: '0px' };
  const sectionWatcher = new IntersectionObserver(sectionWatcherCallback, sectionWatcherOptions);

  sections.forEach((section) => sectionWatcher.observe(section));
}

function initObserverFadeSections() {
  const hiddenElements = document.querySelectorAll('.element--hidden');

  const observerElem = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('element--show');
      } else {
        entry.target.classList.remove('element--show');
      }
    });
  });

  hiddenElements.forEach((elem) => observerElem.observe(elem));
}

function fetchImages(imagesToLoad) {
  return new Promise((resolve, reject) => {
    Promise.all(imagesToLoad.map((image) => fetch(`${server}/api/image/${image.src}`)))
    .then((imagesResponse) => {
      return imagesResponse.map(image => image.blob());
    })
    .then((imagesFiles) => {
      return Promise.all(imagesFiles);
    })
    .then((files) => {
      resolve(imagesToLoad.map((image, index) => ({
        id: imagesToLoad[index].id,
        file: files[index]
      })));
    })
    .catch((err) => reject(err));
  });
}

function lazyLoadingImages() {
  const layout = document.getElementById('layout');
  const loader = document.getElementById('loader');
  layout.classList.add('layout--hide');

  const imagesToLoad = [
    { id: "album-after-chabon", src: "album-after-chabon.jpg" },
    { id: "album-corpinio-en-la-madrugada", src: "album-corpinio-en-la-madrugada.jpg" },
    { id: "album-divididos-por-la-felicidad", src: "album-divididos-por-la-felicidad.jpg" },
    { id: "album-fiebre", src: "album-fiebre.jpg" },
    { id: "album-llegando-los-monos", src: "album-llegando-los-monos.jpg" },
    { id: "album-perdedores-hermosos", src: "album-perdedores-hermosos.jpg" },
    { id: "album-time-fate-love", src: "album-time-fate-love.jpg" },
    { id: "background-grunge-landing", src: "background-grunge-landing.jpg" },
    { id: "background-grunge-sections", src: "background-grunge-sections.jpg" },
    { id: "history-singing-guitar", src: "history-singing-guitar.jpg" },
    { id: "landing-band-playing", src: "landing-band-playing.jpg" },
    { id: "sumo-members", src: "sumo-members.jpg" },
    { id: "luca-jamaica-no-problem", src: "luca-jamaica-no-problem.jpg" },
    { id: "background-grunge-footer", src: "background-grunge-footer.jpg" }
  ];

  fetchImages(imagesToLoad)
  .then((imagesResponse) => {
    return Promise.all(imagesResponse);
  })
  .then((imagesFiles) => {
    for (let imageFile of imagesFiles) {
      const imgCollection = document.getElementsByClassName(imageFile.id);

      if (!(imgCollection.length > 0)) continue;

      for (let i=0; i < imgCollection.length; i++) {
        if (imgCollection[i]) {
          const url = URL.createObjectURL(imageFile.file);
          imgCollection[i].src = url;
        }
      }
    }
  })
  .catch(err => console.error(err))
  .finally(() => {
    loader.classList.add('loader--hide');
    layout.classList.remove('layout--hide');
    layout.classList.add('layout--unhide');
  });
}

function shimmerLandingAnimation() {
  const image = document.getElementById('image-shimmer-anim');
  const label = document.getElementById('label-shimmer-anim');
  let triggerImage = 0;
  let triggerLabel = 0;

  function intervalCallback(image, label) {
    if (triggerImage === 6) {
      image.classList.add('landing__bottom-image--hide');
      triggerImage = 0;
    } else image.classList.remove('landing__bottom-image--hide');

    if (triggerLabel === 6) label.innerHTML = "luca";
    else if (triggerLabel === 12) label.innerHTML = "not";
    else if (triggerLabel === 18) label.innerHTML = "dead";
    else if (triggerLabel === 24) triggerLabel = 0;

    triggerLabel += 1;
    triggerImage += 1;
  }

  setInterval(intervalCallback, 400, image, label);
}

lazyLoadingImages();
initObserverFadeSections();
initObserverSelectNavbar();
shimmerLandingAnimation();

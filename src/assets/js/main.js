$('.our-work-slider').slick({
    slidesToShow: 3,
    prevArrow: '.left-arrow',
    nextArrow: '.right-arrow',
    slidesToScroll: 3,
    infinite: true,
    dots: false,
    responsive: [{
        breakpoint: 992,
        settings: {
          prevArrow: '.left-arrow',
          nextArrow: '.right-arrow',
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          prevArrow: '.left-arrow',
          nextArrow: '.right-arrow',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420,
        settings: {
          prevArrow: '.left-arrow',
          nextArrow: '.right-arrow',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
$('.genrative-ai-slider').slick({
    slidesToShow: 3,
    prevArrow: '.left-arrow-1',
    nextArrow: '.right-arrow-1',
    slidesToScroll: 3,
    infinite: true,
    dots: false,
    responsive: [{
        breakpoint: 992,
        settings: {
          prevArrow: '.left-arrow-1',
          nextArrow: '.right-arrow-1',
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          prevArrow: '.left-arrow-1',
          nextArrow: '.right-arrow-1',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420,
        settings: {
          prevArrow: '.left-arrow-1',
          nextArrow: '.right-arrow-1',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  const video = document.getElementById('video');
    video.controls = false;
    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
    
    window.addEventListener('load', () => {
      playButton.style.opacity = '0';
      pauseButton.style.opacity = '0';
  });

    let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.getElementById('nav');
  const heroHeight = document.querySelector('m-heading');

  if (currentScrollPos > heroHeight + 2) {
    if (currentScrollPos < prevScrollPos && currentScrollPos > 100) {
      navbar.classList.add('absolute');
      navbar.style.transition="0s";
    }
    else {
      navbar.classList.remove('absolute')
    }
    if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
      navbar.style.top="-100px";
      navbar.style.transition="0.5s";

    }
    else {
      navbar.style.top="0px";
    }
  }
    else if (currentScrollPos < 100) {
      navbar.classList.remove('absolute')
    }
  prevScrollPos = currentScrollPos;
});

const customContextMenu = document.getElementById('customContextMenu');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');

video.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  customContextMenu.style.display = 'flex';
  customContextMenu.style.left = `${e.pageX}px`;
  customContextMenu.style.top = `${e.pageY}px`;
});

document.addEventListener('click', () => {
  customContextMenu.style.display = 'none';
});

////////////////////////////////////////////////


let playTimeout;
let pauseTimeout;

const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');

function clearTimeouts() {
    if (playTimeout) {
        clearTimeout(playTimeout);
        playTimeout = null;
    }
    if (pauseTimeout) {
        clearTimeout(pauseTimeout);
        pauseTimeout = null;
    }
}

video.addEventListener('play', () => {
  pauseButton.style.transform = 'scale(1)';
    clearOpacityTimeouts();
    playButton.style.opacity = '1';
    playButton.style.transform = 'scale(1.3)';
    playButton.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
    playTimeout = setTimeout(() => {
        playButton.style.opacity = '0';
    }, 300);
   
    
});

video.addEventListener('pause', () => {
  playButton.style.transform = 'scale(1)';
    clearOpacityTimeouts();
    pauseButton.style.opacity = '1';
    pauseButton.style.transform = 'scale(1.3)';
    pauseButton.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
    pauseTimeout = setTimeout(() => {
        pauseButton.style.opacity = '0';
    }, 300);
});


function clearOpacityTimeouts() {
    if (playTimeout) {
        clearTimeout(playTimeout);
        playTimeout = null;
        playButton.style.opacity = '0';
    }
    if (pauseTimeout) {
        clearTimeout(pauseTimeout);
        pauseTimeout = null;
        pauseButton.style.opacity = '0';
    }
}



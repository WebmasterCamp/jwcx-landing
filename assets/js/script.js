// connect to firebase
var config = {
  apiKey: "AIzaSyBNxcnU0P4XyuwybfISGtYasiEZbzpgV1A",
  authDomain: "jwcx-196915.firebaseapp.com",
  projectId: "jwcx-196915",
};

firebase.initializeApp(config);
var db = firebase.firestore();

$(document).ready(function() {
  // timer
  var timeEnd = new Date();
  timeEnd.setHours(23);
  timeEnd.setMinutes(59);
  timeEnd.setSeconds(59);
  
  function updateTimer() {
    var timeNow = new Date();
    var timer = (timeEnd.getTime() - timeNow.getTime()) / 1000;
    var hours = Math.floor(timer / 3600);
    var minutes = Math.floor((timer - hours * 3600) / 60);
    var seconds = Math.floor(timer - hours * 3600 - minutes * 60);
    $('#timer_hour').text(hours);
    $('#timer_minute').text(minutes);
    $('#timer_second').text(seconds);
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
  
  var close = true;
  // mobile navigation bar
  $('.nav-menu').click(function() {
    if (close === true) {
      $('.nav-menu').html('<i style="color: black;" class="fa fa-times"></i>');
      $('.nav-backdrop').fadeIn(100);
    } else {
      $('.nav-menu').html('<i class="fa fa-bars"></i>');
      $('.nav-backdrop').fadeOut(100);
    }
    close = !close;
    $('.menu').toggleClass('disabled');
  });
  $('.nav-backdrop').click(function() {
    close = true;
    $('.nav-menu').html('<i class="fa fa-bars"></i>');
    $('.nav-backdrop').fadeOut(100);
    $('.menu').toggleClass('disabled');
  })
  
  // navigation bars
  $('.menu-link').click(function(e) {
    $('html, body').animate({
      scrollTop: $('#section_'+$(this).attr('section')).offset().top - 50,
    }, 'slow');
    close = true;
    $('.nav-menu').html('<i class="fa fa-bars"></i>');
    $('.nav-backdrop').fadeOut(100);
    $('.menu').toggleClass('disabled');
    e.preventDefault();
  });
  
  // desktop navigation bar
  $(window).on('scroll', function() {
      var y_scroll_pos = window.pageYOffset;
      var scroll_pos_test = 10;
      if(y_scroll_pos > scroll_pos_test) {
        $('header').addClass('with-background');
      } else {
        $('header').removeClass('with-background');
      } 
  });
  
  // division section
  $('p[name="division-content"]').hide();
  $('p[name="division-content"][data="content"]').show();
  $('.temple-division-selector').click(function() {
      $('.temple-division-selector').removeClass('active');
      $(this).addClass('active');
      // toggle content
      $('p[name="division-content"]').hide();
      $('p[name="division-content"][data="'+$(this).attr('data')+'"]').show();
  });
  // division mobile slide
  var store = ['content', 'marketing', 'design', 'programming'];
  var index = 0;
  $('div[name="division-slide"]').click(function() {
    var data = $(this).attr('data');
    if (data === "prev") {
      index--;
      if (index == -1) index = 3;
    } else {
      index++;
      if (index == 4) index = 0;
    }
    $('.temple-division-selector').removeClass('active');
    $('.temple-' + store[index]).addClass('active');
    $('p[name="division-content"]').hide();
    $('p[name="division-content"][data="'+store[index]+'"]').show();
  })
  // get candidates count 
  db.collection('stats').doc("counter").get().then(doc => {
    if (doc.exists) {
      const data = doc.data()
      $('#candidates-content').text(data.content)
      $('#candidates-design').text(data.design)
      $('#candidates-marketing').text(data.marketing)
      $('#candidates-programming').text(data.programming)
    }
  })
  
  window.godmode = function() {
    const data = {
      content: Math.floor(Math.random() * 10000),
      design: Math.floor(Math.random() * 10000),
      marketing: Math.floor(Math.random() * 10000),
      programming: Math.floor(Math.random() * 10000),
    }
    $('.candidates-count').addClass('godmode')
    setInterval(() => {
      $('#candidates-content').text(data.content)
      $('#candidates-design').text(data.design)
      $('#candidates-marketing').text(data.marketing)
      $('#candidates-programming').text(data.programming)
      data.content += 1000
      data.design += 1000
      data.marketing += 1000
      data.programming += 1000
    }, 10);
    var store = ['content', 'marketing', 'design', 'programming'];
    var index = 0;
    setInterval(() => {
      index--;
      if (index == -1) index = 3;
      $('.temple-division-selector').removeClass('active');
      $('.temple-' + store[index]).addClass('active');
      $('p[name="division-content"]').hide();
      $('p[name="division-content"][data="'+store[index]+'"]').show();
    }, 1000)
    return "Godmode has beed enabled..."
  }
  
})

// create star particle
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 355,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.48927153781200905,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.2,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 83.91608391608392,
        "size": 1,
        "duration": 3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

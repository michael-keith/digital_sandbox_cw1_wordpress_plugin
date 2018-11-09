//Much of this code was written without proper internet access in a jury waiting room. I was going to edit and refactor this to be sensible, but ultimately it's just become a strange mess, which I'm too scared to alter.

var i = 1;
var tweets = [];

var timer;
var feedSpeed = 5000;

var sticky;
var stickyrStopper;
var generalSidebarHeight;
var stickyTop;
var stickOffset;
var stickyStopperPosition;

var ind = 0;

var scrollPos = window.scrollY;

var break_one;
var break_two;

jQuery(function($){
  main =  $("#main");
  tweets_div =  $("#tweets");
  main_height = main.prop('scrollHeight');
  main_position = Math.floor( $("#main").offset().top );
  //console.log(main_position);
  //console.log(main_height + " : " + main_position.top);
  //tweets_div.height(main_height);
  //tweets_div.css("top", main_position);

  break_one = $("#break_one").position().top;
  break_two = $("#break_two").position().top;
  break_three = $("#break_three").position().top;
  break_four = $("#break_four").position().top;
  break_five = $("#break_five").position().top;
  console.log(break_two);
});

jQuery(function($){

  $( document ).ready(function() {

    sticky = $(".sticky");
    stickyrStopper = $(".sticky-stopper");
    if (!!sticky.offset()) { // make sure ".sticky" element exists

    generalSidebarHeight = sticky.innerHeight();
    stickyTop = sticky.offset().top;
    stickOffset = $("#novella-header").innerHeight() + 70;
    stickyStopperPosition = stickyrStopper.offset().top;

    //Set sidebar pos in case the user reloads the page and isn't scrolled to top
    snap_top();

    //On scroll event
    $(window).scroll(function() {
      scrollPos = window.scrollY;
      snap_top();

      if(scrollPos < break_one) {feedSpeed = 5000; ind = 0; console.log("0");}
      else if(scrollPos > break_five) {feedSpeed = 1000; ind = 5; console.log("5");}
      else if(scrollPos > break_four) {feedSpeed = 3000; ind = 4; console.log("4");}
      else if(scrollPos > break_three) {feedSpeed = 4000; ind = 3; console.log("3");}
      else if(scrollPos > break_two) {feedSpeed = 6000; ind = 2; console.log("2");}
      else if(scrollPos > break_one) {feedSpeed = 8000; ind = 1; console.log("1");}
    });

    // Perform the inital get tweets action once the page is loaded
    get_tweets();
    //add_image();
  }

});

});

// Keep the rolling side bar at the top of the page. Other (potentially less messy) implementations conflict with the Novella/Wordpress templates and cause some weird issues.
function snap_top() {

  jQuery(function($){

    var windowTop = $(window).scrollTop(); // returns number

    if (stickyTop < windowTop+stickOffset) {
      sticky.css({ position: 'fixed', top: stickOffset });
    } else {
      sticky.css({position: 'absolute', top: 'initial'});
    }

  });

}

// Boilerplate code to check whether the user is viewing this page currently
// This is just a courtesy thing, as it makes no sense to be using resources and making requests if the user is not looking at the page.
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log("Your browser does not support certain functions of this site");
} else {
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
}

function handleVisibilityChange() {
  if (document[hidden]) {
    document.title = "Hidden";
  } else {
    document.title = "Viewed";
  }
}

start_timer();

//If the page is being viewed, start a timer to get tweets
function start_timer() {

  clearTimeout(timer);

  timer = setTimeout(function(){
    console.log("Timer started");
    if(!document[hidden]){get_tweets();}
    start_timer();
  }, feedSpeed);

}

function get_tweets() {

  jQuery(function($){

    $.post(
      ajax.ajax_url,
      {
        'action': 'test_action',
        'data': ind
      },
      function(response){
        console.log("Response: " + response);
        add_tweet(response);
      }
    );
  });

}

function add_tweet(id) {

  div_id = Math.floor(Math.random()*2000);

  jQuery(function($){
    $("#tweets").prepend("<div id='tweet_" + div_id + "' class='tweet'></div>");
    console.log(div_id);
  });

  twttr.widgets.createTweet(
    id,
    document.getElementById("tweet_" + div_id),
    {
      align: 'left'
    })
    .then(function (el) {

      if(!el) {console.log("FAILED TO LOAD TWEET"); get_tweets()}

      if(el) {
        jQuery(function($){
          let h = $("#tweet_" + div_id).prop('scrollHeight');
          $("#tweet_" + div_id)
          .animate({height: h},{ duration: 800, queue: false })
          .animate({opacity: "1"},{ duration: 300, queue: false });
        });

        tweets.unshift(div_id);
        cull_tweets();
      }

    });

  }


  //Cull the tweets so we're not displaying hundreds of objects at once and running the user's memory
  function cull_tweets() {

    //Let's arbitarily do this animation here why not?
    //Slowly fade the last tweet
    jQuery(function($){
      $("#tweet_" + tweets[1]).animate({opacity: "0"},{ duration: 3000, queue: false });
    });

    if (tweets.length == 6) {

      jQuery(function($){
        $("#tweet_" + tweets[5]).remove();
      });

      tweets.pop();

    }

  }

  function add_image() {

    console.log("image");

    jQuery(function($){
      $("#tweets").prepend("<div id='tweet_" + "1" + "' class='tweet'><img src='https://media.newyorker.com/photos/5bce242a60e70c2cc64189ed/master/w_649,c_limit/Mead-Brexit-Peoples-March.jpg'></div>");
    });

    jQuery(function($){
        let h = $("#tweet_" + "1").prop('scrollHeight');
        $("#tweet_" + "1")
        //.animate({height: h},{ duration: 800, queue: false })
        .animate({opacity: "1"},{ duration: 2000, queue: false });
    });

    tweets.unshift(1);
    cull_tweets();

  }

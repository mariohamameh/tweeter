/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const { response } = require("express");

// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const renderTweets = function(tweets) {
  // loops through tweets
  //$('.tweets-container').empty();
  
  for (let tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
  let $tweet = ` 
    <div class="tweet">
      <div class="tweet-header">
        <span> <img class="avatar"  src=${escape(tweet.user.avatars)}>${escape(tweet.user.name)}</span>
        <div class="tweet-username">   
          <span class="tag">${escape(tweet.user.handle)}</span>
        </div>  
      </div>
      <div class="tweet-content">
        ${escape(tweet.content.text)}
      </div>
      <footer class= "tweet-footer">
        <span>${timeago.format(tweet.created_at)}</span>
        <div class="icons">
          <i class="fa-regular fa-flag"></i>
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-retweet"></i>
        </div>  
      </footer>
    </div>`

  return $tweet;
}

$(document).ready(()=>{
  $('#empty-tweet').hide();
  $('#excessive-tweet').hide();
  loadTweets();
  $('#form').submit((e) => {
    e.preventDefault();
    $('#empty-tweet').hide();
    $('#excessive-tweet').hide();
    const form = $('#form');
    const inputData = form.serialize();
    console.log('label',inputData);
    if (inputData.length === 5) {
      $('#empty-tweet').slideDown();
      return; 
    }
    if (inputData.length > 145){
      $('#excessive-tweet').slideDown();
      return; 
    }
    $.ajax('/tweets', { method: "POST", data: inputData }).then(() => {
      $(".tweet-container").empty();
      $("#tweet-text").val("");
      loadTweets();

    })
    .catch(e => console.log(e))
  });
})

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = function() {
  $.ajax("/tweets", { method: 'GET' })
   .then(function (thePosts) {
     renderTweets(thePosts);
   });
};


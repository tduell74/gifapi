$(document).ready(function(){
	var imageURL = "";
	var rating = "";
	var picDiv = "";
	var image = "";

	var topicsArray = ["Green Arrow", "The Flash", "Hulk", "Ironman", "Aquaman", "Batman", "Raven", "Wolverine", "Spiderman"];


	// insert preloaded buttons

	 function insertButtons() {
	 	$("#buttonscontainer").empty();

	 	for (var i = 0; i < topicsArray.length; i++) {
	 		var novoButton = $("<button>");
	 		novoButton.attr("class", "buttonstyle");
	 		novoButton.attr("data-value", topicsArray[i]);
	 		novoButton.text(topicsArray[i]);

	 		$("#buttonscontainer").append(novoButton);
	 		$(".genbuttons" + topicsArray[i]).append(topicsArray[i]);

	 	}
	 }

	 insertButtons()




	 $("#submitme").on("click", function() {
	 	var superHero = $("#searchvalue").val().trim();
	 	topicsArray.push(superHero);
	 	insertButtons();
	 	console.log(topicsArray)
	 });
// });

     $("#search").on("keypress", function(){
     	if(event.keycode === 13) {
     		var superHero = $("#searchvalue").val().trim();
     		topicsArray.push(superHero);
     		insertButtons();
     		console.log(topicsArray);
     	}
     });

  $("#buttonscontainer").on("click", "button", function() {

  	 var hero = $(this).attr("data-value");
  	 console.log(hero);

  	 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=f4f904d2f7d04da683a89b1ad02966a7&limit=10&rating=pg";
     

     $.ajax({
     	url: queryURL,
     	method: "GET"
     })

     .done(function(response) {
     	console.log(response);
     	var responseLength = response.data.length;
     	console.log(queryURL);
     	$("#showgifs").empty()
     	$("#responseMessage").empty();

     	if (responseLength < 10) {
     		$("#responseMessage").hmtl("Your search only returned " + responseLength + " results");
      	}

      	if(response.Length === 0) {
      		$("#responseMessage").hmtl("Your search did not return any results");
      	}

      	for (var i = 0; i < responseLength; i++) {
      		imageUrl = response.data[i].images.original_still.url;
      		var imageUrlAnimate = response.data[i].images.original.url;
      		var imageUrlStill = response.data[i].images.original_still.url;
      	   rating = response.data[i].rating;
           picDiv = $("<div class= 'dyno dynadiv" + i + "'> <h3 class= 'rating'> Rating: " + rating + "</h3></div>");
           image = $("<img>");
           image.attr({ "class": "gifs",
                 "src": imageUrl,
                 "data-still": imageUrlStill,
                 "data-animate": imageUrlAnimate,
                 "data-state": "still",
                 "alt": "tvgiphy"
       });
           $("#showgifs").append(picDiv);
           $(".dynadiv" + i).append(image);
      }

     });
  });

  $("#showgifs").on("click", ".gifs", function() {

  	var motion = $(this).attr("data-state");

  	if(motion === "still") {
  		$(this).attr("src", $(this).attr("data-animate"));
  		$(this).attr("data-state", "animate");
  	} else {
  		$(this).attr("src", $(this).attr("data-still"));
  		$(this).attr("data-state", "still");
  	}
  })



});
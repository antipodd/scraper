// ******************************************************************************
// App.js 
//
// ******************************************************************************

$(document).ready(function () {
  // Hide alert-danger div on page refresh
  $(".alert-danger").hide()

  // Store the id of the collapse section in local storage upon clicking a comments section
  // This only stores the most recent comments section clicked and not all that are open
  $(".collapse").on("show.bs.collapse", function () {
    // store the id of the collapsible element
  	localStorage.setItem("collapseItem", $(this).attr("id"));
  	//console.log("collapse clicked");
  	//console.log($(this).attr("id"));
	});

  // Removes the comment section id value from local storage
  $(".collapse").on("hide.bs.collapse", function () {
  	// store the id of the collapsible element
    removeCollapseData();
  	//localStorage.removeItem("collapseItem", $(this).attr("id"));
	});
  
  // Scrolls page to the last comment section left open before page refresh  
  var collapseItem = localStorage.getItem("collapseItem"); 
  if (collapseItem) {
  	collapseItem = "#" + collapseItem;
   	//console.log(collapseItem)
   	$(collapseItem).collapse("show");
   	$("html, body").animate({
     	scrollTop: $(collapseItem).offset().top
   	}, 1000);
  };

  // If scraper button hit when a collapse is open, remove the collapse data from local storage so on page refresh the page remains at the top
  $(".button-scraper").on("click", function() {
    if (collapseItem) {
      removeCollapseData();
      //localStorage.removeItem("collapseItem", $(this).attr("id"));
    }
  });

  // Client-side validation, does not allow submission of empty comment
  $(".comment-submit").on("click", function() {
    var commentId = $(this).attr("id");
    //console.log(commentId);
    //console.log($(this).siblings("div").children("textarea").attr("id"))
    if ($(this).siblings("div").children("textarea").attr("id") === commentId && $(this).siblings("div").children("textarea").val() === "") {
      event.preventDefault();
      $(".alert-danger").show()
    }
    // Go to section with latest comment added if user clicks another comment section before returning to a previous collapse to leave a comment
    localStorage.setItem("collapseItem", commentId);
  });

  // When clicking the comments collapse button, hide the alert-danger div
  $(".comment-section").on("click", function() {
    $(".alert-danger").hide()
  });

  // Tried to grab error sent back to browser and show an alert rather than json error message but didn't work
  /*$("#comment-submit").on("error", function() {
   	alert( "Cannot submit an empty comment!" )
  })*/

  function removeCollapseData() {
    localStorage.removeItem("collapseItem", $(this).attr("id"));
  }
    
});
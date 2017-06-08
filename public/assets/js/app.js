$(document).ready(function () {
    $(".collapse").on("show.bs.collapse", function () {
  		// store the id of the collapsible element
  		localStorage.setItem("collapseItem", $(this).attr("id"));
  		//console.log("collapse clicked");
  		//console.log($(this).attr("id"));
	});

    $(".collapse").on("hide.bs.collapse", function () {
  		// store the id of the collapsible element
  		localStorage.removeItem("collapseItem", $(this).attr("id"));
	});
    
    var collapseItem = localStorage.getItem("collapseItem"); 
    if (collapseItem) {
    	collapseItem = "#" + collapseItem;
    	//console.log(collapseItem)
       	$(collapseItem).collapse("show");
       	$("html, body").animate({
        	scrollTop: $(collapseItem).offset().top
    	}, 1000);
    };

    $("#comment-submit").on("error", function() {
    	alert( "Cannot submit an empty comment!" )
  	})
    
});

// Zendesk Alert Banner - Start
function alertCloseReposition(reverse) {
  //  Place this outside of Document Ready Function

    // added get the margin of the navbar and adjust the ns-close margin with it
  var currentNavbar=$("zd-hc-navbar").css("margin-top");
  // console.log("currentNavbar: "+currentNavbar); // DEBUG;
  // console.log("reverse: "+reverse); // DEBUG;

  if (reverse) {
      if (currentNavbar < "0px") {
          navbarExpanded=false;
      } else {
          navbarExpanded=true;
      }
  } else {
      if (currentNavbar < "0px") {
          navbarExpanded=true;
      } else {
          navbarExpanded=false;
      }
  }
  //console.log("navbarExpanded: "+navbarExpanded); // DEBUG;
  var adjustedMargin = null;

  if (navbarExpanded) {
      adjustedMargin="32px"
  } else {
      adjustedMargin="80px"
  }
  $(".alertbox .ns-close").animate({"margin-top": adjustedMargin},3, "swing");
  // console.log(navbarExpanded); // DEBUG
  return currentNavbar
}


// Zendesk Alert Banner - Start

    // var zdDomain = "condenast431484078476";
    var zdDomain = "condenast43";
    var alertTag = "alert_banner";
//   $.get( "https://condenast431484078476.zendesk.com/api/v2/help_center/articles.json?label_names=alert_banner" ).done(function( data ) {
    $.get( "https://" + zdDomain + ".zendesk.com/api/v2/help_center/articles.json?label_names=" + alertTag ).done(function( data ) {

      $.each(data.articles, function(index,item) {
          var style1 = '<div class="ns-box ns-bar ns-effect-slidetop ns-type-notice ns-show"><div class="ns-box-inner"><span class="megaphone"></span></i><p><a href="'+ item.html_url + '">' + item.title + '</a>' + item.body + '</p></div><span class="ns-close"></span></div>'
          $('.alertbox').append(style1);
      });

      /* reposition on page load */
      alertCloseReposition(false);

      $("zd-hc-resizer").on("click", function() {
          /* add an event handler to the zd-hc-resizer element to trigger the reposition */
          alertCloseReposition(true);
      });

      $(".alertbox").on("click", function() {
          /* add an event handler to the alertbox class to trigger the reposition */
          alertCloseReposition(false);
      });

      $('.ns-close').on('click',function(){
          $(".alertbox").remove();
      });

  });
// Zendesk Alert Banner - Stop
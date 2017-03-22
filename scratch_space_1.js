/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {

    // social share popups
    $(".share a").click(function(e) {
        e.preventDefault();
        window.open(this.href, "", "height = 500, width = 500");
    });

    // show form controls when the textarea receives focus or backbutton is used and value exists
    var $commentContainerTextarea = $(".comment-container textarea"),
        $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

    $commentContainerTextarea.one("focus", function() {
        $commentContainerFormControls.show();
    });

    if ($commentContainerTextarea.val() !== "") {
        $commentContainerFormControls.show();
    }

    // Expand Request comment form when Add to conversation is clicked
    var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
        $requestCommentFields = $(".request-container .comment-container .comment-fields"),
        $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

    $showRequestCommentContainerTrigger.on("click", function() {
        $showRequestCommentContainerTrigger.hide();
        $requestCommentFields.show();
        $requestCommentSubmit.show();
        $commentContainerTextarea.focus();
    });

    // Mark as solved button
    var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
        $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
        $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

    $requestMarkAsSolvedButton.on("click", function () {
        $requestMarkAsSolvedCheckbox.attr("checked", true);
        $requestCommentSubmitButton.prop("disabled", true);
        $(this).attr("data-disabled", true).closest("form").submit();
    });

    // Change Mark as solved text according to whether comment is filled
    var $requestCommentTextarea = $(".request-container .comment-container textarea");

    $requestCommentTextarea.on("keyup", function() {
        if ($requestCommentTextarea.val() !== "") {
            $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
            $requestCommentSubmitButton.prop("disabled", false);
        } else {
            $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
            $requestCommentSubmitButton.prop("disabled", true);
        }
    });

    // Disable submit button if textarea is empty
    if ($requestCommentTextarea.val() === "") {
        $requestCommentSubmitButton.prop("disabled", true);
    }

    // Submit requests filter form in the request list page
    $("#request-status-select, #request-organization-select")
        .on("change", function() {
            search();
        });

    // Submit requests filter form in the request list page
    $("#quick-search").on("keypress", function(e) {
        if (e.which === 13) {
            search();
        }
    });

    function search() {
        window.location.search = $.param({
            query: $("#quick-search").val(),
            status: $("#request-status-select").val(),
            organization_id: $("#request-organization-select").val()
        });
    }

    $(".header .icon-menu").on("click", function(e) {
        e.stopPropagation();
        var menu = document.getElementById("user-nav");
        var isExpanded = menu.getAttribute("aria-expanded") === "true";
        menu.setAttribute("aria-expanded", !isExpanded);
    });

    if ($("#user-nav").children().length === 0) {
        $(".header .icon-menu").hide();
    }

    // Submit organization form in the request page
    $("#request-organization select").on("change", function() {
        this.form.submit();
    });

    // Toggles expanded aria to collapsible elements
    $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
        e.stopPropagation();
        var isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isExpanded);
    });


    // ADDED CONTENT
    // MW-Notification Banner
    $.get( "https://condenast431484078476.zendesk.com/api/v2/help_center/articles.json?label_names=alert_banner" ).done(function( data ) {


        function nsClosePosition() {
            /* get the height of the navbar and adjust the ns-close box top margin with it */
            var currentNavbarHeight=$("#navbar-container").css("height");
            if (currentNavbarHeight > "2px") {
                navbarExpanded=true;
            } else {
                navbarExpanded=false
            }
            var adjustedMargin = null;

            if (navbarExpanded) {
                closeBoxMargin=16
                adjustedMargin = parseInt(currentNavbarHeight, 10) -   parseInt(closeBoxMargin, 10) + "px"
            } else {
                closeBoxMargin=78
                adjustedMargin = parseInt(currentNavbarHeight, 10) +   parseInt(closeBoxMargin, 10) + "px"
            }
            $(".alertbox .ns-close").animate({"margin-top": adjustedMargin},2, "swing");
            console.log(navbarExpanded);
            return adjustedMargin
        };


        $.each(data.articles, function(index,item) {
            nsClosePosition();

            var style1 = '<div class="ns-box ns-bar ns-effect-slidetop ns-type-notice ns-show"><div class="ns-box-inner"><span class="megaphone"></span></i><p><a href="'+ item.html_url + '">' + item.title + '</a>' + item.body + '</p></div><span class="ns-close"></span></div>'

            $('.alertbox').append(style1); });

        /* add an event handler to the zd-hc-resizer element to trigger the position adjustment of the ns-close top margin*/
        $("zd-hc-resizer").on("click", function() { var a = nsClosePosition(); console.log(a); });

        $('.ns-close').on('click',function(){
            $(".alertbox").remove();
        });

    });


});

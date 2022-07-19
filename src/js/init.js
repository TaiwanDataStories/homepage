import $ from "jquery";
import ScrollMagic from "scrollmagic";

$(document).ready(function () {
  // RELOAD ON RESIZE
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  $(window).resize(function () {
    if (
      windowWidth != $(window).width() ||
      windowHeight != $(window).height()
    ) {
      location.reload();
      return;
    }
  });

  if ($(window).innerWidth() > 640) {
    var menuHeight = $("#nav ul").outerHeight();
    $("#nav").css("height", menuHeight);
    $("#gallery").css("padding-top", menuHeight); //this works if desktop version is loaded first
  } else {
    $("#nav").css("height", "67px");
    $("#gallery").css("padding-top", "67px");
    $(".modern").css("padding-top", "40px");
    $(".modern").css("padding-bottom", "80px");
  }

  var controller = new ScrollMagic.Controller();

  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  )
    //TEAM MEMBERS FADE IN

    new ScrollMagic.Scene({
      triggerElement: "#member01",
      offset: -100,
    })
      .setClassToggle("#member01", "fade-in") // add class to project01
      .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#member02",
    offset: -100,
  })
    .setClassToggle("#member02", "fade-in") // add class to project01
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#member03",
    offset: -100,
  })
    .setClassToggle("#member03", "fade-in") // add class to project01
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#member04",
    offset: -100,
  })
    .setClassToggle("#member04", "fade-in") // add class to project01
    .addTo(controller);

  //CONTACT FORM

  $(function () {
    // Get the form.
    var form = $("#contactForm");

    // Get the messages div.
    var formMessages = $("#form-messages");

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
      // Stop the browser from submitting the form.
      e.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();
      console.log(formData);

      // Submit the form using AJAX.
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: formData,
      })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          $(formMessages).removeClass("error");
          $(formMessages).addClass("success");

          // Set the message text.
          $(formMessages).text(response);

          // Clear the form.
          $("#nameFirst").val("");
          $("#nameLast").val("");
          $("#email").val("");
          $("#message").val("");
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          // Set the message text.
          if (data.responseText !== "") {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    });
  });
});
$(document).ready(function () {
  // this will let us know user selection
  $("#select-box").change(function () {
    toggleRequestBody();
  });

  //this funciont will disappear and reappear the request body element
  function toggleRequestBody() {
    $("#status-container").addClass("d-none");
    if ($("#select-box").val() === "GET") {
      $("#responseBodyWrapper").removeClass("d-none");
      $("#requestBodyWrapper").addClass("d-none");
    } else if ($("#select-box").val() === "POST") {
      $("#responseBodyWrapper").removeClass("d-none");
      $("#requestBodyWrapper").removeClass("d-none");
    } else {
      $("#responseBodyWrapper").addClass("d-none");
      $("#requestBodyWrapper").addClass("d-none");
    }
    $("#status-container").html("");
    $("#responseBody").html("");
  }

  //submit button functions
  $("#submit-button").click(function () {
    checkIfInputIsEmpty();
  });

  //this funtion will check the imput
  function checkIfInputIsEmpty() {
    if (!$("#input-url").val()) {
      return alert("Please add an URL to continue");
    } else {
      checkIfTheMethodIsSelected();
    }
  }

  // this will check the method to have a value
  function checkIfTheMethodIsSelected() {
    if ($("#select-box").val() === "none") {
      return alert("Please choose a method to continue");
    } else {
      startMethod();
    }
  }
  //this function determinds the method
  function startMethod() {
    switch ($("#select-box").val()) {
      case "GET":
        getMethod();
        break;
      case "POST":
        postMethod();
        break;
    }
  }

  //get method structure
  function getMethod() {
    $.ajax({
      type: "GET",
      url: $("#input-url").val(),
      dataType: "JSON",
      success: function (respone, textStatus, xhr) {
        $("#responseBody").text(JSON.stringify(respone, null, 4));
        makeSuccessStatusBar(xhr);
      },
      error: function (xhr) {
        $("#responseBody").text("Url Not Found!");
        makeErrorStatusBar(xhr);
      },
    });
  }

  // make the footer appear when succed
  function makeSuccessStatusBar(xhr) {
    $("#status-container").html(`
    <div class="card-body">
      Plain Text: <span class="spanlain-text">${
        xhr.getResponseHeader("content-type").split("/")[1].split(";")[0]
      }</span> , Status:
      <span class="code">${xhr.status}</span>
    </div>
  `);
    $("#status-container").removeClass("d-none");
  }

  // make the footer appear on error
  function makeErrorStatusBar(xhr) {
    $("#status-container").html(`
      <div class="card-body">
        Plain Text: <span class="spanlain-text">None</span> , Status:
        <span class="code">${xhr.status}</span>
      </div>
    `);
    $("#status-container").removeClass("d-none");
  }

  //post method structure
  function postMethod() {
    let reqInput = $("#requestBody").val();
    isItJson(reqInput);
    let requestedData = JSON.parse($("#requestBody").val());
    $.ajax({
      type: "POST",
      url: $("#input-url").val(),
      data: requestedData,
      dataType: "json",
      success: function (respone, textStatus, xhr) {
        $("#responseBody").text(JSON.stringify(respone, null, 4));
        makeSuccessStatusBar(xhr);
      },
      error: function (xhr) {
        $("#responseBody").text("Url Not Found!");
        makeErrorStatusBar(xhr);
      },
    });
  }

  //checking if the input is in JSON form
  function isItJson(input) {
    try {
      JSON.parse(input);
    } catch (e) {
      return alert("The input should be in JSON form");
    }
    return true;
  }
});

// example for post input
/* {
  "firstName": "Bidhan",
  "lastName": "Chatterjee",
  "age": 40,
  "email":"bidhan@example.com"
			  } */

$(document).ready(function () {
  //making the user data list
  let userList = [];
  let userIds = [];
  let userPages;
  //figuring out how many pages of data we have
  $.ajax({
    type: "GET",
    url: "https://reqres.in/api/users?page1",
    dataType: "JSON",
    success: function (response) {
      userPages = response.total_pages;
    },
    async: false,
  });
  // fetching data from api by the count of pages
  for (let getCounter = 1; getCounter <= userPages; getCounter++) {
    $.ajax({
      type: "GET",
      url: `https://reqres.in/api/users?page=${getCounter}`,
      dataType: "JSON",
      success: function (response) {
        //adding the users data to an array
        userList.push(response.data);
      },
      async: false,
    });
  }
  //flating the array to a single dimantion array
  userList = userList.flat();
  // console.log(userList);

  // bulding the user container on client side
  userContainerLoader();
  function userContainerLoader() {
    $("#users-container").html("");
    $(".modal-container").html("");
    userIds = [];
    for (let idNumber = 0; idNumber < userList.length; idNumber++) {
      userIds.push(userList[idNumber].id);
      //making the div and classes
      let userMakerEl = document.createElement("div");
      userMakerEl.classList.add("col-12", "col-sm-6", "col-md-4", "p-2");
      userMakerEl.innerHTML = `
        <div class="card text-white bg-dark mb-3">
        <img
          src="${userList[idNumber].avatar}"
          id="img-${idNumber}"
          class="card-img-top img-${idNumber}"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title mt-4">id: ${userList[idNumber].id}</h5>
          <p class="card-text mt-3">mail: ${userList[idNumber].email}</p>
        </div>
        <div class="card-body">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal${userList[idNumber].id}"
          >
            User Profile
          </button>
        </div>
      </div> 
        `;
      // appending the
      $("#users-container").append(userMakerEl);

      //making this user modal
      // console.log(userList[idNumber]);
      $(".modal-container").append(`
      <div class="modal fade" id="modal${userList[idNumber].id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Id Number: ${userList[idNumber].id}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body d-flex flex-wrap justify-content-between">
                    <div class="p-3 col-7">
                        <p>First Name: ${userList[idNumber].first_name}</p>
                        <p>Last Name: ${userList[idNumber].last_name}</p>
                        <p>Email: ${userList[idNumber].email}</p>
                    </div>
                    <div class="col-4">
                        <img
                        src="${userList[idNumber].avatar}"
                        class="card-img-top"
                        alt="..."
                        /> 
                    </div>
                  </div>
                  <div class="modal-footer d-flex justify-content-around">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                          Close
                      </button>
                      <button id="remove-button${userList[idNumber].id}" type="button" class="btn btn-danger" data-bs-dismiss="modal">
                          Remove this user
                      </button>
                      <button type="button" class="btn btn-primary" data-bs-target="#modal${userList[idNumber].id}-2" data-bs-toggle="modal">
                          Edit this user
                      </button>
                  </div>
              </div>
          </div>
      </div>
      <div class="modal fade" id="modal${userList[idNumber].id}-2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Id Number: ${userList[idNumber].id}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body column justify-content-between align-center">
            <div class="p-3 col-12">
                <form>
                        <div class="mb-3 d-flex justify-content-between">
                            <label for="edited-user-mail" class="col-form-label col-5">Email:</label>
                            <input type="text" class="form-control" id="edited-user-mail-${userList[idNumber].id}">
                        </div>
                        <div class="mb-3 d-flex justify-content-between">
                            <label for="edited-user-fname" class="col-form-label col-5">First Name:</label>
                            <input type="text" class="form-control" id="edited-user-fname-${userList[idNumber].id}" >
                        </div>
                        <div class="mb-3 d-flex justify-content-between">
                            <label for="edited-user-lname" class="col-form-label col-5">Last Name:</label>
                            <input type="text" class="form-control" id="edited-user-lname-${userList[idNumber].id}">
                        </div>
                        <div class="mb-3 d-flex justify-content-between">
                            <label for="user-avatar" class="col-form-label col-5">Avatar:</label>
                            <input type='file' id="user-avatar-${userList[idNumber].id}" />
                            <img class="d-none" id="address" src="#" alt="your image" />
                        </div>
                    </form>
            </div>
            <div class="col-5">
                <img
                src="${userList[idNumber].avatar}"
                class="card-img-top"
                alt="..."
                /> 
            </div>
            </div>
            <div class="modal-footer">
                <button id="edit-button${userList[idNumber].id}" class="btn btn-success m-auto"  data-bs-dismiss="modal" data-bs-toggle="modal">Apply Changes</button>
            </div>
          </div>
        </div>
      </div>
      `);
      // $(`#edit-button${userList[idNumber].id}`).click(function () {
      //   console.log($("#edited-user-fname").val());
      //   userList[userList[idNumber].id - 1].first_name =
      //     $("#edited-user-fname").val();
      //   userList[userList[idNumber].id - 1].last_name =
      //     $("#edited-user-lname").val();
      //   userList[userList[idNumber].id - 1].email =
      //     $("#edited-user-mail").val();
      //   //   userList[index - 1].avatar =
      //   userContainerLoader();
      // });
    }
  }

  //create function
  let imageAddress;
  let flag = true;
  function create() {
    if (userIds.includes(Number($("#user-id").val()))) return uidInUse();
    checkIfTheInputsAreFilled();
    if (flag === true) {
      let newUserObject = {};
      newUserObject.id = Number($("#user-id").val());
      newUserObject.email = $("#user-mail").val();
      newUserObject.first_name = $("#user-fname").val();
      newUserObject.last_name = $("#user-lname").val();
      newUserObject.avatar = imageAddress;
      userList.push(newUserObject);
      showSuccessMessage();
      clearCreateForm();
      userContainerLoader();
    }
  }

  // checking if creation form inputs are filled
  function checkIfTheInputsAreFilled() {
    if (
      !$("#user-id").val() ||
      !$("#user-mail").val() ||
      !$("#user-fname").val() ||
      !$("#user-lname").val()
    ) {
      flag = false;
      return flag, notFilledInputs();
    }
  }

  // show the creation form
  $("#add-user-button").click(function () {
    create();
  });

  // edit function
  function edit() {
    try {
      for (let index of userIds) {
        $(`#edit-button${index}`).click(function () {
          userList[index - 1].first_name = $(
            `#edited-user-fname-${index}`
          ).val();
          userList[index - 1].last_name = $(
            `#edited-user-lname-${index}`
          ).val();
          userList[index - 1].email = $(`#edited-user-mail-${index}`).val();
          readURL($(`#user-avatar-${index}`)[0], index);
          userContainerLoader();
          console.log($("#edited-user-fname"));
        });
      }
    } catch (e) {
      console.warning(e);
    }
  }

  edit();

  // create funtion helper
  // this function job is to clear the create form
  function clearCreateForm() {
    $("#user-id").val("");
    $("#user-mail").val("");
    $("#user-fname").val("");
    $("#user-lname").val("");
    $("#user-avatar").val("");
  }

  //this will help show the avatar when choosing

  function readURL(input, index) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        imageAddress = e.target.result;
        console.log(imageAddress);
        $("#blah").attr("src", e.target.result);
        userList[index - 1].avatar = imageAddress;
        console.log("avatar", $(`.image-${index}`));
        $(`#img-${index - 1}`).attr("src", imageAddress);
        console.log($(`#img-${index}`).attr("src"));
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function () {
    readURL(this);
  });

  // close and clears the form
  $(".closeBtn").click(function () {
    clearCreateForm();
  });
  // show success alert
  function showSuccessMessage() {
    $("#success").fadeIn();
    $("#success").removeClass("d-none");
    setInterval(function () {
      $("#success").addClass("d-none");
    }, 3000);
  }
  // show error alert
  function uidInUse() {
    $("#uid-inuse").fadeIn();
    $("#uid-inuse").removeClass("d-none");
    setInterval(function () {
      $("#uid-inuse").addClass("d-none");
    }, 3000);
  }
  //show warning alert
  function notFilledInputs() {
    $("#not-filled").fadeIn();
    $("#not-filled").removeClass("d-none");
    setInterval(function () {
      $("#not-filled").addClass("d-none");
    }, 3000);
  }

  //removing functions
  function remove() {
    for (let index of userIds) {
      // console.log(userIds);
      $(`#remove-button${index}`).click(function () {
        userList.splice(index - 1, 1);
        console.log(userList);
        userContainerLoader();
        $(`#remove-button${index}`).off("click");
        reactivate();
      });
    }
  }
  remove();

  //recativate remove function
  function reactivate() {
    remove();
    edit();
  }
});

$(document).ready(function () {
  //filling the table with userData
  let uidArray;
  function makeTable() {
    uidArray = [];
    let i = 1;
    let tableMakerHtml = ``;
    for (let user of userData) {
      uidArray.push(user.uid);
      tableMakerHtml += `
        <tr class="satr">
          <td>${i}</td>
          <td class="data0">${user.uid}</td>
          <td class="data1">${user.firstName}</td>    
          <td class="data2">${user.lastName}</td> 
          <td class="data3">${user.city}</td> 
          <td class="data4">${user.personalCode}</td> 
          <td class="data5">${user.phoneNumber}</td> 
          <td class="data6">${user.position}</td>
        </tr>`;
      i++;
    }
    $("#table-data").html(tableMakerHtml);
  }
  done();

  //adding a row
  //calling the add function
  $("#add").click(function () {
    addTableRow();
  });
  //////////////////////////////////////////////////////////////////////////////////
  //writing the add function
  function addTableRow() {
    //checking the uid standards
    let uid = Number($("#uid").val());
    //checking if the uid is empty or zero
    if (uid === 0) {
      alert("Please fill all the inputs");
      return;
    }
    //checking if the uid was already in userData
    if (uidArray.includes(uid)) {
      alert(`This uid already exist
    please add another one`);
      return;
    }
    //checking all the other inputs if they are empty or not
    let firstName = $("#first-name").val();
    if (firstName === "") {
      alert("Please fill all the inputs");
      return;
    }
    let lastName = $("#last-name").val();
    if (lastName === "") {
      alert("Please fill all the inputs");
      return;
    }
    let city = $("#city").val();
    if (city === "") {
      alert("Please fill all the inputs");
      return;
    }
    let postalCode = $("#postal-code").val();
    if (postalCode === "") {
      alert("Please fill all the inputs");
      return;
    }
    let phoneNumber = $("#phone-number").val();
    if (phoneNumber === "") {
      alert("Please fill all the inputs");
      return;
    }
    let position = $("#position").val();
    if (position === "") {
      alert("Please fill all the inputs");
      return;
    }
    // turn the inputs to a new object and push it in the userData array
    let newObject = {
      uid: uid,
      firstName: firstName,
      lastName: lastName,
      city: city,
      personalCode: postalCode,
      phoneNumber: phoneNumber,
      position: position,
    };
    console.log(newObject);
    userData.push(newObject);
    // make the table with the new pushed userData array
    done();
  }
  //////////////////////////////////////////////////////////////////////////////////
  //sorting by head
  function sortByHead(headerName) {
    //checking the type of header (because of the sorting methods)
    let headerType = typeof userData[0][headerName];
    switch (headerType) {
      case "number":
        userData = userData.sort((a, b) => b[headerName] - a[headerName]);
        break;
      case "string":
        userData = userData.sort((a, b) =>
          b[headerName].localeCompare(a[headerName])
        );
        break;
    }
    //make the sorted table
    done();
  }
  // callling the sort function on headers
  $("#table-uid").click(function () {
    sortByHead("uid");
  });
  $("#table-fname").click(function () {
    sortByHead("firstName");
  });
  $("#table-lname").click(function () {
    sortByHead("lastName");
  });
  $("#table-city").click(function () {
    sortByHead("city");
  });
  $("#table-pcode").click(function () {
    sortByHead("personalCode");
  });
  $("#table-pnumber").click(function () {
    sortByHead("phoneNumber");
  });
  $("#table-position").click(function () {
    sortByHead("position");
  });
  //////////////////////////////////////////////////////////////////////////
  //display the row info
  function showRowInfo() {
    //  activating function when user click on the table's rows
    $(".edit-enabler").click(function () {
      $("#table-data").addClass("active");
      $(".satr").click(function () {
        $(".editing-form").addClass("active");
        //adding blur to background
        $(".main-table").addClass("blur");
        // close button
        $(".fa-times").click(function () {
          // exit the editing form
          $(".editing-form").removeClass("active");
          $(".main-table").removeClass("blur");
          $(".edit-input").val("");
          $("#table-data").removeClass("active");
        });
        // moving data from table to editting panel
        console.log(this);
        for (let index in userData) {
          // checking if the clicked row uid matches any uid in userData[index]Data
          if (
            Object.values(userData[index]).includes(
              Number($(this).children(".data0").html())
            )
          ) {
            console.log(userData[index]);
            // if we had match we will set the input values to the specified object
            for (let input in Object.values(userData[index])) {
              $(`.${input}`).val(Object.values(userData[index])[input]);
              $("#edit").click(function () {
                //by clicking on the edit button if the type isn't number
                //it means every data but uid, it will be changed to the
                //new input that userData[index] wrote
                if (typeof Object.values(userData[index])[input] !== "number") {
                  userData[index][Object.keys(userData[index])[input]] = $(
                    `.${input}`
                  ).val();
                } else if (
                  //if the userData[index] tried to change the uid's he will get an error
                  Object.values(userData[index])[0] !==
                  Number($(`.${input}`).val())
                ) {
                  console.log(Object.values(userData[index])[0]);
                  console.log($(`.${input}`).val());
                  alert(`You don't have access to change uids`);
                }
                // at the end we will make the table with the changes we made
                makeTable();
                $("#panel").children("input").val("");
                showRowInfo();
              });
            }
            $("#remove").click(function () {
              console.log(index);
              console.log(`how`);
              userData.splice(index, 1);
              makeTable();
              showRowInfo();
            });
          }
        }
      });
    });
  }
  //////////////////////////////////////////////////////////////////////////////////
  //tool-box opening function
  $(".tool-box").click(function () {
    $(".editing-form").addClass("active");
    //adding blur to background
    $(".main-table").addClass("blur");
    // close button
    $(".fa-times").click(function () {
      // exit the editing form
      $(".editing-form").removeClass("active");
      $(".main-table").removeClass("blur");
      $(".edit-input").val("");
    });
  });

  function done() {
    makeTable();
    showRowInfo();
  }
});

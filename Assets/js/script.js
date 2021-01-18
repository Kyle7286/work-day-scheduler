// Declare global time variables
var dateTime = luxon.DateTime; //Grabbing base time object
var localTime = dateTime.local(); //Get the current local time
var debug = false; //for if you want to trigger the day cycle every second for testing

// Setup the page with initial grab of local time
createRows(); // Create HTML Elements
setPastPresentFuture(localTime.hour); // Set row colors

// Set a timer to check the hour every second and set the colors accordingly
var j = 9; //used for debugging so it loops 9-5 repeadedly every second
var myVar = setInterval(function () {
    localTime = dateTime.local();
    
    // Assign current day to title
    $("#currentDay").text(formatTimeTitle(luxon.DateTime.local()))
    console.log(debug);
    if (debug) {
        setPastPresentFuture(j);
        if (j === 17) { j = 8; };
        j++;
    } else {
        setPastPresentFuture(localTime.hour);
    }
}, 1000);


// If debug button is toggled, cycle thru the hours of the day for testing the rotation
$("#debug").click(function () {
    console.log("Clicked Debug");
    btnDebug = $("#debug");
    btnDebugValue = btnDebug.attr("value");
    console.log(btnDebug);
    if (btnDebugValue === "0") {
        btnDebug.attr("class", "btn btn-sm btn-info p-0")
        debug = true;
        btnDebug.attr("value", "1");
    } else {
        btnDebug.attr("class", "btn btn-sm btn-outline-info p-0")
        debug = false;
        btnDebug.attr("value", "0");
    }

    console.log(debug);

});

// When save button is clicked, grab the text value of the textarea which matches up with the value of the button pressed
$(".saveBtn").click(function () {
    // Grab button value
    var btnValue = $(this).attr("value");

    // grab text ID value of the corresponding button value
    var text = $("#d" + btnValue).val();

    // Save to local storage
    localStorage.setItem(btnValue, text);
})


// Loop thru all text boxes and set color based on current hour
function setPastPresentFuture(hour) {

    $('.description').each(function () {
        var row = $(this);
        var rowVal = parseInt($(this).attr("value"));

        if (rowVal === hour) {
            row.attr("class", "col-10 description present");
        } else if (rowVal > hour) {
            row.attr("class", "col-10 description future");
        } else if (rowVal < hour) {
            row.attr("class", "col-10 description past");
        }
    });

}

// Format time to unique format specific to this website
function formatTimeTitle(time) {
    var wdl = time.weekdayLong;
    var ml = time.monthLong;
    var wd = time.day;
    var tg;
    var timeTitle;

    if (wd === 1 || wd === 21 || wd === 31) {
        tg = "st";
    } else if (wd === 2 || wd === 22) {
        tg = "nd";
    } else if (wd === 3 || wd === 23) {
        tg = "rd";
    } else {
        tg = "th";
    }
    timeTitle = wdl + ", " + ml + " " + wd + tg;
    return timeTitle;
}


function createRows() {
    // Grab the container
    var container = $(".container");
    var icon = '<i class="fas fa-save"></i>'


    // Set some variables to help dynamically create elements
    var hourIndex = 9;
    var amPm = "AM";
    for (let i = 9; i < 18; i++) {

        // Create the elements you'll need and give them attribute classes & id's
        var row = $("<div>").attr("class", "row").attr("id", "h" + i);
        var col1 = $("<div>").attr("class", "col-1 hour").text(hourIndex + amPm);
        var col2 = $("<textarea>").attr("class", "col-10 description past").attr({ id: "d" + i, value: i }).val(localStorage.getItem(i));
        var col3 = $("<button>").attr({ class: "col-1 saveBtn", value: i }).html(icon);

        // Append columns to row
        row.append(col1, col2, col3);

        // append row to container
        container.append(row);

        // If i is 12, reset hourIndex to start from 1PM; If i is 11, set amPm to PM
        if (i === 12) {
            hourIndex = 0;

        } else if (i === 11) {
            amPm = "PM";
        }
        hourIndex++; //Increment hour index
    }



}







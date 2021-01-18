// Declare global time variables
var dateTime = luxon.DateTime; //Grabbing base time object
var localTime = dateTime.local();

console.log(localTime);

// Assign current day to title
$("#currentDay").text(formatTimeTitle(localTime))

// Create HTML Elements
createRows();



// Format time to unique format specific to this website
function formatTimeTitle(time) {
    var wdl = time.weekdayLong
    var ml = time.monthLong
    var wd = time.weekday
    var tg;
    var timeTitle;
    
    if (wd === "1" || wd === "21" || wd === "31") {
        tg = "st";
    } else if (wd === "2" || wd === "22") {
        tg = "nd";
    } else if (wd === "3" || wd === "23") {
        tg = "rd";
    } else {
        tg = "th";
    }

    return timeTitle = wdl + ", " + ml + " " + wd + tg;
}


function createRows() {
    // Grab the container
    var container = $(".container");

    // Set some variables to help dynamically create elements
    var hourIndex = 9;
    var amPm = "AM";
    for (let i = 9; i < 18; i++) {

        // Create the elements you'll need and give them attribute classes & id's
        var row = $("<div>").attr("class", "row").attr("id", "h" + i);
        var col1 = $("<div>").attr("class", "col-1 hour").text(hourIndex + amPm);
        var col2 = $("<textarea>").attr("class", "col-10 description past").attr("id", "d" + i);
        var col3 = $("<button>").attr("class", "col-1 saveBtn").text("Save");

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
        hourIndex++ //Increment hour index
    }



}







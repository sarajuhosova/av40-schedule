var selectedDistance = '5K';

function getDistance() {
    return (selectedDistance === '5K') ? 5 : ((selectedDistance === '10K') ? 10 : 21.1); 
}

function getTime() {
    return {
        hours: parseInt(document.getElementById("hours").value),
        minutes: parseInt(document.getElementById("minutes").value),
        seconds: parseInt(document.getElementById("seconds").value)
    }
}

function clearTable() {
    // Clear the table
    document.querySelectorAll('.pace-table td').forEach(cell => {
        cell.textContent = '';
    });
}

function onDistanceClick(distance) {
    // Remove the 'selected' class from all buttons
    document.querySelectorAll('.distance button').forEach(button => {
        button.classList.remove('selected');
    });
    selectedDistance = distance;

    // Add the 'selected' class to the clicked button
    document.getElementById(selectedDistance).classList.add('selected');

    updateTable()
}

function timeToSeconds(time) {
    return (time.hours * 3600) + (time.minutes * 60) + time.seconds;
}

function paceToSeconds(pace) {
    return (pace.split(':')[0] * 60) + parseInt(pace.split(':')[1])
}

function paceFromSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function getPace(totalDistance, time, paceDistanceWrtKM) {
    return paceFromSeconds((timeToSeconds(time) / totalDistance) * paceDistanceWrtKM);
}

function multiplyPace(pace, percentage) {
    // Convert pace to seconds per kilometer
    var paceInSeconds = paceToSeconds(pace);

    // Calculate the new pace
    var newPace = paceInSeconds / (percentage / 100);

    return paceFromSeconds(newPace);
}

function checkTime(time) {
    if (time.hours < 0 || time.hours > 3) {
        return false;
    }
    if (time.minutes < 0 || time.minutes > 59) {
        return false;
    }
    if (time.seconds < 0 || time.seconds > 59) {
        return false;
    }
    return true;
}

// main ----------------------------------------------
function updateTable() {
    var time = getTime();

    if (!checkTime(time)) {
        alert("Ongeldige tijd ingevoerd.");
        return;
    }

    var pacePerKM = getPace(getDistance(), time, 1);
    var pacePerLap = getPace(getDistance(), time, 0.4);

    document.querySelector('#total-distance').textContent = selectedDistance;
    document.querySelector('#total-time').textContent = time.hours + ':' + (time.minutes < 10 ? '0' : '') + time.minutes + ':' + (time.seconds < 10 ? '0' : '') + time.seconds;

    document.querySelectorAll('.pace-table td').forEach(cell => {
        var percentage = parseInt(cell.id.split('-')[1])
        var pace = (cell.classList.contains('km')) ? pacePerKM : pacePerLap;
        cell.textContent = multiplyPace(pace, percentage);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateTable()
})

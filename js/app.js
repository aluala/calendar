var currentDate = moment();
var currentMonth = {
    year: currentDate.year(),
    month: 1
};

$(function () {
    refreshCalendar()
});

function refreshCalendar() {
    $(".calendar .year").html(currentMonth.year);
    $(".calendar .month").html(currentMonthAsText());
    var daysTable = createDaysTableForMonth(currentMonth.year, currentMonth.month);
    var daysDiv = $(".calendar .days");
    daysDiv.empty();
    daysDiv.append(daysTable);
}

function createDaysTableForMonth(year, month) {
    var table = $("<table/>");
    var weekDayNamesRow = $("<tr/>");
    for (var i = 1; i <= 7; i++) {
        var weekDayNameCell = $("<th/>");
        weekDayNameCell.html(moment().isoWeekday(i).format('ddd'));
        weekDayNamesRow.append(weekDayNameCell)
    }
    table.append(weekDayNamesRow);

    var monthMoment = moment().year(year).month(month);
    var firstDayOfWeek = monthMoment.date(1).day();
    var totalDaysInMonth = monthMoment.endOf("month").date();
    var firstDaysRow = $("<tr/>");
    for(var i = 1; i < firstDayOfWeek; i++) {
        firstDaysRow.append($("<td/>"))
    }
    var daysIterator = 1;
    for(; daysIterator + firstDayOfWeek <= 8; daysIterator++) {
        var dayCell = $("<td/>");
        dayCell.html(daysIterator);
        firstDaysRow.append(dayCell)
    }
    table.append(firstDaysRow);
    var daysRow = $("<tr/>");
    for(; daysIterator <= totalDaysInMonth; daysIterator++) {

        var dayCell = $("<td/>");
        dayCell.html(daysIterator);
        daysRow.append(dayCell);
        if(daysRow.children().length === 7) {
            table.append(daysRow);
            daysRow = $("<tr/>");
        }
    }
    table.append(daysRow);


    return table;
}

function currentMonthAsText() {
    return moment().month(currentMonth.month).format("MMMM")
}





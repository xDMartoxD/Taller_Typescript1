import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
var student = new Student('201914078', '1001309026', 20, 'Calle 78 #1a-22', '3183916882');
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById('button-filterByName');
var inputSearchBox = (document.getElementById('search-box'));
var totalCreditElm = document.getElementById('total-credits');
var minValue = document.getElementById('min-value');
var maxValue = document.getElementById('max-value');
var studentTbody = document.getElementById('student');
var minRange = (document.getElementById('range-1'));
var maxRange = (document.getElementById('range-2'));
renderCoursesInTable(dataCourses);
renderStudentInfo(student);
totalCreditElm.innerHTML = "Total creditos: " + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInfo(student) {
    var _a;
    console.log('desplegando estudiante');
    var tableContent = '';
    for (var i in student) {
        tableContent += "<tr> \n\t\t\t<td> " + i + " </td>\n\t\t\t<td> " + ((_a = Object.getOwnPropertyDescriptor(student, i)) === null || _a === void 0 ? void 0 : _a.value) + " </td>\n\t\t</tr>";
    }
    studentTbody.innerHTML = tableContent;
}
function renderRangesValues(e) {
    clearCoursesInTable();
    var courses;
    if (e.target.id === 'range-1') {
        var min = +e.target.value;
        minValue.innerHTML = '' + min;
        courses = searchCourseByCredits(min, +maxRange.value);
    }
    else {
        var max = +e.target.value;
        maxValue.innerText = '' + max;
        courses = searchCourseByCredits(+minRange.value, max);
    }
    renderCoursesInTable(courses);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = text == null ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === ''
        ? dataCourses
        : courses.filter(function (c) { return c.name.match(nameKey); });
}
function searchCourseByCredits(min, max) {
    return dataCourses.filter(function (c) { return c.credits >= min && c.credits <= max; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return (totalCredits = totalCredits + course.credits); });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
minRange.onchange = function (e) { return renderRangesValues(e); };
maxRange.onchange = function (e) { return renderRangesValues(e); };

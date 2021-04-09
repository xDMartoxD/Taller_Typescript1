import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';

let student = new Student(
	'201914078',
	'1001309026',
	20,
	'Calle 78 #1a-22',
	'3183916882'
);

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById(
	'button-filterByName'
)!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>(
	document.getElementById('search-box')!
);
const totalCreditElm: HTMLElement = document.getElementById('total-credits')!;

const minValue: HTMLElement = document.getElementById('min-value')!;
const maxValue: HTMLElement = document.getElementById('max-value')!;

const studentTbody: HTMLElement = document.getElementById('student')!;

const minRange: HTMLInputElement = <HTMLInputElement>(
	document.getElementById('range-1')!
);
const maxRange: HTMLInputElement = <HTMLInputElement>(
	document.getElementById('range-2')!
);

renderCoursesInTable(dataCourses);
renderStudentInfo(student);

totalCreditElm.innerHTML = `Total creditos: ${getTotalCredits(dataCourses)}`;

function renderCoursesInTable(courses: Course[]): void {
	console.log('Desplegando cursos');
	courses.forEach((course) => {
		let trElement = document.createElement('tr');
		trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
		coursesTbody.appendChild(trElement);
	});
}

function renderStudentInfo(student: Student): void {
	console.log('desplegando estudiante');
	let tableContent: string = '';
	for (let i in student) {
		tableContent += `<tr> 
			<td> ${i} </td>
			<td> ${Object.getOwnPropertyDescriptor(student, i)?.value} </td>
		</tr>`;
	}
	studentTbody.innerHTML = tableContent;
}

function renderRangesValues(e: Event): void {
	clearCoursesInTable();
	let courses: Course[];
	if ((<HTMLInputElement>e.target).id === 'range-1') {
		let min: number = +(<HTMLInputElement>e.target).value;
		minValue.innerHTML = '' + min;
		courses = searchCourseByCredits(min, +maxRange.value);
	} else {
		let max: number = +(<HTMLInputElement>e.target).value;
		maxValue.innerText = '' + max;
		courses = searchCourseByCredits(+minRange.value, max);
	}
	renderCoursesInTable(courses);
}

function applyFilterByName() {
	let text = inputSearchBox.value;
	text = text == null ? '' : text;
	clearCoursesInTable();
	let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
	renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
	return nameKey === ''
		? dataCourses
		: courses.filter((c) => c.name.match(nameKey));
}

function searchCourseByCredits(min: number, max: number): Course[] {
	return dataCourses.filter((c) => c.credits >= min && c.credits <= max);
}

function getTotalCredits(courses: Course[]): number {
	let totalCredits: number = 0;
	courses.forEach((course) => (totalCredits = totalCredits + course.credits));
	return totalCredits;
}

function clearCoursesInTable() {
	while (coursesTbody.hasChildNodes()) {
		if (coursesTbody.firstChild != null) {
			coursesTbody.removeChild(coursesTbody.firstChild);
		}
	}
}

btnfilterByName.onclick = () => applyFilterByName();

minRange.onchange = (e) => renderRangesValues(e);
maxRange.onchange = (e) => renderRangesValues(e);

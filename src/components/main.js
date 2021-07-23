// ================== create Dom
const table = document.querySelector('table')
const thead = document.querySelector('thead')
const theadTr = document.querySelector('thead tr')
const tbody = document.querySelector('tbody')
const tr = tbody.querySelector('tr');
const th = tbody.querySelector('th');

const getRespons = async () => {
	const resolv = await fetch('https://city-mobil.ru/api/cars')
		.then(data => data.json())

	const { cars, tariffs_list } = resolv

	tariffs_list.forEach(name => {
		theadTr.innerHTML += `
			<th>${name}</th>
		`
	});


	cars.map(car => {

		tbody.innerHTML += `
		<tr>
		<th>${car.mark} ${car.model}</th>
		<th>${car.tariffs.Стандарт ? car.tariffs.Стандарт.year : '-'}</th>
		<th>${car.tariffs.Комфорт ? car.tariffs.Комфорт.year : '-'}</th>
		<th>${car.tariffs.Бизнес ? car.tariffs.Бизнес.year : '-'}</th>
		<th>${car.tariffs['Комфорт+'] ? car.tariffs['Комфорт+'].year : '-'}</th>
		<th>${car.tariffs.Эконом ? car.tariffs.Эконом.year : '-'}</th>
		<th>${car.tariffs.Минивен ? car.tariffs.Минивен.year : '-'}</th>
		<th>${car.tariffs.Лайт ? car.tariffs.Лайт.year : '-'}</th>
		</tr>
      `
	})



}


getRespons()

// ========================== filter table
const filterTable = () => {

	const getSort = ({ target }) => {
		const order = (target.dataset.order = -(target.dataset.order || -1));
		const index = [...target.parentNode.cells].indexOf(target);
		const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
		const comparator = (index, order) => (a, b) => order * collator.compare(
			a.children[index].innerHTML,
			b.children[index].innerHTML
		);

		for (const tBody of target.closest('table').tBodies)
			tBody.append(...[...tBody.rows].sort(comparator(index, order)));

		for (const cell of target.parentNode.cells)
			cell.classList.toggle('sorted', cell === target);
	};

	document.querySelectorAll('table thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

}

document.addEventListener('DOMContentLoaded', filterTable);

// =================================== search
const input = document.querySelector('.input');

function tableSearch({ target }) {

	let regPhrase = new RegExp(target.value, 'i');
	let flag = false;
	for (let i = 0; i < tbody.rows.length; i++) {
		flag = false;
		for (let j = tbody.rows[i].cells.length - 1; j >= 0; j--) {
			flag = regPhrase.test(tbody.rows[i].cells[j].innerHTML.toUpperCase());
			if (flag) break;
		}
		if (flag) {
			tbody.rows[i].style.display = "";
		} else {
			tbody.rows[i].style.display = "none";
		}

	}
}

input.addEventListener('input', tableSearch)

// ==================== clickAvto
const rezylt = document.querySelector('.rezuit__value')

const rezultValue = (evt) => {
	const clicEl = evt.target.parentNode.innerText
	const year = evt.target.innerText

	if( evt.target.cellIndex === 0){
		return
	}
	if(year === '-'){
return
	}


	let reg = /(\w+)\s(\w+)\s/igm
	let regA = /(\d\w\d+)/igm
	let auto = String(clicEl).match(reg).join('')
 let a = auto.replace(regA, ' ')


	rezylt.innerHTML = `Выбран автомобиль ${a} ${year} года выпуска`

}

table.addEventListener('click', rezultValue)

// =============== cangeImage
let rotate 
const cangeImage = () => {
	const img = document.querySelector('.image')
	
	img.classList.toggle('up')
}
thead.addEventListener('click', cangeImage)
const checkBox = document.querySelector('#toggle');
const html = document.querySelector('html');
const search = document.querySelector('#searchbtn');
const filterRegion = document.querySelector('#select');
const goBack = document.querySelector('#arrowBack');
const nations = document.querySelector('#countries');
// let isClicked = true;

// dark mode
const toggleDarkMode = function () {
	if (checkBox.checked) {
		html.classList.add('dark');
		document.querySelector('#moon').textContent = 'Light mode';
	} else {
		html.classList.remove('dark');
		document.querySelector('#moon').textContent = 'Dark mode';
	}
};
toggleDarkMode();
checkBox.addEventListener('click', toggleDarkMode);

nations.innerHTML = `<div class="holder absolute w-4/5 h-2/4 flex flex-col gap-3 justify-center items-center">
<div
	class="anime w-16 h-16 rounded-full border-8 border-t-transparent border-b-transparent border-l-DarkBlue dark:border-l-white border-r-DarkBlue dark:border-r-white flex justify-center items-center">
	<span class="bg-BgDarkBlue dark:bg-white rounded-full w-2 h-2"></span>
</div>
<h3 class="text-xl text-DarkBlue dark:text-white font-bold tracking-wider uppercase">Fetching Data......</h3>
</div>`;

fetch('https://restcountries.com/v2/all')
	.then((res) => res.json())
	.then((result) => {
		console.log(result);
		const displayCountry = () => {
			Divs = '';
			result.map((country) => {
				let El = `<div class=" country  overflow-hidden   grid grid-rows-1 grid-flow-row place-items-stretch gap-6 bg-white dark:bg-DarkBlue bg-opacity-30 shadow-md shadow-neutral-300 dark:shadow-BgDarkBlue rounded-lg object-contain" >
				
				<img src=${country.flags.png} alt="" class="rounded-t-lg  w-full h-52 object-center shadow-md ">
				
			   <div class=" text-TextDarkBlue dark:text-white px-8 py-6 flex flex-col justify-center">
			   <h3 class="text-xl font-extrabold mb-2 tracking-wider cursor-pointer">${country.name}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider "><span class=" font-semibold tracking-wider">Region: </span> ${country.region}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider"><span class=" font-semibold tracking-wider">Population:</span> ${country.population}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider"><span class=" font-semibold tracking-wider">Capital:</span> ${country.capital}</h3>
			   </div> 
			</div>`;

				Divs += El;
			});
			nations.innerHTML = Divs;
		};

		// search country function'
		function searchCountry(e) {
			Divs = '';
			// console.log(e.target.value);
			const searchResults = result.filter((obj) =>
				obj.name.toLowerCase().includes(e.target.value.toLowerCase())
			);

			searchResults.map((searchObj) => {
				// console.log(searchObj);
				let El = `<div class="country overflow-hidden   grid grid-rows-1 grid-flow-row place-items-stretch gap-6 bg-white dark:bg-DarkBlue bg-opacity-30 shadow-md shadow-neutral-300 dark:shadow-BgDarkBlue rounded-lg object-contain">
			
				<img src=${searchObj.flags.png} alt="" class="rounded-t-lg  w-full h-52 object-center shadow-md ">
				
			   <div class=" text-TextDarkBlue dark:text-white px-8 py-6 flex flex-col justify-center">
			   <h3 class="text-xl font-extrabold mb-2 tracking-wider cursor-pointer">${searchObj.name}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider"><span class=" font-semibold tracking-wider">Region: </span> ${searchObj.region}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider"><span class=" font-semibold tracking-wider">Population:</span> ${searchObj.population}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider"><span class=" font-semibold tracking-wider">Capital:</span> ${searchObj.capital}</h3>
			   </div> 
			</div>`;

				Divs += El;
			});
			nations.innerHTML = Divs;
		}

		// filter by continents
		function filterCountry(e) {
			Divs = '';
			// console.log(e.target.value);

			const filterResults = result.filter((reg) =>
				reg.region.includes(e.target.value)
			);
			// console.log(filterResults);

			filterResults.map((filterObj) => {
				let El = `<div class="country overflow-hidden   grid grid-rows-1 grid-flow-row place-items-stretch gap-6 bg-white dark:bg-DarkBlue bg-opacity-30 shadow-md shadow-neutral-300 dark:shadow-BgDarkBlue rounded-lg object-contain">
			
				<img src=${filterObj.flags.png} alt="" class="rounded-t-lg  w-full h-52 object-center shadow-md ">
				
			   <div class=" text-TextDarkBlue dark:text-white px-8 py-6 flex flex-col justify-center">
			   <h3 class="text-xl font-extrabold mb-2 tracking-wider cursor-pointer">${filterObj.name}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider"><span class=" font-semibold tracking-wider">Region: </span> ${filterObj.region}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider"><span class=" font-semibold tracking-wider">Population:</span> ${filterObj.population}</h3>
			   <h3 class=" pb-1 text-sm  font-medium tracking-wider"><span class=" font-semibold tracking-wider">Capital:</span> ${filterObj.capital}</h3>
			   </div> 
			</div>`;

				Divs += El;
			});
			nations.innerHTML = Divs;
		}

		// country detailed
		const countryDetailed = (e) => {
			let targetDiv = e.target.closest('.country');
			Divs = '';
			// console.log(targetDiv);

			if (targetDiv) {
				// console.log(targetDiv.childNodes[3].children[0].textContent);
				goBack.classList.remove('hidden');
				goBack.classList.add('flex');
				filterRegion.classList.add('hidden');
				document.querySelector('#searchDiv').classList.add('hidden');
				const targetNation = result.filter((nat) =>
					nat.name
						.toLowerCase()
						.includes(
							targetDiv.childNodes[3].children[0].textContent.toLowerCase()
						)
				);
				// console.log(targetNation);
				targetNation.map((targetDet) => {
					let El = `
					
					<div class=" absolute grid lg:grid-cols-2 grid-rows-1 gap-14 w-4/5 m-auto py-4">
						<div class="flex">
						  <img src="${targetDet.flags.png}" class=" shadow-lg" />
						</div>
						<div class="flex flex-col justify-center gap-8 text-TextDarkBlue dark:text-white">
							<h2 class="text-2xl  font-extrabold tracking-wider ">${targetDet.name}</h2>
							<div class="flex flex-col md:flex-row justify-start  items-start md:gap-20 gap-8">
								<ul>
									<h2 class="pb-1 text-sm  font-medium tracking-wider capitalize"> <span class="font-bold">Native name:</span> ${
										targetDet.nativeName
									}</h2>
									<h2 class="pb-1 text-sm  font-medium tracking-wider capitalize"> <span class="font-bold">population:</span> ${
										targetDet.population
									}</h2>
									<h2 class="pb-1 text-sm  font-medium tracking-wider capitalize"> <span class="font-bold">Region:</span> ${
										targetDet.region
									}</h2>
									<h2 class="pb-1 text-sm  font-medium tracking-wider capitalize"> <span class="font-bold">SubRegion:</span> ${
										targetDet.subregion
									}</h2>
									<h2 class="pb-1 text-sm  font-medium tracking-wider capitalize"> <span class="font-bold">capital:</span> ${
										targetDet.capital
									}</h2>
								</ul>
								<ul>
									<h2 class="pb-1 text-sm  font-medium tracking-wider capitalize"> <span class="font-bold">Top level domain:</span> ${
										targetDet.topLevelDomain
									}</h2>
									<h2 class="pb-1 text-sm  font-medium tracking-wider capitalize" > <span class="font-bold">Currencies:</span> ${targetDet.currencies.map(
										(elem) => elem.name
									)}</h2>
                                    <h2 id="lan class="pb-1 text-sm  font-medium tracking-wider capitalize"> <span class="font-bold">languages:</span> ${targetDet.languages.map(
																			(elem) => elem.name
																		)}
									</h2>
								</ul>
							</div>
							<div class = "flex gap-2"> 
							
							  <h2 class="font-bold tracking-wider capitalize ">border countries:</h2>
							  <div class="flex flex-row ">
							      ${targetDet.borders ? targetDet.borders : 'none'}
							  </div>
				
							</div>
						</div>
					</div>
					
					`;

					Divs += El;
				});
				nations.innerHTML = Divs;
			}
		};

		displayCountry();
		nations.addEventListener('click', countryDetailed);

		filterRegion.addEventListener('change', filterCountry);
		search.addEventListener('input', searchCountry);

		goBack.addEventListener('click', () => {
			goBack.classList.add('hidden');
			filterRegion.classList.remove('hidden');
			document.querySelector('#searchDiv').classList.remove('hidden');
			displayCountry();
		});
	})
	.catch((error) => {
		console.log(error.message);
		nations.innerHTML =
			'<h2 class="absolute w-4/5 h-1/4 flex flex-col gap-3 justify-center items-center font-bold  text-TextDarkBlue text-2xl tracking-wider capitalize">failed to load data...</h2>';
	});

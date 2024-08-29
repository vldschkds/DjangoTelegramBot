function changeButton(mediaQuery) {
    if (mediaQuery.matches) {
        document.querySelector(`#btn_league_england`).innerHTML = 'EPL';
        document.querySelector(`#btn_league_spain`).innerHTML = 'LAL';
        document.querySelector(`#btn_league_italy`).innerHTML = 'SA';
        document.querySelector(`#btn_league_germany`).innerHTML = 'BUN';
        document.querySelector(`#btn_league_france`).innerHTML = 'L1';
    }
}

const mediaQuery = window.matchMedia('(max-width: 600px)');

changeButton(mediaQuery);


function fetchTable(league) {
    fetch(`/league/${league}/`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

//            function checkName() {
//                if (league === 'england') {
//                    document.querySelector(`#btn_league_${league}`).innerHTML = 'EPL';
//                }
//                else if (league === 'spain') {
//                    document.querySelector(`#btn_league_${league}`).innerHTML = 'LAL';
//                }
//                else if (league === 'italy') {
//                    document.querySelector(`#btn_league_${league}`).innerHTML = 'SA';
//                }
//                else if (league === 'germany') {
//                    document.querySelector(`#btn_league_${league}`).innerHTML = 'BUN';
//                }
//                else if (league === 'france') {
//                    document.querySelector(`#btn_league_${league}`).innerHTML = 'L1';
//                }
//            }

            let tableContainer = document.getElementById(`table-container`);
            tableContainer.innerHTML = '';

            const table = document.createElement('table');
            table.border = '1';

            const thead = document.createElement('thead');
            const tr = document.createElement('tr');

            data.headers.forEach(header => {
                const th = document.createElement('th');
                th.appendChild(document.createTextNode(header));
                tr.appendChild(th);
            });

            thead.appendChild(tr);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');

            for (let i = 0; i < data.rows.length; i++) {
                const tr = document.createElement('tr');
                for (let k = 0; k < data.rows[i].length; k++) {
                    const td = document.createElement('td');
                    if (k == 1){
                        const img = document.createElement('img');
                        const div = document.createElement('div');
                        div.className = 'name_team';
                        img.src = data.icons[i];
                        img.style.width = '50px';
                        img.style.height = '35px';

                        td.appendChild(img)
                        td.appendChild(document.createTextNode(data.rows[i][k]))

                        tr.appendChild(td);
                    }
                    else{
                        td.appendChild(document.createTextNode(data.rows[i][k]));
                        tr.appendChild(td);
                    }
                }
                tbody.appendChild(tr);
            };

            table.appendChild(tbody);
            tableContainer.appendChild(table);

            // Легенда
            const table_legend = document.createElement('div');
            table_legend.className = 'table_legend';

            const ul = document.createElement('ul');
            ul.className = 'ul_legend';

            // Лига Чемпионов
            const champions_league = document.createElement('li');
            const champions_color = document.createElement('div');
            const champions_name = document.createElement('div');
            champions_name.innerHTML += 'Лига Чемпионов';

            champions_league.className = 'champions_league';
            champions_color.className = 'champions_color';
            champions_name.className = 'champions_name';

            champions_league.appendChild(champions_color);
            champions_league.appendChild(champions_name);

            ul.appendChild(champions_league);

            // Лига Чемпионов (Квалификация)
            const qual_league = document.createElement('li');
            const qual_color = document.createElement('div');
            const qual_name = document.createElement('div');
            qual_name.innerHTML += 'Лига Чемпионов(Квалификация)';

            qual_league.className = 'qual_league';
            qual_color.className = 'qual_color';
            qual_name.className = 'qual_name';

            qual_league.appendChild(qual_color);
            qual_league.appendChild(qual_name);

            ul.appendChild(qual_league);


            //Лига Европы
            const europe_league = document.createElement('li');
            const europe_color = document.createElement('div');
            const europe_name = document.createElement('div');
            europe_name.innerHTML += 'Лига Европы';

            europe_league.className = 'europe_league';
            europe_color.className = 'europe_color';
            europe_name.className = 'europe_name';

            europe_league.appendChild(europe_color);
            europe_league.appendChild(europe_name);

            ul.appendChild(europe_league);

            //Лига Конференций
            const conference_league = document.createElement('li');
            const conference_color = document.createElement('div');
            const conference_name = document.createElement('div');
            conference_name.innerHTML += 'Лига Конференций(Квалификация)';

            conference_league.className = 'conference_league';
            conference_color.className = 'conference_color';
            conference_name.className = 'conference_name';

            conference_league.appendChild(conference_color);
            conference_league.appendChild(conference_name);

            ul.appendChild(conference_league);

            //Понижение Лиги(Квалификация)
            const requal_league = document.createElement('li');
            const requal_color = document.createElement('div');
            const requal_name = document.createElement('div');
            requal_name.innerHTML += 'Понижение Лиги(Квалификация)';

            requal_league.className = 'requal_league';
            requal_color.className = 'requal_color';
            requal_name.className = 'requal_name';

            requal_league.appendChild(requal_color);
            requal_league.appendChild(requal_name);

            ul.appendChild(requal_league);

            //Понижение Лиги
            const relegation_league = document.createElement('li');
            const relegation_color = document.createElement('div');
            const relegation_name = document.createElement('div');
            relegation_name.innerHTML += 'Понижение Лиги';

            relegation_league.className = 'relegation_league';
            relegation_color.className = 'relegation_color';
            relegation_name.className = 'relegation_name';

            relegation_league.appendChild(relegation_color);
            relegation_league.appendChild(relegation_name);

            ul.appendChild(relegation_league);

            //Добавление Ul
            table_legend.appendChild(ul);

            //Table Foot

            const table_foot = document.createElement('div');
            table_foot.className = 'table_foot';

            const author_name = document.createElement('div');
            author_name.className = 'author_name';
            author_name.innerHTML += '© vldschkds'
            table_foot.appendChild(author_name);

            tableContainer.appendChild(table_legend);
            tableContainer.appendChild(table_foot);

            // Логика открытия

            function tableDef(){
                if (tableContainer.className === "") {
                    tableContainer.className = `${league}`;
                } else if (tableContainer.className === `${league}`) {
                    tableContainer.className = "two";
                }
                else {
                    tableContainer.className = "";
                    setTimeout(() => { tableContainer.className = `${league}`; }, 250);
                }
            }

            tableDef();


            setTimeout(() => {
                if (["england", "spain", "italy", "germany"].includes(tableContainer.className)) {
                    const tbody_all =  document.querySelector('#table-container tbody');
                    const trElements = tbody_all.querySelectorAll('tr');
                    for (let i = 0; i < trElements.length; i++) {
                        if ([0, 1, 2, 3].includes(i)) {
                            trElements[i].className = 'af_blue_1';
                        }
                        else if (i === 4) {
                            trElements[i].className = 'af_yellow';
                        }
                    }
                }
                if (tableContainer.className === "england") {
                    const tbody_en =  document.querySelector('#table-container tbody');
                    const trElements = tbody_en.querySelectorAll('tr');
                    for (let i = 17; i < trElements.length; i++) {
                        trElements[i].className = 'af_red';
                    }
                }
                if (tableContainer.className === "spain") {
                    const tbody_sp =  document.querySelector('#table-container tbody');
                    const trElements = tbody_sp.querySelectorAll('tr');
                    trElements[5].className = 'af_green';
                    for (let i = 17; i < trElements.length; i++) {
                        trElements[i].className = 'af_red';
                    }
                }
                if (tableContainer.className === "italy") {
                    const tbody_it =  document.querySelector('#table-container tbody');
                    const trElements = tbody_it.querySelectorAll('tr');
                    trElements[5].className = 'af_green';
                    for (let i = 17; i < trElements.length; i++) {
                        trElements[i].className = 'af_red';
                    }
                }
                if (tableContainer.className === "germany") {
                    const tbody_ger =  document.querySelector('#table-container tbody');
                    const trElements = tbody_ger.querySelectorAll('tr');
                    trElements[5].className = 'af_green';
                    trElements[15].className = 'af_pink';
                    trElements[16].className = 'af_red';
                    trElements[17].className = 'af_red';
                }
                if (tableContainer.className === "france") {
                    const tbody_fr =  document.querySelector('#table-container tbody');
                    const trElements = tbody_fr.querySelectorAll('tr');
                    for (let i = 0; i < trElements.length; i++) {
                        if ([0, 1, 2].includes(i)) {
                            trElements[i].className = 'af_blue_1';
                        }
                        else if (i == 3) {
                            trElements[i].className = 'af_blue_2';
                        }
                        else if (i === 4) {
                            trElements[i].className = 'af_yellow';
                        }
                    }
                    trElements[5].className = 'af_green';
                    trElements[15].className = 'af_pink';
                    trElements[16].className = 'af_red';
                    trElements[17].className = 'af_red';
                }

            }, 250);

        });
}
function fetchTable(league) {
    fetch(`/league/${league}/`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }


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
                        img.src = data.icons[i];
                        img.style.width = '50px';
                        img.style.height = '35px';
                        td.appendChild(img)
                        td.appendChild(document.createTextNode(data.rows[i][k]));
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
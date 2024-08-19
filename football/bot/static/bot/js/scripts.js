function fetchTable(league) {
    fetch(`/league/${league}/`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            let tableContainer = document.getElementById('table-container');
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

            tableContainer.style.display = (tableContainer.style.display == "") ? "none" : "";

        });
}
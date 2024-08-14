function fetchTable(league) {
    fetch(`/league/${league}/`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            const tableContainer = document.getElementById('table-container');
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

            data.rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.appendChild(document.createTextNode(cell));
//                    data.icons.forEach(icon => {
//                        const a = document.createElement('a').href;
//                        a.href = icon;
//                        td.appendChild(a);
//                    })
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            tableContainer.appendChild(table);

        });
}
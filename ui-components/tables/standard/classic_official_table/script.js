document.addEventListener('DOMContentLoaded', function () {
    // Load JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(tablesData => {
            // Navigation initialization
            function initNavigation() {
                const navList = document.getElementById('nav-list');

                // Clear navigation list
                navList.innerHTML = '';

                // Add navigation items
                tablesData.forEach((table, index) => {
                    const navItem = document.createElement('li');
                    navItem.className = 'nav-item';

                    const navLink = document.createElement('a');
                    navLink.href = `#stats-table-container-${index}`;
                    navLink.className = 'nav-link';
                    navLink.textContent = table.UNIVERSITY_NAME;

                    navItem.appendChild(navLink);
                    navList.appendChild(navItem);
                });

                const navLinks = document.querySelectorAll('.nav-link');

                navLinks.forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();

                        // Remove active class from all links
                        navLinks.forEach(item => item.classList.remove('active'));

                        // Add active class to current link
                        this.classList.add('active');

                        // Smooth scroll to target block
                        const targetId = this.getAttribute('href');
                        document.querySelector(targetId).scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    });
                });

                // Activate first link by default
                if (navLinks.length > 0) {
                    navLinks[0].classList.add('active');
                }
            }

            // Tables initialization
            function initTables() {
                const container = document.getElementById('stats-table-container');

                // Clear container
                container.innerHTML = '';

                tablesData.forEach((uniData, index) => {
                    const uniContainer = document.createElement('div');
                    uniContainer.id = `stats-table-container-${index}`;
                    uniContainer.className = 'university-container';

                    const title = document.createElement('h5');
                    title.align = 'center';
                    title.textContent = `${uniData.UNIVERSITY_NAME} - ${uniData.EDUCATION_FORM} 2025/2026`;

                    const contentDiv = document.createElement('div');
                    contentDiv.id = `table-content-${index}`;

                    uniContainer.appendChild(title);
                    uniContainer.appendChild(contentDiv);
                    container.appendChild(uniContainer);

                    // Add loading indicator
                    contentDiv.innerHTML = '<div class="loading">Loading data...</div>';

                    // Simulate data loading
                    setTimeout(() => {
                        processUniversityData(contentDiv, index, uniData);
                    }, 500);
                });
            }

            // Process university data
            function processUniversityData(contentDiv, index, uniData) {
                contentDiv.innerHTML = '';

                if (uniData.DATA && uniData.DATA.length > 0) {
                    uniData.DATA.forEach((form, formIndex) => {
                        // Check if DIRECTIONS exists
                        const directions = form.DIRECTIONS || form.DIRECTIONS;
                        if (directions && directions.length > 0) {
                            createTable(contentDiv.id, `form-${formIndex}`, formIndex, uniData);
                        }
                    });
                } else {
                    contentDiv.innerHTML = '<div class="no-data">No data to display</div>';
                }
            }

            // Create table
            function createTable(parentId, type, formIndex, uniData) {
                const tableId = `table-${parentId}-${type}`;
                const form = uniData.DATA[formIndex];
                const parentElement = document.getElementById(parentId);

                const tableWrapper = document.createElement('div');
                tableWrapper.className = 'table-wrapper';

                const formTitle = document.createElement('h5');
                formTitle.align = 'center';
                formTitle.textContent = `${form.FORM} form of education`;

                const table = document.createElement('table');
                table.className = 'cell-border compact stripe admission-stats-table';
                table.id = tableId;

                table.innerHTML = `
                    <thead>
                        <tr>
                            <th rowspan="3" colspan="1" class="min-width_7">Direction/Specialty</th>
                            <th rowspan="1" colspan="15" style="text-align:center">Budget</th>
                            <th rowspan="2" colspan="4" style="text-align:center">Contract</th>
                        </tr>
                        <tr>
                            <th rowspan="2" colspan="1" class="min-width_3" style="max-width: 80px;">Lists</th>
                            <th rowspan="2" colspan="1" class="min-width_5" style="max-width: 120px;">Considered for admission</th>
                            <th rowspan="2" colspan="1" class="min-width_1">Plan</th>
                            <th rowspan="1" colspan="3">Total submitted</th>
                            <th rowspan="1" colspan="2">Special quota</th>
                            <th rowspan="1" colspan="2">Separate quota</th>
                            <th rowspan="1" colspan="2">Target quota</th>
                            <th rowspan="1" colspan="3">Main places</th>
                        </tr>
                        <tr>
                            <th rowspan="1" colspan="1" class="min-width_1">total</th>
                            <th rowspan="1" colspan="1" class="min-width_3">By 1st priority</th>
                            <th rowspan="1" colspan="1" class="min-width_2">Agreement</th>
                            <th rowspan="1" colspan="1" class="min-width_1">plan</th>
                            <th rowspan="1" colspan="1" class="min-width_2">submitted</th>
                            <th rowspan="1" colspan="1" class="min-width_1">plan</th>
                            <th rowspan="1" colspan="1" class="min-width_2">submitted</th>
                            <th rowspan="1" colspan="1" class="min-width_1">plan</th>
                            <th rowspan="1" colspan="1" class="min-width_2">submitted</th>
                            <th rowspan="1" colspan="1" class="min-width_1">plan</th>
                            <th rowspan="1" colspan="1" class="min-width_2">submitted</th>
                            <th rowspan="1" colspan="1" class="min-width_3">Current passing score</th>

                            <th rowspan="1" colspan="1" class="min-width_3" style="max-width: 80px;">Lists</th>
                            <th rowspan="1" colspan="1" class="min-width_5">Considered for admission</th>
                            <th rowspan="1" colspan="1" class="min-width_1">Plan</th>
                            <th rowspan="1" colspan="1" class="min-width_2">Submitted</th>
                        </tr>
                    </thead>
                    <tbody id="table-body-${tableId}" class="table-body"></tbody>
                `;

                tableWrapper.appendChild(formTitle);
                tableWrapper.appendChild(table);
                parentElement.appendChild(tableWrapper);

                // Fill table with data
                fillingTable(tableId, formIndex, uniData);
            }

            // Fill table with data
            function fillingTable(tableId, formIndex, uniData) {
                const form = uniData.DATA[formIndex];
                const tableBody = document.getElementById(`table-body-${tableId}`);

                tableBody.innerHTML = '';

                // Handle both DIRECTIONS and DIRECTIONS (if there was a typo)
                const directions = form.DIRECTIONS || form.DIRECTIONS;

                if (directions && directions.length > 0) {
                    directions.forEach(direction => {
                        const directionCode = direction.DIRECTION.match(/[\d.]+/)[0];
                        const listLink = generateRatingLink(directionCode, form, uniData, 's');
                        const reviewLink = generateRatingLink(directionCode, form, uniData, 'r');

                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="min-width_7">${direction.DIRECTION}</td>
                            <td class="min-width_3" style="max-width: 80px;"><a href="${listLink}" target="_blank">Applicant lists</a></td>
                            <td class="min-width_5" style="max-width: 120px;"><a href="${reviewLink}" target="_blank">Competition list</a></td>
                            <td class="min-width_1">${direction.PLAN_B}</td>
                            <td class="min-width_1">${direction.TOTAL_B}</td>
                            <td class="min-width_3">${direction.PRIORITY1_B}</td>
                            <td class="min-width_2">${direction.AGREEMENT_B}</td>
                            <td class="min-width_1">${direction.PLANOK_B}</td>
                            <td class="min-width_2">${direction.SUBMITTEDOK_B}</td>
                            <td class="min-width_1">${direction.PLANOTK_B}</td>
                            <td class="min-width_2">${direction.SUBMITTEDOTK_B}</td>
                            <td class="min-width_1">${direction.PLANTSK_B}</td>
                            <td class="min-width_2">${direction.SUBMITTEDTSK_B}</td>
                            <td class="min-width_1">${direction.PLANOSM_B}</td>
                            <td class="min-width_2">${direction.SUBMITTEDOSM_B}</td>
                            <td class="min-width_3">${direction.CURRENT_PB}</td>
                            <td class="min-width_3" style="max-width: 80px;"><a href="${listLink}" target="_blank">Applicant lists</a></td>
                            <td class="min-width_5">${direction.RKZACH_D}</td>
                            <td class="min-width_1">${direction.PLAN_D}</td>
                            <td class="min-width_2">${direction.SUBMITTED_D}</td>
                        `;
                        tableBody.appendChild(row);
                    });

                    // Initialize DataTables
                    $.get("//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json", function (langData) {
                        $(`#${tableId}`).DataTable({
                            "paging": false,
                            "searching": false,
                            "fixedHeader": false,
                            "info": false,
                            "autoWidth": false,
                            "language": langData,
                        });
                    });
                }
            }

            // Generate rating link
            function generateRatingLink(directionCode, form, uniData, type) {
                // This function should generate appropriate links
                return "#";
            }

            // Initialize navigation and tables
            initNavigation();
            initTables();
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
            document.getElementById('stats-table-container').innerHTML = '<div class="error">Error loading data. Please try again later.</div>';
        });
});
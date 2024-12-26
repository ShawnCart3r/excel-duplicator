function filterDuplicates() {
    const input = document.getElementById("dataInput").value.trim();

    // Parse the input data
    const rows = input.split("\n").map(row => row.split("\t"));
    const headers = ["customerName", "address", "email"];
    const data = rows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index]?.trim() || "";
        });
        return obj;
    });

    // Find duplicates
    const countMap = new Map();
    data.forEach(row => {
        const key = `${row.customerName}|${row.address}|${row.email}`;
        countMap.set(key, (countMap.get(key) || 0) + 1);
    });

    const duplicates = data.filter(row => {
        const key = `${row.customerName}|${row.address}|${row.email}`;
        return countMap.get(key) > 1;
    });

    // Display duplicates in the table
    const duplicatesTable = document.querySelector("#duplicatesTable tbody");
    duplicatesTable.innerHTML = ""; // Clear previous data

    duplicates.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.customerName}</td>
            <td>${row.address}</td>
            <td>${row.email}</td>
        `;
        duplicatesTable.appendChild(tr);
    });
}
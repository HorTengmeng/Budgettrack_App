document.addEventListener("DOMContentLoaded", () => {

    const $ = (id) => document.getElementById(id);

    const amountInput = $("amount");
    const remarkInput = $("remark");
    const addBtn = $("addBtn");
    const clearBtn = $("clearBtn");
    const tableBody = $("tableBody");
    const totalEntriesText = $("totalEntries");
    const currentBalanceText = $("currentBalance");

    
    const budgetManager = () => {
        let entries = JSON.parse(localStorage.getItem("budgetEntries")) || [];
        let balance = 0;

        const save = () =>
            localStorage.setItem("budgetEntries", JSON.stringify(entries));

        const addEntry = (amount, remark) => {
            balance += amount;
            const entry = { amount, remark };

            entries = [...entries, entry];

            save();
            render();
        };

        const clearAll = () => {
            entries = []; 
            localStorage.removeItem("budgetEntries"); 
            render(); 
        };

        const render = () => {
            tableBody.innerHTML = "";
            balance = 0;

            entries.forEach((entry, index) => {
                balance += entry.amount;

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${entry.amount}</td>
                    <td>${entry.remark}</td>
                    <td>${balance.toFixed(2)}</td>
                `;
                tableBody.appendChild(row);
            });

            totalEntriesText.textContent = `Total Entries : ${entries.length}`;
            currentBalanceText.textContent = `Current Balance : ${balance.toFixed(2)}`;
        };

        return { addEntry, render, clearAll };
    };

    const app = budgetManager();
    app.render();

    addBtn.addEventListener("click", () => {
        const amount = Number(amountInput.value);
        const remark = remarkInput.value.trim();

        if (!amount || !remark) {
            alert("Invalid input");
            return;
        }

        app.addEntry(amount, remark);

        amountInput.value = "";
        remarkInput.value = "";
    });

    clearBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all data?")) {
            app.clearAll();
        }
    });

});
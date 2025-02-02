const editores = ["Bruno", "Rhenan", "Flávia", "Andressa"];
const tbody = document.getElementById("calendario");
const hoje = new Date();
const ano = hoje.getFullYear();
const mesSelect = document.getElementById("mesSelect");
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let mes = hoje.getMonth();
const diasNoMes = 31;

let escala = JSON.parse(localStorage.getItem("escalaEditores")) || {};

meses.forEach((nome, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = nome;
    mesSelect.appendChild(option);
});

mesSelect.value = mes;

function salvarEscala() {
    localStorage.setItem("escalaEditores", JSON.stringify(escala));
}

function atualizarCalendario() {
    tbody.innerHTML = "";
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const tr = document.createElement("tr");
        const tdData = document.createElement("td");
        const tdEditor = document.createElement("td");
        const select = document.createElement("select");

        tdData.textContent = `${dia} de ${meses[mes]} de ${ano}`;

        editores.forEach(editor => {
            const option = document.createElement("option");
            option.value = editor;
            option.textContent = editor;
            select.appendChild(option);
        });

        select.value = escala[`${dia}-${mes}`] || "";

        if (!escala[`${dia}-${mes}`]) {
            tdEditor.style.color = "red"; 
        } else {
            tdEditor.style.color = "#50C878"; 
        }

        select.addEventListener("change", () => {
            escala[`${dia}-${mes}`] = select.value;
            salvarEscala();
            tdEditor.style.color = "#50C878";
        });

        tdEditor.appendChild(select);
        tr.appendChild(tdData);
        tr.appendChild(tdEditor);
        tbody.appendChild(tr);
    }
}

mesSelect.addEventListener("change", () => {
    mes = parseInt(mesSelect.value);
    atualizarCalendario();
});

atualizarCalendario();

let saleItems = [];

function initSales() {
  addSaleRow();
}

function addSaleRow() {
  const tbody = document.querySelector("#sale-table tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input class="input" placeholder="Producto"></td>
    <td><input type="number" class="input" value="1" min="1"></td>
    <td><input type="number" class="input" value="0"></td>
    <td><span>0</span></td>
    <td><button onclick="this.closest('tr').remove(); calcSale()">🗑</button></td>
  `;

  tbody.appendChild(row);

  row.querySelectorAll("input").forEach(i =>
    i.addEventListener("input", calcSale)
  );

  calcSale();
}

function calcSale() {
  let total = 0;
  document.querySelectorAll("#sale-table tbody tr").forEach(row => {
    const qty = +row.children[1].querySelector("input").value;
    const price = +row.children[2].querySelector("input").value;
    const rowTotal = qty * price;
    row.children[3].innerText = rowTotal.toFixed(2);
    total += rowTotal;
  });

  document.getElementById("sale-subtotal").innerText = `$${total.toFixed(2)}`;
}

function saveSale() {
  alert("Venta lista para guardar (backend luego)");
}
function buscarVentas() {
  const desde = document.getElementById("fechaDesde").value;
  const hasta = document.getElementById("fechaHasta").value;
  const cliente = document.getElementById("clienteFiltro").value;

  console.log("Buscar ventas con:");
  console.log({ desde, hasta, cliente });

  // Próximo paso:
  // fetch(`/api/ventas?desde=${desde}&hasta=${hasta}&cliente=${cliente}`)
}


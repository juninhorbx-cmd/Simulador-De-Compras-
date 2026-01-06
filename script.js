let balance = 0;
const coinSound = document.getElementById("coinSound");

// Lista de 50 itens (igual versão anterior)
const items = [
  {name:"Celular simples", price:1500, max:20, emoji:"📱"},
  {name:"Smartphone top", price:6000, max:10, emoji:"📱"},
  {name:"Notebook", price:4500, max:10, emoji:"💻"},
  {name:"PC gamer", price:12000, max:5, emoji:"🖥️"},
  {name:"Videogame", price:5000, max:8, emoji:"🎮"},
  {name:"TV 4K", price:6500, max:6, emoji:"📺"},
  {name:"Moto popular", price:18000, max:5, emoji:"🏍️"},
  {name:"Carro popular", price:80000, max:4, emoji:"🚗"},
  {name:"Carro de luxo", price:450000, max:2, emoji:"🚗"},
  {name:"Caminhonete", price:320000, max:2, emoji:"🚙"},
  {name:"Ônibus", price:600000, max:1, emoji:"🚌"},
  {name:"Caminhão", price:700000, max:1, emoji:"🚚"},
  {name:"Casa simples", price:250000, max:3, emoji:"🏠"},
  {name:"Apartamento", price:400000, max:3, emoji:"🏢"},
  {name:"Casa de luxo", price:1200000, max:2, emoji:"🏡"},
  {name:"Mansão", price:3500000, max:1, emoji:"🏰"},
  {name:"Prédio residencial", price:8000000, max:1, emoji:"🏬"},
  {name:"Shopping", price:120000000, max:1, emoji:"🏢"},
  {name:"Boi", price:10000, max:50, emoji:"🐂"},
  {name:"Vaca", price:8000, max:40, emoji:"🐄"},
  {name:"Fazenda pequena", price:15000000, max:1, emoji:"🌾"},
  {name:"Fazenda grande", price:60000000, max:1, emoji:"🌾"},
  {name:"Trator", price:450000, max:2, emoji:"🚜"},
  {name:"Colheitadeira", price:1200000, max:1, emoji:"🚜"},
  {name:"Loja pequena", price:300000, max:2, emoji:"🏪"},
  {name:"Restaurante", price:650000, max:2, emoji:"🍴"},
  {name:"Posto de gasolina", price:5000000, max:1, emoji:"⛽"},
  {name:"Supermercado", price:8500000, max:1, emoji:"🏬"},
  {name:"Fábrica", price:35000000, max:1, emoji:"🏭"},
  {name:"Empresa multinacional", price:500000000, max:1, emoji:"🏢"},
  {name:"Lancha", price:1500000, max:1, emoji:"🚤"},
  {name:"Iate", price:12000000, max:1, emoji:"🛥️"},
  {name:"Navio cargueiro", price:250000000, max:1, emoji:"🚢"},
  {name:"Helicóptero", price:18000000, max:1, emoji:"🚁"},
  {name:"Avião executivo", price:95000000, max:1, emoji:"✈️"},
  {name:"Jato particular", price:180000000, max:1, emoji:"✈️"},
  {name:"Academia", price:500000, max:2, emoji:"🏋️‍♂️"},
  {name:"Cinema", price:4000000, max:1, emoji:"🎬"},
  {name:"Parque de diversão", price:45000000, max:1, emoji:"🎡"},
  {name:"Estádio pequeno", price:70000000, max:1, emoji:"🏟️"},
  {name:"Time de futebol", price:1500000000, max:1, emoji:"⚽"},
  {name:"Canal de mídia", price:25000000, max:1, emoji:"📺"},
  {name:"Relógio de luxo", price:250000, max:3, emoji:"⌚"},
  {name:"Joias", price:1000000, max:3, emoji:"💎"},
  {name:"Coleção de carros raros", price:50000000, max:1, emoji:"🚗"},
  {name:"Ilha particular", price:900000000, max:1, emoji:"🏝️"},
  {name:"Hotel de luxo", price:220000000, max:1, emoji:"🏨"},
  {name:"Resort internacional", price:600000000, max:1, emoji:"🏖️"},
  {name:"Cidade pequena", price:3000000000, max:1, emoji:"🏘️"},
  {name:"País fictício", price:9500000000, max:1, emoji:"🌍"},
];

let inventory = {};

// Começar jogo com animação de saldo
function startGame() {
  const input = document.getElementById("initialBalance").value;
  if(input < 0 || input > 10000000000 || input === "") {
    alert("Digite um valor válido (0 a 10.000.000.000)");
    return;
  }
  let targetBalance = Number(input);
  balance = 0;
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("welcomeText").innerText = `Parabéns! Você acaba de adquirir R$ ${targetBalance.toLocaleString()}. Você está pronto para gastar e se tornar um milionário!`;
  document.getElementById("welcomeMessage").style.display = "block";

  // Animação de dinheiro subindo
  let increment = Math.ceil(targetBalance / 100);
  let interval = setInterval(() => {
    balance += increment;
    if(balance >= targetBalance) {
      balance = targetBalance;
      clearInterval(interval);
    }
    document.getElementById("balance").innerText = `Saldo: R$ ${balance.toLocaleString()}`;
  }, 10);
}

function closeWelcome() {
  document.getElementById("welcomeMessage").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  renderItems();
  updateBalance();
}

function updateBalance() {
  document.getElementById("balance").innerText = `Saldo: R$ ${balance.toLocaleString()}`;
}

function renderItems() {
  const container = document.getElementById("itemsContainer");
  container.innerHTML = "";
  items.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `<h3>${item.emoji} ${item.name}</h3>
                         <p>Preço: R$ ${item.price.toLocaleString()}</p>
                         <p>Máx: ${item.max}</p>
                         <button onclick="buyItem(${index}, this)">Comprar</button>`;
    container.appendChild(itemDiv);
  });
}

function buyItem(index, btn) {
  const item = items[index];
  if(balance < item.price) {
    alert("Saldo insuficiente!");
    return;
  }
  if(!inventory[item.name]) inventory[item.name] = 0;
  if(inventory[item.name] >= item.max) {
    alert(`Você já comprou o máximo de ${item.name}`);
    return;
  }

  // Animação de gasto
  let spent = 0;
  const decrement = Math.ceil(item.price / 50);
  const interval = setInterval(() => {
    spent += decrement;
    balance -= decrement;
    if(balance <= 0 || spent >= item.price) {
      balance += spent - item.price; // corrigir saldo
      clearInterval(interval);
    }
    updateBalance();
  }, 10);

  inventory[item.name]++;
  coinSound.play();

  btn.style.backgroundColor = "#33ff57"; // efeito visual
  setTimeout(()=>{btn.style.backgroundColor="#ff4081"}, 200);

  checkEndGame();
}

function checkEndGame() {
  let canBuyMore = items.some(item => balance >= item.price && (!inventory[item.name] || inventory[item.name] < item.max));
  if(!canBuyMore) {
    document.getElementById("endMessage").style.display = "block";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
}

function closeEnd() {
  document.getElementById("endMessage").style.display = "none";
}

function restartGame() {
  balance = 0;
  inventory = {};
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("initialBalance").value = "";
  document.getElementById("balance").innerText = "Saldo: R$ 0";
}

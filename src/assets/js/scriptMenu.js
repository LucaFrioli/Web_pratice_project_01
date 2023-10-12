const menuIcon = document.querySelector(`span#burguer`);
const items = document.querySelector(`menu#menuItems`);

// Verificar e definir o estilo do menu com base na largura da janela
function checkWindowSize() {
  if (window.innerWidth >= 983) {
    items.style.display = "flex";
  } else {
    items.style.display = "none";
  }
}

// Chama a função inicialmente e sempre que a janela for redimensionada
checkWindowSize();

menuIcon.addEventListener(`click`, () => {
  if (items.style.display == `flex`) {
    items.style.display = `none`;
  } else {
    items.style.display = `flex`;
  }
});

window.addEventListener("resize", checkWindowSize);

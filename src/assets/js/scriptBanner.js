let currentBanner = 1;

function showBanner() {
    const banners = document.querySelectorAll('.banner');
    banners.forEach(banner => banner.style.display = 'none');//garante que nenhum banner está sendo exibido 
    banners[currentBanner - 1].style.display = 'block';//aciona apenas o banner a ser exibido, selecionando ele dentro do array e dizendo para setar sua folha de estilo como block
}

function rotateBanner() {
    currentBanner++;
    if (currentBanner > 3) {
        currentBanner = 1;
    }
    showBanner();//chama a função de definição de imagem atual e utiliza o número do currentBanner para definir qual elemento do array receberá o tratamento da função
}

showBanner();//mostra o banner que está sendo tratado
setInterval(rotateBanner, 5000); // Troca de banner a cada quantos segundos forem definidos, para que sejam tratados pela função showBanner

const indexCardsData = [
    {//link só está sendo declarado caso venha a ser necessário, por mera demo utilizarei uma unica página 
        title: `Kit barba macia Don Alcides`,
        description: `Kit com balçamo e shampooo don alcides`,
        price: 95.85,
        imageSrc: `./assets/img/products/balm-e-shampoo-para-barba-don-alcides.jpg`,
        link: `#`
    },
    {
        title: `Pomada para cabelo Haskell`,
        description: `Pomada fixadora para cabelo, nivel de fixação média`,
        price: 25.35,
        imageSrc: `./assets/img/products/pomadaParaCabelo.jpeg`,
        link: `#`
    },
    {
        title: `Kit sabonete para barba importado`,
        description: `Kit com sabonete japonês para barba e espandor com cabo de bétula`,
        price: 127.95,
        imageSrc: `./assets/img/products/kit_sabonete_para_Barbear_com_espanador.jpg`,
        link: `#`
    },
];

const productsCardsData = [
    {
        title: `Balsamo vinotage`,
        description: `Balsamo pós-barba 170ml pós barba`,
        price: 32.50,
        imageSrc: `./assets/img/products/Balsamo-Pos-Barba-170ml.jpg`,
        link: `#`
    },
    {
        title: `Blender Big Barber`,
        description: `Blender para ajudar o crescimento da barba`,
        price: 70.85,
        imageSrc: `./assets/img/products/blender_para_barba.jpg`,
        link: `#`
    },
    {
        title: `Creme Eficácia`,
        description: `Creme Anti-rugas masculino`,
        price: 44.55,
        imageSrc: `./assets/img/products/creme-anti-sinais-masculino.jpg`,
        link: `#`
    },
    {
        title: `Kit para barbear Natura`,
        description: `Kit com espuma de barbear e gel pós barba natura`,
        price: 74.50,
        imageSrc: `./assets/img/products/kit_para_barbear.jpeg`,
        link: `#`
    },
    {
        title: `Navalha artesanal`,
        description: `Navalha adornada em ouro artesanal temperadaem aço alto carbono`,
        price: 265.75,
        imageSrc: `./assets/img/products/navalha_para_barbear.jpg`,
        link: `#`
    },
    {
        title: `Navalhete tipo mordedor`,
        description: `Navalhete tipo mordedor artezanal com cabo de acácia`,
        price: 158.70,
        imageSrc: `./assets/img/products/navalhete.jpg`,
        link: `#`
    },
];

export function defineDataFromPage() {//define quais cards terão conforme a página em que o usuário se encontra
    const path = window.location.pathname;
    if (path.includes(`index`)) {
        return indexCardsData;
    }
    if (path.includes(`products`)) {
        return productsCardsData;
    }
}


//não está funcionando por algum motivo, teoricamente ES6 era para faze-lo de modo nativo, por conta de tempo, coloquei está função dentro do shadowRootProductCard
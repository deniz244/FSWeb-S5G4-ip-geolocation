//axios import buraya gelecek
import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

const cardsContainer = document.querySelector(".cards");

function cardCreator(cardInfo) {
  const htmlCard = `<div class="card">
	<img src= "${cardInfo["ülkebayrağı"]}" />
	<div class="card-info">
		<h3 class="ip">${cardInfo["sorgu"]}</h3>
		<p class="ulke">${cardInfo["ülkeKodu"]}</p>
		<p>Enlem: ${cardInfo.enlem}Boylam: ${cardInfo.enlem}</p>
		<p>Şehir: ${cardInfo["şehir"]}</p>
		<p>Saat dilimi: ${cardInfo.saatdilimi}</p>
		<p>Para birimi: ${cardInfo.parabirimi}</p>
		<p>ISP: ${cardInfo.isp}</p>
	</div>
	</div>`;

  return htmlCard;
}

let myInfoObj = {};
console.log("myInfoObj 1", myInfoObj);

async function lokasyonBilgilerimiAl(ipAdd) {
  await axios
    .get(`https://apis.ergineer.com/ipgeoapi/${ipAdd}`)
    .then(function (response) {
      // handle success
      //console.log(response.data);
      myInfoObj = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      console.log("myInfoObj 2", myInfoObj);
      cardsContainer.innerHTML = cardCreator(myInfoObj);
    });
}

const initAPICycle = async () => {
  await ipAdresimiAl();
  lokasyonBilgilerimiAl(benimIP);
};

initAPICycle();

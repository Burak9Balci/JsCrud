/*
DownloadButton işaretlemesinin butonun metnini ve class'ını değiştirmek için ternary operator'ü kullanalım
Eğer props.isPaid değeri true ise:
 - Butonun metni "Şimdi Satın Al" olacak.
 - Butonun class'ı ".paid" olacak ve bu sayede özelleştirilmiş bir stil uygulanabilir.
Eğer props.isPaid değeri false ise:
 - Butonun metni "Ücretsiz İndirin" olacak.
 - Butonun arka planı yeşil olacak. Bu durum için farklı bir stil uygulanacak.
 */

function DownloadButton(props) {
  return `
    <button class="download-button">
      <span>Ücretsiz İndirin</span>
    </button>
  `;
}

const appDiv = document.getElementById("app");
appDiv.innerHTML = DownloadButton({
  isPaid: true,
});

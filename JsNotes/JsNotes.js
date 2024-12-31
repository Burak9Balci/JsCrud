imr;
const array = [1, 2, 3, 4, 5, 6];
let kelimeler = ["Araba şehri", "Keser döner", "Java Script"];
//               String fonksionları
let odd = kelimeler.map((x) => x.split(" ")[0]); // split metodu karakterleri ayırır ve array olarak döndürür
console.log(odd);
console.log("---------------------------");

let araba = "Araba!";
console.log(araba.slice(0, -1)); // kelimenin son harfini siler

let newArray1 = array.slice(1, 4); // birinci indexden başla 4. indexe kadar sil
console.log(newArray1);
console.log("---------------------------");

let newArray2 = array.splice(1, 3); // birinci index den başla 3 eleman sil
console.log(newArray2);
console.log(array);
console.log("---------------------------");

let fullName = `Zehra Gözüm`;
let newFullName = fullName.replace("Gözüm", "Balcı"); // İlk parametre değiştirmke istediğimiz değer ikinci parametre yerine koymak istediğimiz değer
console.log(newFullName);
console.log("---------------------------");

let isIncludes = array.includes(5);
console.log(isIncludes);
console.log("---------------------------");

//               Array fonksionları
array.forEach((number) => console.log(number)); //Array in değerlerinde gezinir
console.log("---------------------------");

let filtered = array.filter((number) => number > 2); // fonksiona parametre olarak verilen call back fonksionunun sorgusuna uygun olan değerleri döndürür
console.log(filtered);
console.log("---------------------------");

let degerler = [];
degerler = array.map((number) => number); // Foreach ile aynı işi yapar ama foreachden farkı değer döndürür
console.log(degerler);
console.log("---------------------------");

let firstDeger = array.find((number) => number > 1); // fonksiona parametre olarak verilen call back fonksionunun dondurduğü ilk değeri döndürür
console.log(firstDeger);
console.log("---------------------------");

let number = array.indexOf(5); // arraydeki indexOf fonksionuna verilen arguman
console.log(number);
console.log("---------------------------");

//Sort fonsionu Bize sıralama yapmamızı sağlar
let numbers = [1, 2, 5, 8, 9, 3, 4, 10, 22, 11, 12];
const names = ["araba", "bahar", "zafer", "remzi"];
sortedNumbers = numbers.sort((a, b) => a - b);
sortedNames = names.sort();
console.log(sortedNumbers);
console.log(sortedNames);
console.log("---------------------------");

let newNumbers = [33, 44, 55];
console.log(numbers.concat(newNumbers)); //Concat iki arrayi birleştirir ama array i manupule etmez
console.log("---------------------------");

let newNumbers2 = [1, 2, 3, 4, 5, 6];
newNumbers2.push(7, 8, 9); //push fonksionu kullanılan arayin sonuna ekleme yapar
console.log(newNumbers2);
console.log("---------------------------");

newNumbers2.unshift(7, 8, 9); //unshift fonksionu kullanılan arayin başına ekleme yapar
console.log(newNumbers2);
console.log("---------------------------");

let lastIndex = newNumbers2.pop(); //pop fonksionu kullanılan arayin sonundaki elemanı siler aynı zamanda bir değişgene döndürür
console.log(newNumbers2);
console.log(lastIndex);
console.log("---------------------------");

let firstIndex = newNumbers2.shift(); //shift fonksionu kullanılan arayin sonundaki elemanı siler aynı zamanda bir değişgene döndürür
console.log(newNumbers2);
console.log(firstIndex);
console.log("---------------------------");

//               Obje fonksionları

let person1 = {
  name1: "Mehmet",
  surname1: "Karahanli",
};
let person2 = {
  name2: "Iskender",
  surname2: "Buyuk",
};

let people = Object.assign({}, person1, person2); //assign Metodu objeye ekleme yapmak için veya birden fazla objeyi birleştirip yeni bir obje yaratmak için kullanıla bilir
console.log(people);
console.log("---------------------------");

person1.hasOwnProperty(person1.name1); // person1 nesnesinde name1 ozelliği var mı

let all = Object.entries(people); // entries fonksionu argumana verilen objenin keylerini ve valuelarını döndürür
console.log(all);
console.log("---------------------------");

let keys = Object.keys(people); // keys fonksionu argumana verilen objenin keylerini döndürür
console.log(keys);
console.log("---------------------------");

let values = Object.values(people); // values fonksionu argumana verilen objenin valueları döndürür
console.log(values);
console.log("---------------------------");

// Promises

const apiCall = new Promise((resolve, reject) => {
  let success = true; // Simüle edilen bir durum.

  setTimeout(() => {
    if (success) {
      resolve("API çağrısı başarılı!");
    } else {
      reject("Hata oluştu!");
    }
  }, 2000);
});

apiCall
  .then((response) => console.log(response)) // Başarılı olursa.
  .catch((error) => console.error(error)); // Hata alırsa.

// async await

// Bir API'den veri almak
const fetchData2 = async () => {
  try {
    console.log("Veri çekiliyor...");
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    if (!response.ok) {
      throw new Error(`HTTP Hatası: ${response.status}`);
    }

    const data = await response.json(); // JSON formatındaki yanıtı çevir
    console.log("Gelen Veri:", data);
  } catch (error) {
    console.error("Hata:", error.message);
  }
};

fetchData2();

// Axios

async function getFilms(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data.results[0]);
  } catch (err) {
    console.log(err);
  }
}
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>; // html kısmının üst kısmına yapıştırılmalı

getFilms("https://swapi.tech/api/films");

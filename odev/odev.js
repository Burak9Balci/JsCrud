// Challenge 52
// Tekrar Etmeyen İlk Karakter
// Argüman olarak bir str string'i alan findCharacter(str) fonksiyonunu yazın. Fonksiyon tekrar etmeyen ilk karakteri döndürmelidir.

// Böyle bir karakter bulunamazsa null döndürülür.
// Girilen stringi str boşluk içermeyecektir.

/* =========== *
 * Challenge 52 *
 * ============ */

const findCharacter = (str) => {
  // Kodunuzu buraya yazın

  str.split().reduce((acc, item) => {
    if (acc === item) {
      acc = null;
      return acc;
    } else {
      console.log(str);
    }
  }, str[0]);
};

findCharacter("hello"); // "h"
findCharacter("aabbcddee"); // "c"
findCharacter("aabbcc"); // null

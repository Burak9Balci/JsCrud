const btnPost = document.getElementById("ekleme");
const btnPut = document.getElementById("güncelle");
const nameInput = document.getElementById("Name");
const descriptionInput = document.getElementById("Description");
const feedback = document.getElementById("feedback");
const table = document.getElementById("categoriesTable");
const btnAdd = document.getElementById("btnGo1");
const btnUpdate = document.getElementById("btnGo2");
const labels = document.querySelectorAll("form label");
const tbody = document.getElementById("doldur");
const textBox = document.getElementById("search");
const thDesc = document.getElementById("description");
const thName = document.getElementById("categoryName");

const btnDelete = document.getElementById("delete");

class APIConnectionService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async getAll() {
    try {
      const response = await fetch(this.baseURL);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`GET Hatası! Status: ${response.status}`);
    } catch (error) {
      console.log(error);
    }
  }
  async addCategory(category) {
    try {
      //fetch ile apiye bir istek yapıcaz
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      if (response.ok) {
        showFeedback(
          "Kategori başarıyla eklendi Ana Sayfaya yonlendiriliyorsunuz!",
          "blue"
        );
        setTimeout(() => direct("CrudBase.html"), 4000);
        // Formu temizle
        Cleaner();
        return await response.json();
      }
      showFeedback(`Ekleme yapılırken hata oldu ${response.status}`, "red");
    } catch (error) {
      showFeedback(`Bir hata oluştu: ${error.message}`, "red");
    }
  }
  async updateCategory(id, category) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      if (response.ok) {
        showFeedback(
          "Kategori başarıyla güncellendi Ana Sayfaya yonlendiriliyorsunuz!!",
          "yellow"
        );
        setTimeout(() => direct("CrudBase.html"), 4000);
        Cleaner();
        return await response.json();
      }
      throw new Error("güncelleme yaparken hata oldu");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCategory(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Hata aldın ${response.status}`);
      showFeedback(`Kategori silindi`, "blue");
      return response.status;
    } catch (error) {
      showFeedback(`Kategori silinirken hata ${error}`, "red");
    }
  }
}
let api = new APIConnectionService("https://northwind.now.sh/api/categories");
class BaseEntity {
  constructor(createdDate) {
    this.createdDate = createdDate || new Date();
  }
}
class Category extends BaseEntity {
  constructor(name, description, createdDate) {
    super(createdDate);
    // this.name = name;
    // this.description = description;
    let _name = name;
    let _description = description;

    this.getName = () => _name;
    this.getDescription = () => _description;

    this.setName = (newName) => (_name = newName);
    this.setDes = (newDes) => (_description = newDes);
    this.toJSON = () => ({
      name: _name,
      description: _description,
    });
  }
}

//Eventfonksionları başlangıc ______________________-------------------------------------------------------------------------------_____________________________________________________________________________________

async function getNorthWindCategories() {
  const categories = await api.getAll();
  const hizalar = categories.map(
    (category) => `
    <tr>
     <td>${category.id}</td> 
     <td>${category.name}</td> 
     <td>${category.description}</td> 
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td><input type="checkbox" value="${category.id}" /></td>
    </tr> `
  );
  tbody.innerHTML = hizalar.join("");
}

async function addNorthWindCategory() {
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();
  let isValid = validation(name, description);
  if (isValid) {
    let newCategory = new Category(name, description);
    await api.addCategory(newCategory);
  }
}

async function updateNorthWindCategory() {
  const name = nameInput.value.trim();
  const desc = descriptionInput.value.trim();
  let isValid = validation(name, desc);
  if (isValid) {
    let goneBeCategory = new Category(name, desc);
    let getID = (id) => {
      // tarayıcıdaki url yi yakalr
      let url = new URLSearchParams(window.location.search);
      return url.get(id);
    };
    const categoryID = getID("id");
    if (categoryID) {
      await api.updateCategory(`${categoryID}`, goneBeCategory.toJSON());
      return;
    }
    showFeedback("Id Secili değil!", "green");
  }
}

function updateSelectedCategory() {
  const idS = checkboxID();
  if (idS.length > 1) {
    alert("Lütfen sadece bir tane Category seç");
    return;
  } else if (idS.length === 0) {
    alert("lütfen category Seç yada güncelleme");
    return;
  } else {
    direct(`CrudPut.html?id=${idS[0]}`);
  }
}

async function deleteSelectedCategory() {
  const idS = checkboxID();
  if (idS.length) {
    for (const id of idS) {
      await api.deleteCategory(id);
    }
    await getNorthWindCategories();
  } else alert("Lütfen silmek için en az bir kategori seçin.");
}

function showFeedback(message, color) {
  feedback.textContent = message;
  feedback.style.color = color;
}

function validation(name, desc) {
  if (!name || !desc) {
    showFeedback("TextBoxları Doldursana EVLADIMM", "pink");
    return false;
  } else {
    if (name.length < 5) {
      showFeedback("Lütfen isim oluştururken 5 den fazla harf giriniz", "pink");
      return false;
    } else if (desc.length < 5) {
      showFeedback(
        "lütfen açıklama oluştururken 5 den fazla harf giriniz",
        "pink"
      );
      return false;
    }
  }
  return true;
}

function direct(location) {
  window.location.href = location;
}

function checkboxID() {
  const checkboxes = document.querySelectorAll(
    `table input[type="checkbox"]:checked`
  );
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

function Cleaner() {
  labels.forEach((label) => (label.style.display = "none"));
  descriptionInput.style.display = nameInput.style.display = "none";
  if (btnPost !== null) btnPost.style.display = "none";
  if (btnPut !== null) btnPut.style.display = "none";
}

async function filterCatergory(event) {
  const newValue = event.target.value; // eventi uyguladığımız elementin değerini yakaladık
  const categories = await api.getAll();
  Array.from(categories);
}
async function sortName() {
  const categories = await api.getAll();
  const categorysObjs = Array.from(categories).sort((a, b) =>
    a.name.localeCompare(b.name, "und", { sensitivity: "base" })
  );
  const hizalar = categorysObjs.map(
    (category) => `
    <tr>
     <td>${category.id}</td> 
     <td>${category.name}</td> 
     <td>${category.description}</td> 
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td><input type="checkbox" value="${category.id}" /></td>
    </tr> `
  );
  tbody.innerHTML = hizalar.join("");
}

async function sortDesc() {
  const categories = await api.getAll();
  const sortedDescs = Array.from(categories).sort((a, b) =>
    a.description.localeCompare(b.description, "und", { sensitivity: "base" })
  );
  const hizalar = sortedDescs.map(
    (category) => `
    <tr>
     <td>${category.id}</td> 
     <td>${category.name}</td> 
     <td>${category.description}</td> 
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td><input type="checkbox" value="${category.id}" /></td>
    </tr> `
  );
  tbody.innerHTML = hizalar.join("");
}
//Eventfonksionları bitiş

//_________________________________________________---------------------------------------------------------------------------------____________________________________________________________________________________

//Eventler başlangıc

if (btnUpdate !== null)
  btnUpdate.addEventListener("click", updateSelectedCategory);

if (btnDelete !== null)
  btnDelete.addEventListener("click", deleteSelectedCategory);

if (tbody !== null)
  document.addEventListener("DOMContentLoaded", getNorthWindCategories);

if (btnAdd !== null)
  btnAdd.addEventListener("click", () => direct("CrudPost.html"));

if (btnPut !== null) btnPut.addEventListener("click", updateNorthWindCategory);

if (btnPost !== null) btnPost.addEventListener("click", addNorthWindCategory);

if (textBox !== null) textBox.addEventListener("input", filterCatergory);

if (thDesc !== null) thDesc.addEventListener("click", sortDesc);

if (thName !== null) thName.addEventListener("click", sortName);
//Eventler bitiş // ________________________________-------------------------------------------------------------------------------_____________________________________________________________________________________

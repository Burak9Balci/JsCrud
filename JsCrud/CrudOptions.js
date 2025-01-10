const btnPost = document.getElementById("ekleme");
const btnPut = document.getElementById("güncelle");
const nameInput = document.getElementById("Name");
const descriptionInput = document.getElementById("Description");
const feedback = document.getElementById("feedback");
const table = document.getElementById("categoriesTable");
const btnGo = document.getElementById("btnGo");
class APIConnectionService {
  constructor(baseURL) {
    this.client = axios.create({ baseURL });
  }
}
let api = new APIConnectionService("https://northwind.now.sh/api/categories");
function showFeedback(message, color) {
  feedback.textContent = message;
  feedback.style.color = color;
}
function direct(location) {
  window.location.href = location;
}
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

// async function GetNorthWindCategory(id) {
//   try {
//     let response2 = await api.client.get(`/${id}`);
//     console.log(response2.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

if (table !== null) {
  document.addEventListener("DOMContentLoaded", GetNorthWindCategories);
}
async function GetNorthWindCategories() {
  try {
    let response = await api.client.get();

    // Tabulator ile tabloyu oluştur
    new Tabulator("#categoriesTable", {
      data: response.data,
      layout: "fitColumns",
      columns: [
        { title: "ID", field: "id" },
        { title: "Ad", field: "name" },
        { title: "Açıklama", field: "description" },
        {
          title: "İşlemler", // Butonların olduğu sütun
          formatter: function () {
            return `
                    <button class="edit-btn">Düzenle</button>
                    <button class="delete-btn">Sil</button>
                  `;
          },
          cellClick: function (e, cell) {
            const rowData = cell.getRow().getData(); // Satırdaki veri
            const clickedButton = e.target;

            // update butonu
            if (clickedButton.classList.contains("edit-btn")) {
              direct(`CrudPut.html?id=${rowData.id}`);
            }

            // delete butonu
            if (clickedButton.classList.contains("delete-btn")) {
              console.log("Silmeye tıklandı:", rowData);
              async function DeleteNorthWindCategory(id) {
                try {
                  let api = new APIConnectionService(
                    "https://northwind.now.sh/api/categories"
                  );
                  await api.client.delete(`/${id}`);
                  GetNorthWindCategories();
                } catch (error) {
                  console.log(error);
                }
              }
              DeleteNorthWindCategory(rowData.id);
            }
          },
        },
      ],
    });
  } catch (error) {
    console.error("Bir hata oluştu:", error);
  }
}

if (btnGo !== null) {
  btnGo.addEventListener("click", () => direct("CrudPost.html"));
}

if (btnPut !== null) {
  btnPut.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const desc = descriptionInput.value.trim();
    if (!name || !desc) {
      showFeedback("TextBoxları Doldursana EVLADIMM", "yellow");
      return;
    }
    let goneBeCategory = new Category(name, desc);
    let getID = (id) => {
      // tarayıcıdaki url yi yakalr
      let url = new URLSearchParams(window.location.search);
      return url.get(id);
    };
    const categoryID = getID("id");
    try {
      if (categoryID) {
        await api.client.put(`/${categoryID}`, goneBeCategory.toJSON());
        showFeedback(
          "Kategori başarıyla güncellendi Ana Sayfaya yonlendiriliyorsunuz!!",
          "yellow"
        );
        setTimeout(() => direct("CrudBase.html"), 4000);
        Cleaner();
        return;
      }
      showFeedback("Id Secili değil!", "green");
    } catch (error) {
      showFeedback(`Bir hata oluştu: ${error.message}`, "red");
    }
  });
}
function Cleaner() {
  nameInput.value = "";
  descriptionInput.value = "";
}
if (btnPost !== null) {
  btnPost.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!name || !description) {
      showFeedback("TextBoxları Doldursana EVLADIMM", "blue");
      return;
    }
    let newCategory = new Category(name, description);
    try {
      // API'ye POST isteği gönder
      await api.client.post("", newCategory.toJSON());
      showFeedback(
        "Kategori başarıyla eklendi Ana Sayfaya yonlendiriliyorsunuz!",
        "blue"
      );
      setTimeout(() => direct("CrudBase.html"), 4000);
      // Formu temizle
      Cleaner();
    } catch (error) {
      showFeedback(`Bir hata oluştu: ${error.message}`, "red");
    }
  });
}

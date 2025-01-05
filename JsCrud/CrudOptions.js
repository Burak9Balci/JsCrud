class APIConnectionService {
  constructor(baseURL) {
    this.client = axios.create({ baseURL });
  }
}
function showFeedback(message, color) {
  feedback.textContent = message;
  feedback.style.color = color;
}
const btnPost = document.getElementById("ekleme");
const nameInput = document.getElementById("Name");
const descriptionInput = document.getElementById("Description");
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
let api = new APIConnectionService("https://northwind.now.sh/api/categories");
async function GetNorthWindCategories() {
  try {
    let response = await api.client.get();
    response.data.foreach((x) => {
      const table = document.createElement("table");
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
async function GetNorthWindCategory(id) {
  try {
    let response2 = await api.client.get(`/${id}`);
    console.log(response2.data);
  } catch (error) {
    console.log(error);
  }
}

btnPost.addEventListener("click", async (event) => {
  event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!name || !description) {
    showFeedback("TextBoxları Doldursana EVLADIMM", "yellow");
    return;
  }
  let newCategory = new Category(name, description);
  try {
    // API'ye POST isteği gönder
    await api.client.post("", newCategory.toJSON());
    console.log("Kategori başarıyla eklendi!");

    // Kategoriler listesini güncelle
    GetNorthWindCategories();

    // Formu temizle
    nameInput.value = "";
    descriptionInput.value = "";
  } catch (error) {
    console.error("Bir hata oluştu:", error);
  }
});

async function UpdateNorthWindCategory(id, mustBeCategory) {
  try {
    await api.client.put(`/${id}`, mustBeCategory.toJSON());
    GetNorthWindCategories();
  } catch (error) {
    console.log(error);
  }
}
async function DeleteNorthWindCategory(id) {
  try {
    await api.client.delete(`/${id}`);
    GetNorthWindCategories();
  } catch (error) {
    console.log(error);
  }
}

//UpdateNorthWindCategory(9, mustBeCategory);
GetNorthWindCategories();
//GetNorthWindCategory(2);

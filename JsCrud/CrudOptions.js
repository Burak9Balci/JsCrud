class APIConnectionService {
  constructor(baseURL) {
    this.client = axios.create({ baseURL });
  }
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
let api = new APIConnectionService("https://northwind.now.sh/api/categories");
async function GetNorthWindCategories() {
  try {
    let response = await api.client.get();
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

async function AddNorthWindCategory(newCategory1) {
  try {
    await api.client.post("", newCategory1.toJSON());
    GetNorthWindCategories();
  } catch (error) {
    console.log(error);
  }
}

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

let newCategory1 = new Category("Hava", "soguk hava");
let mustBeCategory = new Category("Araba", "Hızlı Araba");

//DeleteNorthWindCategory(9);
//AddNorthWindCategory(newCategory1);
UpdateNorthWindCategory(9, mustBeCategory);
//GetNorthWindCategories();
//GetNorthWindCategory(2);

import { a as pb } from "./index-DGnO80YW.js";
//#region src/services/categories.ts
var getCategories = () => pb.collection("categories").getFullList({ sort: "-created" });
var createCategory = (data) => pb.collection("categories").create(data);
var updateCategory = (id, data) => pb.collection("categories").update(id, data);
var deleteCategory = (id) => pb.collection("categories").delete(id);
//#endregion
export { updateCategory as i, deleteCategory as n, getCategories as r, createCategory as t };

//# sourceMappingURL=categories-BwSoR9_1.js.map
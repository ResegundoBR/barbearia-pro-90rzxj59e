import { a as pb } from "./index-BIx1wWQ0.js";
//#region src/services/categories.ts
var getCategories = () => pb.collection("categories").getFullList({ sort: "-created" });
var createCategory = (data) => pb.collection("categories").create(data);
//#endregion
export { getCategories as n, createCategory as t };

//# sourceMappingURL=categories-D1IJePE7.js.map
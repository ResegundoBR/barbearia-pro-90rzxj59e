import { a as pb } from './index-BcGnSmFb.js'
//#region src/services/categories.ts
var getCategories = () => pb.collection('categories').getFullList({ sort: '-created' })
var createCategory = (data) => pb.collection('categories').create(data)
//#endregion
export { getCategories as n, createCategory as t }

//# sourceMappingURL=categories-VhnWVJJv.js.map

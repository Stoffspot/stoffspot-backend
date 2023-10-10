const importedArray = require('../queryData/bccInfo.js').brands;
const importedArray1 = require('../queryData/bccInfo.js').colors;
const fs = require('fs');
class searchQueryInfoExt{
    // constructor(query){
    //     this.query = query
    // }
    constructor(){
      var ibrands = []
      var icolors = []
      var icats = []
      try {
        const data = fs.readFileSync('C:/Users/User/Desktop/stoff-backend/queryData/brands.txt', 'utf8');
        ibrands = data.split(',').map(brand => brand.trim());
        this.ibrands = ibrands
        const data1 = fs.readFileSync('C:/Users/User/Desktop/stoff-backend/queryData/colors.txt', 'utf8');
        icolors = data1.split(',').map(brand => brand.trim());
        this.icolors = icolors
        // console.log(this.icolors)
      } catch (err) {
        console.error(err);
        this.ibrands = ibrands
        this.icolors = icolors
      }
    }


    extractClothingInfo(query) {
        const brands = new Set(this.ibrands); // Example set of brands
        const colors = new Set(importedArray1); // Example set of colors
        const categories = new Set(['shirt', 'pant', 'dress', 'kurti']); // Example set of categories
      
        let extractedInfo = {
          brand: null,
          color: null,
          category: null
        };
      
        // Extract brand
        for (let brand of brands) {
          const regex = new RegExp(brand, 'i');
          if (query.match(regex)) {
            extractedInfo.brand = brand;
            break;
          }
        }
      
        // Extract color
        for (let color of colors) {
          const regex = new RegExp(color, 'i');
          if (query.match(regex)) {
            extractedInfo.color = color;
            break;
          }
        }
      
        // Extract category
        for (let category of categories) {
          const regex = new RegExp(category, 'i');
          if (query.match(regex)) {
            extractedInfo.category = category;
            break;
          }
        }
      
        return extractedInfo;
      }

}
module.exports = searchQueryInfoExt;
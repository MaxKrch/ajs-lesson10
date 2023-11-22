import read from "./reader.js";
import json from "./parser.js";


export default class GameSavingLoader {

  // static load() {
  //   return new Promise((resolve, reject) => {

  //     read().then(value => {
  //       return json(value);
  //     }).then(value => {
  //       const gameSaving = JSON.parse(value);
  //       resolve(gameSaving)
  //     }).catch(error => {
  //       reject(new Error("Что-то пошло не так"))
  //     })
  //   })
  // }
    

  static load() {
    return (async () => { 
      try {
        const data = await read(); 
        const value = await json(data); 
        const gameSaving = JSON.parse(value)
        return gameSaving;
      } catch (error) {
        return error;
      }
    })()
  }  
}


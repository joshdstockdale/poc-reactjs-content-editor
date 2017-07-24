// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const folders = [
  {
    id: "/",
    name: "Home",
    classes: "fi-folder",
    parent: "",
    date: "0000-00-00T00:00:00.000Z"
  }
];

class FolderApi {
  static getAllFolders() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], folders));
      });
    });
  }

  static saveFolder(folder) {
    folder = Object.assign({}, folder); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!folder.id){
          //TODO: build slug
          //folder.id = Date.now();
          folder.date = Date.now();
        }
        resolve(folder);
      });
    });
  }
}

export default FolderApi;

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const tags = [
  {
    id: 0,
    name: "",
    date: "0000-00-00T00:00:00.000Z",
    items: [""]
  }
];

class TagApi {
  static getAllTags() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], tags));
      });
    });
  }

  static saveTag(tag) {
    tag = Object.assign({}, tag); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!tag.id){
          //TODO: build slug
          //tag.id = Date.now();
          tag.date = Date.now();
        }
        resolve(tag);
      });
    });
  }
}

export default TagApi;

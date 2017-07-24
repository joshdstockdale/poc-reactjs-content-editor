// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const templates = [
  {
    id: "devotion",
    path: "/devotion/",
    label: "Devotions",
    classes: "devotion-post",
    date: "0000-00-00T00:00:00.000Z",
    meta: []
  },{
    id: "article",
    path: "/article/",
    label: "Articles",
    classes: "article-post",
    date: "0000-00-00T00:00:00.000Z",
    meta: []
  }
];

class TemplateApi {
  static getAllTemplates() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], templates));
      });
    });
  }

  static saveTemplate(template) {
    template = Object.assign({}, template); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!template.id){
          //template.id = Date.now();
          template.date = Date.now();
        }
        resolve(template);
      });
    });
  }
}

export default TemplateApi;

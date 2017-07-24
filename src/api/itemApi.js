// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let c_id = 1;
const items = [
  {
    id: c_id++,
    slug: "will-item",
    title: "Will Easter Item",
    content: "<p>This is some Sample Content</p>",
    path: "/2017/01/01/",
    tags: ["willgraham","easter"],
    template: "devotion",
    status: "published",
    dates:{
      createdDate: "2017-01-01T00:00:00.000Z",
      publishDate: "2017-01-01T00:00:00.000Z",
      updatedDate: "2017-01-01T00:00:00.000Z"
    },
    itemMeta:[
      {featuredImage: "./images/will.jpg"},
      {promoted: true},
      {editedBy: ""}
    ],
    // Override any of the Item fields by channel
    channelMeta:{
      youversion: {
        title: "Easter Channel Item",
        status: "draft",
        itemMeta:{
          featuredImage: "./images/easter.jpg"
        }
      },
      app: {
        title: "Easter Mobile Item",
        status: "published",
      }
    }
  },
  {
    id: c_id++,
    slug: "franklin-item",
    title: "Franklin Christmas Item",
    content: "<p>This is some Sample Content that extends past the normal limits for a card view. Hopefully, if not then maybe this will work.</p>",
    path: "/custom-path/",
    tags: ["franklingraham","christmas"],
    template: "devotion",
    status: "published",
    dates:{
      createdDate: "2017-01-01T00:00:00.000Z",
      publishDate: "2017-01-01T00:00:00.000Z",
      updatedDate: "2017-01-01T00:00:00.000Z"
    },
    itemMeta:{
      featuredImage: "./images/franklin.jpg",
      editedBy: ""
    },
    channelMeta:{
      youversion: {
        title: "Christmas Channel Item",
        status: "published",
        itemMeta:{
          featuredImage: "./images/christmas.jpg"
        }
      },
      app: {
        title: "Christmas Mobile Item",
        status: "published",
      }
    }
  },
  {
    id: c_id++,
    slug: "article-item",
    title: "Article Item",
    content: "<p>This is some Sample article Content.</p>",
    path: "/2017/02/01/",
    tags: ["christmas"],
    template: "article",
    status: "published",
    dates:{
      createdDate: "2017-01-01T00:00:00.000Z",
      publishDate: "2017-01-01T00:00:00.000Z",
      updatedDate: "2017-01-01T00:00:00.000Z"
    },
    itemMeta:{
      editedBy: ""
    },
    channelMeta:{
      youversion: {
        title: "Article Channel Item",
        status: "published",
      },
      app: {
        title: "Article Mobile Item",
        status: "published",
      }
    }
  },
];

class ItemApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], items));
      });
    });
  }

  static saveItem(item) {
    item = Object.assign({}, item); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!item.id){
          //TODO: build slug with template and folder s
          //item.id = Date.now();
          item.date = Date.now();
        }
        resolve(item);
      });
    });
  }

  static uploadImage(file) {
    return new Promise((resolve, reject) => {
      const url = "http://192.168.33.16:8080/upload";
      let formData = new FormData();
      formData.append('file', file);
      //Start Request
      let http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.onreadystatechange = function() {
        console.log("http: ", http);
        if(http.readyState == 4) {
          console.log("http4: ", http);
          resolve(file);
        }else{
          //Respond with error
          reject(http.response);
        }
      };
      http.send(formData);
    });
  }
}

export default ItemApi;

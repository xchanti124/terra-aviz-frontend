export const URL = {
  base: "http://localhost:3000/api",
  all: function (page) {
    return `${this.base}/page?pageNumber=${page}`;
  },
  byID: function (id) {
    return `${this.base}/search?_id=${id}`;
  },
  byInput: function (page, input) {
    return `${this.base}/page?pageNumber=${page}&search=${input}`;
  },
  byCategory: function (page, category) {
    return `${this.base}/page?pageNumber=${page}&category=${category}`;
  },
};

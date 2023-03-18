export const URL = {
  base: "http://localhost:3000/api",
  all: function (queryString) {
    return `${this.base}/page?${queryString}`;
  },
  byID: function (id) {
    return `${this.base}/search?_id=${id}`;
  },
};

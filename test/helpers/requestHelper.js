let chai = require("chai");

export function postResource (app, endpoint, data = {}) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

export function patchResource (app, endpoint, data = {}) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

export function getResource (app, endpoint) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .get(endpoint)
      .set("Content-Type", "application/json")
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

export function deleteResource (app, endpoint) {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .delete(endpoint)
      .set("Content-Type", "application/json")
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

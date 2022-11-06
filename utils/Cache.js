const fs = require('fs');

class Cache {
  constructor(pathTo) {
    this.pathTo = pathTo;
  }

  load() {
    return fs.existsSync(this.pathTo)
      ? JSON.parse(fs.readFileSync(this.pathTo))
      : {};
  }

  prepare(data) {
    return JSON.stringify(data, undefined, 2);
  }

  update(data) {
    let cache = { ...this.load(), ...data };
    fs.writeFileSync(this.pathTo, this.prepare(cache));
  }

  replace(key, value) {
    this.remove(key);
    let data = {};
    data[key] = value;
    this.update(data);
  }

  remove(key) {
    let cache = this.load();
    delete cache[key];
    fs.writeFileSync(this.pathTo, this.prepare(cache));
  }
}

module.exports = Cache;

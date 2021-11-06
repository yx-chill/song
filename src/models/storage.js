const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

// localStorage.setItem(key,value);
// localStorage.getItem(key);
// localStorage.removeItem(key);
// localStorage.clear();

export default storage;

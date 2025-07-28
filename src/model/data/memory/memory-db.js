const validateKey = (key) => typeof key === 'string';

class MemoryDB {
  constructor() {
    /** @type {Record<string, any>} */
    this.db = {};
  }

  /**
   * Gets a value for the given primaryKey and
   * @param {string} primaryKey
   * @returns {Promise<any>}
   */
  get(primaryKey) {
    if (!validateKey(primaryKey)) {
      throw new Error(
        `primary and secondary key strings are required, got primaryKey=${primaryKey}`
      );
    }
    const db = this.db;
    const value = db[primaryKey];
    return Promise.resolve(value);
  }

  /**
   * Puts a value into the given primaryKey and
   * @param {string} primaryKey
   * @returns {Promise<void>}
   */
  put(primaryKey, value) {
    if (!validateKey(primaryKey)) {
      throw new Error(`primaryKey and  strings are required, got primaryKey=${primaryKey}`);
    }

    const db = this.db;
    // Make sure the `primaryKey` exists, or create
    db[primaryKey] = db[primaryKey] || {};
    // Add the `value` to the ``
    db[primaryKey] = value;
    return Promise.resolve();
  }

  /**
   * Queries the list of values (i.e., s).
   * Always returns an Array, even if no items are found.
   * @returns {Promise<any[]>}
   */
  query() {
    // No matter what, we always return an array (even if empty)
    const values = this.db ? Object.values(this.db) : [];
    return Promise.resolve(values);
  }

  /**
   * Deletes the value with the given primaryKey and
   * @param {string} primaryKey
   * @returns {Promise<void>}
   */
  async del(primaryKey) {
    if (!validateKey(primaryKey)) {
      throw new Error(`primaryKey and  strings are required, got primaryKey=${primaryKey}`);
    }

    // Throw if trying to delete a key that doesn't exist
    if (!(await this.get(primaryKey))) {
      throw new Error(`missing entry for primaryKey=${primaryKey}`);
    }

    const db = this.db;
    delete db[primaryKey];
    return Promise.resolve();
  }
}

module.exports = MemoryDB;

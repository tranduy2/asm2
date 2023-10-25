'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('accounts', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    username: 'string',
    password: 'string',
    store_id: {
      type: 'string',
      foreignKey: {
        name: 'accounts_store_id_fk',
        table: 'stores',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'store_id'
      },
    },
    role: 'string'
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('accounts', callback);
};


exports._meta = {
  "version": 1
};

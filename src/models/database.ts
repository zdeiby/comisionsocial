
import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

const loadSQL = async (setDb, fetchUsers) => {

    try {
      const config = {
        locateFile: (file: string) => `/assets/${file}`,
      };
      const SQL = await initSqlJs(config);

      let database;
      const savedDb = localStorage.getItem('sqliteDb');
      if (savedDb) {
        const uint8Array = new Uint8Array(JSON.parse(savedDb));
        database = new SQL.Database(uint8Array);
      } else {
        database = new SQL.Database();
        database.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            age INTEGER NOT NULL
          );
        `);
        database.run(`
          CREATE TABLE IF NOT EXISTS pregunta (
            id INTEGER PRIMARY KEY,
            preguntauno TEXT NOT NULL,
            preguntados TEXT NOT NULL,
            preguntatres TEXT NOT NULL
          );
        `);
        database.run(`
          CREATE TABLE IF NOT EXISTS t_usuario(
            id INTEGER PRIMARY KEY,
            documento INTEGER NOT NULL,
            nombre1 TEXT NOT NULL,
            nombre2 TEXT NOT NULL,
            apellido1 TEXT NOT NULL,
            apellido2 TEXT NOT NULL,
            contrasena TEXT NOT NULL
          );
        `);
      }

      setDb(database);
      fetchUsers(database);
    } catch (err) {
      console.error('Error loading SQL.js:', err);
    }
  };

  export default loadSQL;
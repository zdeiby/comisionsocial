
import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

async function getFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('myDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('sqliteStore')) {
        db.createObjectStore('sqliteStore');
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Verificar si la tienda de objetos (tabla) existe
      if (!db.objectStoreNames.contains('sqliteStore')) {
        console.log('Object store "sqliteStore" does not exist');
        resolve(null);
        return;
      }

      const transaction = db.transaction(['sqliteStore'], 'readonly');
      const store = transaction.objectStore('sqliteStore');
      const getRequest = store.get('sqliteDb');

      getRequest.onsuccess = (event) => {
        const data = event.target.result;
        if (data) {
          console.log('Data retrieved from IndexedDB:', data);
          resolve(data);
        } else {
          console.log('No data found in IndexedDB');
          resolve(null);
        }
      };

      getRequest.onerror = (event) => {
        console.error('Error retrieving data from IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    };

    request.onerror = (event) => {
      console.error('Failed to open IndexedDB:', event.target.error);
      reject(event.target.error);
    };
  });
}

// Usar la función de recuperación y almacenar el resultado en una variable




const loadSQL = async (setDb, fetchUsers) => {

  try {
    const config = {
      locateFile: (file: string) => `/assets/${file}`,
    };
    const SQL = await initSqlJs(config);

    let database;
    //const savedDb = localStorage.getItem('sqliteDb');

    const savedDb = await getFromIndexedDB();
    if (savedDb) {
      const uint8Array = new Uint8Array(savedDb);
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
        database.run(`
        CREATE TABLE IF NOT EXISTS t1_comision (
        id_usuario INTEGER PRIMARY KEY ,
        cedula TEXT NOT NULL,
        contrasena TEXT NOT NULL,
        estado TEXT NOT NULL
      );
        `);
      database.run(`CREATE TABLE  IF NOT EXISTS c0_informaciondelevento (
          fichasocial INTEGER PRIMARY KEY AUTOINCREMENT,
          fichatecnia VARCHAR(40) DEFAULT NULL,
          motivovisita INTEGER DEFAULT NULL,
          tipovisita VARCHAR(25) DEFAULT NULL,
          horaactivacion TIME DEFAULT NULL,
          horaatencion TIME DEFAULT NULL,
          fechavisita DATE DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado VARCHAR(25) DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          tipo int(11) DEFAULT NULL,
          declaradafallida  VARCHAR(25) DEFAULT NULL,
          ficharecuperda VARCHAR(25) DEFAULT NULL,
          horallegadaalevento  DATETIME DEFAULT NULL,
          remitir VARCHAR(100) DEFAULT NULL,
          remitir2 VARCHAR(100) DEFAULT NULL
      );`);


      database.run(`
          CREATE TABLE IF NOT EXISTS c1_identificacionevento (
          fichasocial INTEGER PRIMARY KEY NOT NULL,
          visitadagrd DATE DEFAULT NULL,
          tipoevento INTEGER DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla TEXT DEFAULT NULL,
          otro TEXT DEFAULT NULL,
          quebrada TEXT DEFAULT NULL,
          inquilinato TEXT DEFAULT NULL
        );
          `);
      database.run(`
            CREATE TABLE IF NOT EXISTS c2_localizaciondelevento (
            fichasocial INTEGER PRIMARY KEY NOT NULL,
            direccion TEXT DEFAULT NULL,
            comuna INTEGER DEFAULT NULL,
            barrio INTEGER DEFAULT NULL,
            ruralurbano INTEGER DEFAULT NULL,
            sector TEXT DEFAULT NULL,
            telefono1 VARCHAR(25) DEFAULT NULL,
            telefono2 VARCHAR(25) DEFAULT NULL,
            correo VARCHAR(100) DEFAULT NULL,
            estrato INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            dirCampo1 VARCHAR(25) DEFAULT NULL,
            dirCampo2 VARCHAR(25) DEFAULT NULL,
            dirCampo3 VARCHAR(100) DEFAULT NULL,
            dirCampo4 VARCHAR(10) DEFAULT NULL,
            dirCampo5 VARCHAR(25) DEFAULT NULL,
            dirCampo6 VARCHAR(100) DEFAULT NULL,
            dirCampo7 VARCHAR(10) DEFAULT NULL,
            dirCampo8 VARCHAR(25) DEFAULT NULL,
            dirCampo9 TEXT DEFAULT NULL,
            longitud VARCHAR(100) DEFAULT NULL,
            latitud VARCHAR(100) DEFAULT NULL
          );
          `);
      database.run(`
           CREATE TABLE IF NOT EXISTS c3_evacuacionydanos (
            fichasocial INTEGER PRIMARY KEY NOT NULL,
            tipoevacuacion INTEGER DEFAULT NULL,
            danosvivienda INTEGER DEFAULT NULL,
            danosenseres INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c4_datosdelavivienda (
            fichasocial INTEGER PRIMARY KEY NOT NULL,
            tipovivienda INTEGER DEFAULT NULL,
            materialpisos INTEGER DEFAULT NULL,
            materialpisosotro TEXT DEFAULT NULL,
            materialparedes INTEGER DEFAULT NULL,
            materialtechos INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c5_serviciospublicos (
            fichasocial INTEGER PRIMARY KEY NOT NULL,
            energia INTEGER DEFAULT NULL,
            acueducto INTEGER DEFAULT NULL,
            alcantarillado INTEGER DEFAULT NULL,
            gas INTEGER DEFAULT NULL,
            telefono INTEGER DEFAULT NULL,
            telefonofijo VARCHAR(25) DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS  c6_tiempoenlavivienda (
            fichasocial INTEGER PRIMARY KEY NOT NULL,
            tiempovivienda INTEGER DEFAULT NULL,
            tiempoviviendaunidad TEXT DEFAULT NULL,
            tiempomedellin INTEGER DEFAULT NULL,
            tiempomedellinunidad TEXT DEFAULT NULL,
            dondeviviaantes INTEGER DEFAULT NULL,
            otrodepartamento TEXT DEFAULT NULL,
            otropais TEXT DEFAULT NULL,
            otromunicipio TEXT DEFAULT NULL,
            otracomuna TEXT DEFAULT NULL,
            otrobarrio TEXT DEFAULT NULL,
            fecharegistro TEXT DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla TEXT DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c78_tenenciaydocumentosvivienda (
            fichasocial INTEGER PRIMARY KEY NOT NULL,
            tenenciadelavivienda INTEGER DEFAULT NULL,
            propietario TEXT DEFAULT NULL,
            propietariotel1 VARCHAR(25) DEFAULT NULL,
            propietariotel2 VARCHAR(25) DEFAULT NULL,
            escritura INTEGER DEFAULT NULL,
            compraventa INTEGER DEFAULT NULL,
            promesa INTEGER DEFAULT NULL,
            posesion INTEGER DEFAULT NULL,
            impuestopredial INTEGER DEFAULT NULL,
            serviciospublicos INTEGER DEFAULT NULL,
            matriculapredial INTEGER DEFAULT NULL,
            extrajuicio INTEGER DEFAULT NULL,
            ninguno INTEGER DEFAULT NULL,
            otro INTEGER DEFAULT NULL,
            cualdocumentos TEXT DEFAULT NULL,
            unidadproductuva INTEGER DEFAULT NULL,
            cualunidadproductiva TEXT DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c9_conformacionfamiliar (
            fichasocial INTEGER PRIMARY KEY NOT NULL,
            tipodefamilia INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla TEXT DEFAULT NULL,
            observacion TEXT DEFAULT NULL,
            nameFile TEXT DEFAULT NULL
          );
          `); database.run(`
           CREATE TABLE IF NOT EXISTS c10_datosgeneralesremisiones (
             idintegrante INTEGER NOT NULL,
              fichasocial INTEGER NOT NULL,
              programa INTEGER NOT NULL,
              fecharegistro DATETIME DEFAULT NULL,
              usuario INTEGER DEFAULT NULL,
              estado INTEGER DEFAULT NULL,
              tabla VARCHAR(100) DEFAULT NULL,
              observacion TEXT DEFAULT NULL,
              motivo VARCHAR(25) DEFAULT NULL,
              PRIMARY KEY (idintegrante, fichasocial, programa)
        );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c11_reddeapoyo (
            idredapoyo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            fichasocial INTEGER DEFAULT NULL,
            ubicacion VARCHAR(25) DEFAULT NULL,
            nombreauto TEXT DEFAULT NULL,
            parentesco TEXT DEFAULT NULL,
            direccion TEXT DEFAULT NULL,
            comuna TEXT DEFAULT NULL,
            barrio TEXT DEFAULT NULL,
            ruralurbano VARCHAR(25) DEFAULT NULL,
            sector TEXT DEFAULT NULL,
            telefono1 VARCHAR(25) DEFAULT NULL,
            telefono2 VARCHAR(25) DEFAULT NULL,
            dirCampo1 VARCHAR(25) DEFAULT NULL,
            dirCampo2 VARCHAR(25) DEFAULT NULL,
            dirCampo3 VARCHAR(100) DEFAULT NULL,
            dirCampo4 VARCHAR(10) DEFAULT NULL,
            dirCampo5 VARCHAR(25) DEFAULT NULL,
            dirCampo6 VARCHAR(100) DEFAULT NULL,
            dirCampo7 VARCHAR(10) DEFAULT NULL,
            dirCampo8 VARCHAR(25) DEFAULT NULL,
            dirCampo9 TEXT DEFAULT NULL,
            pais VARCHAR(25) DEFAULT NULL,
            departamento VARCHAR(25) DEFAULT NULL,
            municipio VARCHAR(25) DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c12_ayudasentregadas (
            idayudas INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            fichasocial INTEGER NOT NULL,
            paquetealimentario INTEGER DEFAULT NULL,
            tipoa INTEGER DEFAULT NULL,
            tipob INTEGER DEFAULT NULL,
            tipoc INTEGER DEFAULT NULL,
            noalimentarias INTEGER DEFAULT NULL,
            quiendoa VARCHAR(25) DEFAULT NULL,
            factura VARCHAR(25) DEFAULT NULL,
            dcocina INTEGER DEFAULT NULL,
            daseohogar INTEGER DEFAULT NULL,
            daseofamiliar INTEGER DEFAULT NULL,
            dasehombre INTEGER DEFAULT NULL,
            daseomujer INTEGER DEFAULT NULL,
            daseonna INTEGER DEFAULT NULL,
            daseoinfantil INTEGER DEFAULT NULL,
            daseoespecial INTEGER DEFAULT NULL,
            dcolchonetas INTEGER DEFAULT NULL,
            dcobijas INTEGER DEFAULT NULL,
            dsabanas INTEGER DEFAULT NULL,
            dalmohadas INTEGER DEFAULT NULL,
            enitdad TEXT DEFAULT NULL,
            otros INTEGER DEFAULT NULL,
            cuales TEXT DEFAULT NULL,
            entidadotros TEXT DEFAULT NULL,
            fechadeentrega DATE DEFAULT NULL,
            idintegrante VARCHAR(25) DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            tipoentraga INTEGER DEFAULT NULL,
            ococina INTEGER DEFAULT NULL,
            acocina INTEGER DEFAULT NULL,
            oaseohogar INTEGER DEFAULT NULL,
            aaseohogar INTEGER DEFAULT NULL,
            oaseofamiliar INTEGER DEFAULT NULL,
            aaseofamiliar INTEGER DEFAULT NULL,
            oasehombre INTEGER DEFAULT NULL,
            aasehombre INTEGER DEFAULT NULL,
            oaseomujer INTEGER DEFAULT NULL,
            aaseomujer INTEGER DEFAULT NULL,
            oaseonna INTEGER DEFAULT NULL,
            aaseonna INTEGER DEFAULT NULL,
            oaseoinfantil INTEGER DEFAULT NULL,
            aaseoinfantil INTEGER DEFAULT NULL,
            oaseoespecial INTEGER DEFAULT NULL,
            aaseoespecial INTEGER DEFAULT NULL,
            ocolchonetas INTEGER DEFAULT NULL,
            acolchonetas INTEGER DEFAULT NULL,
            ocobijas INTEGER DEFAULT NULL,
            acobijas INTEGER DEFAULT NULL,
            osabanas INTEGER DEFAULT NULL,
            asabanas INTEGER DEFAULT NULL,
            oalmohadas INTEGER DEFAULT NULL,
            aalmohadas INTEGER DEFAULT NULL,
            quienpaq VARCHAR(25) DEFAULT NULL,
            cualpaq TEXT DEFAULT NULL,
            quienasis VARCHAR(25) DEFAULT NULL,
            cualasis TEXT DEFAULT NULL,
            asistencialiamentaria INTEGER DEFAULT NULL,
            redentrega INTEGER DEFAULT NULL,
            entregado INTEGER DEFAULT NULL,
            observacion TEXT DEFAULT NULL,
            paquete1 VARCHAR(25) DEFAULT NULL,
            paquete2 VARCHAR(25) DEFAULT NULL,
            paquete3 VARCHAR(25) DEFAULT NULL,
            paquete4 VARCHAR(25) DEFAULT NULL,
            documentorecibeayuda VARCHAR(25) DEFAULT NULL,
            nombrerecibeayuda TEXT DEFAULT NULL,
            nameFirma TEXT DEFAULT NULL,
            draw_dataUrl BLOB DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c131_integrante (
            idintegrante INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            fichasocial INTEGER DEFAULT NULL,
            codigosibis VARCHAR(25) DEFAULT NULL,
            tipodedocumento INTEGER DEFAULT NULL,
            nacionalidad INTEGER DEFAULT NULL,
            numerodedocumento TEXT DEFAULT NULL,
            nombre1 TEXT DEFAULT NULL,
            nombre2 TEXT DEFAULT NULL,
            apellido1 TEXT DEFAULT NULL,
            apellido2 TEXT DEFAULT NULL,
            fechadenacimiento DATE DEFAULT NULL,
            sexo INTEGER DEFAULT NULL,
            orientacionsexual INTEGER DEFAULT NULL,
            identidaddegenero INTEGER DEFAULT NULL,
            etnia INTEGER DEFAULT NULL,
            estadocivil INTEGER DEFAULT NULL,
            gestantelactante VARCHAR(25) DEFAULT NULL,
            escolaridad INTEGER DEFAULT NULL,
            parentesco INTEGER DEFAULT NULL,
            discapacidad INTEGER DEFAULT NULL,
            regimendesalud INTEGER DEFAULT NULL,
            enfermedades INTEGER DEFAULT NULL,
            actividad INTEGER DEFAULT NULL,
            ocupacion INTEGER DEFAULT NULL,
            estadousuario INTEGER DEFAULT NULL,
            campesino INTEGER DEFAULT NULL,
            desplazado INTEGER DEFAULT NULL,
            sisbenizado INTEGER DEFAULT NULL,
            victima INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            origen VARCHAR(25) DEFAULT NULL
          );
          `); database.run(`
           CREATE TABLE IF NOT EXISTS c14_mascotas (
            fichasocial INTEGER PRIMARY KEY NOT NULL,
            tienemascotas INTEGER DEFAULT NULL,
            cuantos INTEGER DEFAULT NULL,
            cuales TEXT DEFAULT NULL,
            albergalos VARCHAR(25) DEFAULT NULL,
            dondelista VARCHAR(25) DEFAULT NULL,
            donde TEXT DEFAULT NULL,
            requierealbergue VARCHAR(25) DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
  
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c15_ubicacionposterioratencionsocial (
            fichasocial INTEGER NOT NULL,
            ubicacionposterior INTEGER NOT NULL,
            cualtemporal TEXT DEFAULT NULL,
            dondeauxilio TEXT DEFAULT NULL,
            nombreauto TEXT DEFAULT NULL,
            parentesco VARCHAR(25) DEFAULT NULL,
            prestada VARCHAR(25) DEFAULT NULL,
            cuallugardistinto TEXT DEFAULT NULL,
            direccion TEXT DEFAULT NULL,
            comuna VARCHAR(25) DEFAULT NULL,
            barrio VARCHAR(25) DEFAULT NULL,
            ruralurbano VARCHAR(25) DEFAULT NULL,
            sector TEXT DEFAULT NULL,
            telefono1 VARCHAR(25) DEFAULT NULL,
            telefono2 VARCHAR(25) DEFAULT NULL,
            dirCampo1 VARCHAR(25) DEFAULT NULL,
            dirCampo2 VARCHAR(25) DEFAULT NULL,
            dirCampo3 VARCHAR(100) DEFAULT NULL,
            dirCampo4 VARCHAR(10) DEFAULT NULL,
            dirCampo5 VARCHAR(25) DEFAULT NULL,
            dirCampo6 VARCHAR(100) DEFAULT NULL,
            dirCampo7 VARCHAR(10) DEFAULT NULL,
            dirCampo8 VARCHAR(25) DEFAULT NULL,
            dirCampo9 TEXT DEFAULT NULL,
            ubicacion VARCHAR(25) DEFAULT NULL,
            pais VARCHAR(25) DEFAULT NULL,
            departamento VARCHAR(25) DEFAULT NULL,
            municipio VARCHAR(25) DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            PRIMARY KEY (fichasocial, ubicacionposterior)
          );
  
          `); database.run(`
            CREATE TABLE IF NOT EXISTS c151_integrantesubicaciopos (
            idintegrante INTEGER NOT NULL,
            fichasocial INTEGER NOT NULL,
            ubicacionposterior INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            PRIMARY KEY (idintegrante, fichasocial)
          );
  
          `);

      database.run(`
            CREATE TABLE IF NOT EXISTS c16_observaciones (
            fichasocial INTEGER NOT NULL,
            observacion TEXT DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            PRIMARY KEY (fichasocial)
          );
  
          `);
      database.run(`
          CREATE TABLE IF NOT EXISTS c17_autorizacion (
          fichasocial INTEGER NOT NULL,
          idintegrante INTEGER DEFAULT NULL,
          entidad TEXT DEFAULT NULL,
          requerieseguimiento INTEGER DEFAULT NULL,
          fechaprobable DATE DEFAULT NULL,
          diligenciadopor INTEGER DEFAULT NULL,
          acepto VARCHAR(25) DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          draw_dataUrlImage BLOB DEFAULT NULL,
          nameFile TEXT DEFAULT NULL,
          apoyosocial TEXT DEFAULT NULL,
          draw_dataUrl BLOB DEFAULT NULL,
          nameFirma TEXT DEFAULT NULL,
          autorizofirma VARCHAR(25) DEFAULT NULL,
          idseguimiento INTEGER DEFAULT NULL,
          firmatitular VARCHAR(25) DEFAULT NULL,
          PRIMARY KEY (fichasocial)
        );
          `);
      database.run(`
            CREATE TABLE IF NOT EXISTS c101_remisiones (
            fichasocial INTEGER NOT NULL,
            remisiones INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            PRIMARY KEY (fichasocial)
          );
            `);

      database.run(`
            CREATE TABLE IF NOT EXISTS t1_programas (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              descripcion TEXT,
              estado INTEGER,
              tipo INTEGER,
              usuario INTEGER,
              tabla TEXT,
              fecharegistro DATE
            );
              `);
      database.run(`
                CREATE TABLE IF NOT EXISTS c111_reddeapoyo (
                  fichasocial int(11) NOT NULL,
                  reddeapoyo int(11) DEFAULT NULL,
                  fecharegistro datetime DEFAULT NULL,
                  usuario int(11) DEFAULT NULL,
                  estado int(11) DEFAULT NULL,
                  tabla varchar(100) DEFAULT NULL,
                  PRIMARY KEY (fichasocial)
                )
                  `);


      database.run(`
                    CREATE TABLE IF NOT EXISTS t1_parentesco (
                      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                      descripcion VARCHAR(25) DEFAULT NULL,
                      estado INTEGER DEFAULT NULL
                    );
                                          `);

      database.run(`
                   CREATE TABLE IF NOT EXISTS t1_comunas (
                      id INTEGER PRIMARY KEY NOT NULL,
                      descripcion TEXT DEFAULT NULL,
                      estado INTEGER DEFAULT NULL
                    );
                      `);

      database.run(`
                  CREATE TABLE IF NOT EXISTS t1_barrios (
                    id INTEGER PRIMARY KEY NOT NULL,
                    descripcion TEXT DEFAULT NULL,
                    comuna INTEGER DEFAULT NULL,
                    estado INTEGER DEFAULT NULL
                  );
                      `);

                      database.run(`
                        CREATE TABLE IF NOT EXISTS t1_ubicacionposterior (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          descripcion TEXT DEFAULT NULL,
                          estado INTEGER DEFAULT NULL
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
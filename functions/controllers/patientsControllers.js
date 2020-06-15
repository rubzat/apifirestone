//Configuracion
const firebase = require('firebase-admin');
const config = require('../firebase-config.json');
firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: 'https://<URL_BASE_DE_DATOS>.firebaseio.com',
});
//Controlador de Pacientes
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
const patientsDB = firestore.collection('patients');

exports.newClient = async (req,res,next) => {
  try {
    let patient = {
      name: req.body.name,
      hour: req.body.hour,
      date: req.body.date,
      symptom: req.body.symptom,
    }
    await patientsDB.add(patient);
    res.json({msg:'El cliente se agrego correctamente'});
  } catch (error) {
    console.log(error);
    next();
  }
}
//Obtener Pacientes
exports.getClients = async (req,res,next) => {
  try {
    patientsDB.get()
      .then(docs => {
        const patients = [];
    
        docs.forEach(doc => patients.push({
          id: doc.id,
          name: doc.data().name,
          hour: doc.data().hour,
          date: doc.data().date,
          symptom: doc.data().symptom
        }));
    
        return res.json(patients);
      })
      .catch(err => {
        return res.json({ error: err });
      })
  } catch (error) {
    console.log(error);
    next();
  }
}
// //Obtener Paciente
exports.getClient = async (req,res,next) => {
  try {
    let patient = await patientsDB.doc(req.params.id).get();
    res.json(patient.data());
  } catch (error) {
    console.log(error);
    next();
  }
}

//Actualizar Paciente
exports.updateClient = async (req,res,next) => {
  try {
    let updateSingle = await patientsDB.doc(req.params.id);
    await updateSingle.update(req.body);
    res.json({msg:'Paciente Actualizado'});

  } catch (error) {
    console.log(error);
    next();
  }
}

// //Eliminar Paciente
exports.deleteClient = async (req,res,next) => {
  try {
    await patientsDB.doc(req.params.id).delete();
    res.json({msg:'Paciente Eliminado'});
  } catch (error) {
    console.log(error);
    next();
  }
}


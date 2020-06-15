const express = require('express');
const router = express.Router();
const patientsControllers = require('../controllers/patientsControllers')
module.exports = function () {
  //Add Patients
  router.get('/', function(req,res){
    res.send('Api Rubzat');
  });
  //Add Patients
  router.post('/patient', 
    patientsControllers.newClient
  );
  router.post('/patient', 
    patientsControllers.newClient
  );
  //get patients
  router.get('/patients',
    patientsControllers.getClients
  );
  //get Patient
  router.get('/patient/:id',
    patientsControllers.getClient
  );
  //update Patient
  router.put('/patient/:id',
    patientsControllers.updateClient
  );
  //delete Patient
  router.delete('/patient/:id',
    patientsControllers.deleteClient
  );

  return router;
}
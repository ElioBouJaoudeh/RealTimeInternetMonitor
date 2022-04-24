const router = require('express').Router();
let Vis = require('../models/vis.model');

router.route('/').get((req, res) => {
  Vis.find()
    .then(visibilities => res.json(visibilities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const resource = req.body.resource;
    const starttime = req.body.starttime;
    const announcements = Number(req.body.announcements);
  
    const newVis = new Vis({
      resource,
      starttime,
      announcements,
    });
  
    newVis.save()
    .then(() => res.json('Visibility added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').get((req, res) => {
    Vis.findById(req.params.id)
      .then(visibility => res.json(visibility))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Vis.findByIdAndDelete(req.params.id)
      .then(() => res.json('Visibility deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Vis.findById(req.params.id)
      .then(vis => {
        vis.resource = req.body.resource;
        vis.starttime = req.body.starttime;
        vis.announcements = Number(req.body.announcements);
  
        vis.save()
          .then(() => res.json('Visibility updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;
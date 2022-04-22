const router = require('express').Router();
let Vis = require('../models/vis.model');

router.route('/').get((req, res) => {
  Vis.find()
    .then(visibilities => res.json(visibilities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const prefix = req.body.prefix;
    const date = req.body.date;
    const withdrawals = req.body.withdrawals;
    const nb_ann = Number(req.body.nb_ann);
  
    const newVis = new Vis({
      prefix,
      date,
      withdrawals,
      nb_ann,
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
        vis.prefix = req.body.prefix;
        vis.date = req.body.date;
        vis.withdrawals = req.body.withdrawals;
        vis.nb_ann = Number(req.body.nb_ann);
  
        vis.save()
          .then(() => res.json('Visibility updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;
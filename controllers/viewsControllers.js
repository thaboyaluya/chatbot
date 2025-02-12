const catchAsync = require('../utils/catchAsync');


exports.getHomePage = catchAsync(async (req, res) => {

      res.status(200).render('overview', {
        title: 'Home'
      });
    });
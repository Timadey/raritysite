// async/await error catcher
const catchAsyncErrors = fn => (
    (req, res, next) => {
      const routePromise = fn(req, res, next);
      if (routePromise.catch) {
        routePromise.catch(err => next(err));
      }
    }
  );
  
  // If user is not present redirect to login page
var getUserOrLogin = function (req, res, next) {
    var user = req.session.user;
  
    if (user == null) {
      req.session.backTo = req.originalUrl; 
      res.redirect('/login');
    } else {
      req.user = user;
      next();
    }
  };


  exports.catchAsync = catchAsyncErrors;
  exports.getUserOrLogin = getUserOrLogin;

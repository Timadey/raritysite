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

  const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  };

  // Error handling middleware for handling missing views
function handleMissingView(err, req, res, next) {
  if (err.code === 'ENOENT' && err.syscall === 'open') {
    // If the error is related to a missing view file
    res.status(404).render('500');
  } else {
    // For other types of errors, pass to the default error handler
    next(err);
  }
}

// Default error handler
function handleDefaultError(err, req, res, next) {
  // Handle other types of errors here
  console.error(err);
  res.status(500).render('500');
}

  module.exports = {
    catchAsync: catchAsyncErrors,
    getUserOrLogin: getUserOrLogin,
    isAuthenticated: isAuthenticated,
    handleMissingView,
    handleDefaultError
  };  // export { getUserOrLogin, catchAsyncErrors };
module.exports = function(app, passport) {
// Include the node file module
    var fs = require('fs');


    // here we are fething image from files but if we convert the image from url without saving
    

    // const imgURL = "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg";
    // var Jimp = require("jimp")
    // app.get('/',function(req, res){
    //   Jimp.read(imgURL, function(err,img){
    //     if (err) throw err;
    //     img.resize(32, 32).getBase64( Jimp.AUTO , function(e,img64){
    //         if(e)throw e
    //         res.send('<img src="'+img64+'">')
    //     });
          // console.log('image',img64)
          // const base64Image = img64.split(';base64,').pop();
          // fs.writeFile('uploads/thumbs/image.png', base64Image, {encoding: 'base64'}, function(err) {
          //   if(err){
          //     throw err
          //   }
          //   else{
          //     console.log('file created');
          //   }
          // });
    //   });
    // });


    // Include ImageMagick
    var im = require('imagemagick');
    var multipart = require('connect-multiparty');

    var multipartMiddleware = multipart();


    app.get('/upload',isLoggedIn,function (req, res){
      res.render('upload.ejs');
    });



    // code for upload image and convert the image 
    app.post('/uploadImage',multipartMiddleware,isLoggedIn, function(req, res,next) {
      fs.readFile(req.files.image.path, function (err, data) {
        var imageName = req.files.image.name
        /// If there's an error
        if(!imageName){
          console.log("There was an error")
          res.redirect("/");
          res.end();
        } else {
          //upload original saved into /uploads/fullsize/ folder
          var newPath = __dirname + "/uploads/fullsize/" + imageName;
          //upload convert image save into /uploads/thumbs/ folder
          var thumbPath = __dirname + "/uploads/thumbs/" + imageName;
          // write file to uploads/fullsize folder
          fs.writeFile(newPath, data, function (err) {
            // write file to uploads/thumbs folder
            im.resize({
              srcPath: newPath,
              dstPath: thumbPath,
              hight:50,
              width:50
            }, function(err, stdout, stderr){
              if (err) throw err;
              console.log('resized image to fit within 50x50px');
            });
             res.render('profile.ejs', {
                user : req.user
            });
          });
        }
      });
    });
// LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // Show files
    // app.get('/uploads/fullsize/:file', function (req, res){
    //   file = req.params.file;
    //   var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
    //   res.writeHead(200, {'Content-Type': 'image/jpg' });
    //   res.end(img, 'binary');
    // });

    // app.get('/uploads/thumbs/:file', function (req, res){
    //   file = req.params.file;
    //   var img = fs.readFileSync(__dirname + "/uploads/thumbs/" + file);
    //   res.writeHead(200, {'Content-Type': 'image/jpg' });
    //   res.end(img, 'binary');
    // });








// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/upload', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/upload', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


   

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/upload', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/upload');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

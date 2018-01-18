# Authentication Server using passport

We will be using Passport to authenticate users locally


If you would like to download the code and try it for yourself:

1. Clone the repo: `git clone git@github.com:chandankuiry/Authentication-server`
2. Install packages: `npm install`
3. Change out the database configuration in config/database.js
5. Launch: `npm start`
6. Visit in your browser at: `http://localhost:8080`
7. checking eslint error: `npm run lint`
8. for fixing the error:`npm run lint-fix`


# Running in browser
Visit in your browser at: `http://localhost:8080`
/login or /signup(you can crete new account)

/login
Email: chadan@gmail.com
Password: 123

After login

upload image 
When you submit the image you can render to /profile page
you can see original  image in [app/uploads/fullsize](https://github.com/chandankuiry/Authentication-server/tree/master/app/uploads/fullsize) folder 
and you can see the thumb image(after convertion of 50*50 pix ) in [app/uploads/thumb](https://github.com/chandankuiry/Authentication-server/tree/master/app/uploads/thumbs) folder.


/profile 

id:userid
email: raw email
password: hash password


/logout


all the routes are present in app/routes.js 

here I did not use image which will be in url format.I used raw image by uploading image.
but I have written the code for url format also  in [routes.js](https://github.com/chandankuiry/Authentication-server/blob/master/app/routes.js) folder line no 9.


# Docker build process 

I have written [Dockerfile](https://github.com/chandankuiry/Authentication-server/blob/master/Dockerfile) for this project .

 

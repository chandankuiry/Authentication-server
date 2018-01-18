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

```js
const imgURL = "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg";
    var Jimp = require("jimp")
    app.get('/',function(req, res){
      Jimp.read(imgURL, function(err,img){
        if (err) throw err;
        img.resize(32, 32).getBase64( Jimp.AUTO , function(e,img64){
            if(e)throw e
            res.send('<img src="'+img64+'">')
        });
          console.log('image',img64)
          const base64Image = img64.split(';base64,').pop();
          fs.writeFile('uploads/thumbs/image.png', base64Image, {encoding: 'base64'}, function(err) {
            if(err){
              throw err
            }
            else{
              console.log('file created');
            }
          });
      });
    });

```


# Docker build process 

I have written [Dockerfile](https://github.com/chandankuiry/Authentication-server/blob/master/Dockerfile) for this project .

```
#download node 
FROM node:slim
MAINTAINER Chandan kuiry

# Create app directory
WORKDIR /usr/src/auth-server
# copy the package,json file
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
```
 

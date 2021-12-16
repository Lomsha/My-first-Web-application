# My-first-Web-application
This is a simple basic express app.

I have organized the  code by following the Model-View-Controller paradigm for software application architectures to separate internal representations of information from the ways information is presented to and accepted from the user. The following are my  mongoose models;
 
Mongoose models: review, shoe and user.  These have provided a way for me to model out the application data and define schemas. It has offered ways tovalidate data and build complex queries  from the comfort of Js. This manages the data, logic and rules of the application.
 
The views directory:
This is any representation of information such as images.In my views directory, I have auth,layouts,partials and products folders. In the same directory, I have the home and error templates

Controller: 

The contoller responds to the user input and performs interactions on the data model objects. The controller receives the input, optionally validates it and then passes the input to the model. This accepts input and converts it to commands for the model or view.
I have named my controllers from the three main types of  data to be received from the users interacting with my app, that is shoes,reviews and authentication or (auth).

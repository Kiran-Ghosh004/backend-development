created models first one is usermodel where we will store the user data like name password email and post where post depends on the another model which is postmodel in post model we have schema as user which depends on the user model then likes which is also depends on the user model so we created both the models 


we created the auth which is super easy to create using jwt and cookies with parser lets not talk about this in detail 

we created isloggedin middleware just to see if the person is authenticated or not cuz obviously we wont let an unauthenticated person to create post or like a post 
it checks for the cookie token in the browser if it gets it tells us that the person is authenticated 



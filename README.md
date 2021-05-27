# This is Virtual Queue Management system in which a percen can create a ticket without physically present at the location

## FEATURES

- There are two different dashboards for regukar users and store owners(admin)
- A user can create tickets for more then 1 store at a time
- Can get update of current active number in queue and total numbers in queue
- Don't need to relogin every time you visit website
- User info will be saved in cookie for 7 days hence no need to login again when refresh

## Tools And Technology used-

- React.js for frontend
- Material-UI
- node.js/ExpressJs API for backend [Api source code](https://github.com/atisheyJain03/inqueue_backend)
- socket.io for realtime functionality
- Mongodb with mongoose for database
- jwt
- Hosted on firebase

### HomePage

![HomePage](./readme_images/Homepage.png)

# USER DASHBOARD

### Login/SignIn (Existing Users)

![Login picture](./readme_images/Login.png)

- Click on Login button on HomePage
- Enter Email and Password and then click SignIN button

### Signup

![SignUp picture](./readme_images/SignUp.png)

- Go to Login Page and click on Don't have an account? Sign Up
- Enter Name,Email,Password,Password Confirm
- Click on Signup button

### All Shops amd services

![All Shops picture](./readme_images/All_Shops.png)

- To see all shops click on Shop And Services button on HomePage
- After that a page like shown above will be open where you can click on the shop for which you need a ticket

### Token Generation

![Token](./readme_images/info.png)
![Token](./readme_images/Generate_ticket_user.png)

- To generate a token click on a shop for which you want to generate a token
- Select a service (There can be many services offered by a shop for Example if it is a hospital there can be different Queues for Different Labs or different doctors)
- After that click on Generate a token button
- A request for a token will be sent to the Shop Admin
- After the Response of the shop owner you will get a notification which you can see by click on bell icon on navbar

### Get Information about all Tickets

![Token](./readme_images/My_tickets.png)

- To know status of all tokens click on avatar icon on navbar
- Here you will get all information about the token
- There can be three status of the token waiting,accepted or rejected
- user can cancel token by clicking on cancel button
- By clicking on Icon on top left corner A drawer will be open

### Other Settings

![More Settings](./readme_images/my_info.png)

- By click on user info on Drawer user can change there name and profile Picture
- By clicking on Logout Button user can logout

# Mailing System 

![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=darkgreen) ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)


<br/>  
<br/>  


## Table Of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [About the Application](#about)
  - [Registration Page](#registration-page)
  - [Login Page](#login-page)
  - [Index Page](#index-page)
    - [Inbox](#inbox)
    - [Sent](#sent)
    - [Archive](#archive)
    - [Composing a New Mail](#composing)
    - [Replying to a Mail](#replying)
- [Author](#author)


<br/>  
<br/>  


<div name="introduction">

## Introduction
A single page web application that allows users to send and receive emails. 

**NOTE:** This application is not an email client. Sending and receiving of mails between users is possible within this applcaition only.


<br/>  
<br/>  


<div name="setup">

## Setup

### Cloning the Repository
You can clone this repository by either downloading a zip file or by using the following command.
```
git clone https://github.com/cmn22/mail
```

<br/>

### Creating a virtual environment 
#### For Unix/macOS
1. Installing virtualenv
    ```
    pip3 install virtualenv
    ```
2. Creating a virtual environment
    ```
    virtualenv env
    ```
3. Activating the virtual environment
    ```
    source env/bin/activate
    ```
<br>    

#### For Windows
1. Installing virtualenv
    ```
    pip3 install virtualenv
    ```
2. Creating a virtual environment
    ```
    virtualenv env
    ```
3. Activating the virtual environment
    ```
    .\env\Scripts\activate
    ```

<br/>
<br/>

### Installing required dependencies
Install the required packages as stated in requirements.txt file
```
pip3 install -r requirements.txt
```

<br/>
<br/>

### Running the application
1. Make Migrations 
    ```
    python3 manage.py makemigrations
    ```
2. Migrate
    ```
    python3 manage.py migrate
    ```
3. Runserver (on port 8000)
    ```
    python3 manage.py runserver 0.0.0.0:8000
    ```
4. Open the corresponding address on a web browser and your application should be up and running.


<br/>
<br/>


<div name="about">

## About the Application

<div name="registration-page">

### Registration Page: (/register)

- The **Register Page** helps a new user to create a new email account so that the user can start sending and receiving emails. If the user already has an account, he can directly login.
- The email address can be in the format username@email.com.
- The user has to type and confirm a password for their account.
- The registration form is processed by sending a POST request to /register.
- Basic checks are performed on the backend such as availability of email address and password matching and appropriate message is displayed if the checks fail.

<img src="mail/static/mail/images/ss_register.png" width=100%>  
<br/>
<br/>

<br/>


<div name="login-page">

### Login Page: (/login)
- The **Login Page** helps the user to login in so that he can start sending and receiving emails. If the user does not have a account, he can create one using the register option.  
- Existing users have to enter their email address and password to login to their account.
- The credentials are confirmed on the backend by sending a POST request to /login.
- Appropriate message is displayed if the credentials are invalid.
- New users can click on “Register here” to create a new account.

<img src="mail/static/mail/images/ss_login.png" width=100%>
<br/>
<br/>  


<br/>  


<div name="index-page">

### Index Page: (/)
As this is a single page web application, this index route contains all the parts of the web page. This route has various view sections such as, mail list, detailed mail view and compose view all of which is controlled using JavaScript.  

The **Home Page** has the header navigation bar using which the user can access the different functionalities if the website. The user can compose a new email, access his/her Inbox, Sent box or Archive box and can also Logout.  

- Load the appropriate mailbox as per the users selection.
- GET requests are made to /emails/<mailbox> to get the emails for a particular mailbox.
- When a mailbox is visited, the application queries the API for the latest emails in that mailbox.
- The name of the mailbox is displayed on the top of the page.
- For each email, it’s sender, subject line and timestamp is displayed.
Unread emails have a white background while read emails have a grey background. 


<br/>  

<div name="inbox">

#### INBOX
The user is by default presented with the **Inbox**, where he/she can see all the emails that they have received. Optionally, the user can access his sent emails by clicking on the SENT button in the navigation bar.  
Unread emails have a whitish background while the read messages have a greyish/blackish background.  
On accessing a email via the Inbox, the user can additionally reply or archive the email.

<img src="mail/static/mail/images/ss_inbox.png" width=100%> 
<br/>
<br/> 


<br/>  

<div name="sent">

#### SENT
The user is automatically taken to the **Sent Box**, where he/she can see all the emails that they have sent. Optionally, the user can access his sent emails by clicking on the _SENT_ button in the navigation bar.  
On accessing a email via the Sent box, the user cannot perform any additional functionality.

<img src="mail/static/mail/images/ss_sent.png" width=100%>  
<br/>
<br/>


<br/>  

<div name="archive">

#### ARCHIVE
The user can access the **Archive Box**, where he/she can see all the emails that they have archived by clicking on the _ARCHIVE_ button in the navigation bar.  
On accessing a email via the Archive box, the user can either reply to the email or un-archive it.

<img src="mail/static/mail/images/ss_archive.png" width=100%>  
<br/>
<br/>


<br/>  

<div name="compose">

#### COMPOSING A NEW MAIL
- The user can compose a **New Mail** by clicking on the _COMPOSE_ button in the navigation bar.  

- For composing a new email, the user must provide with a valid recipient, subject (optional) and with the body (contents) of the email. After the user is finished with the writing of the email, the user can click on the _SEND_ button to send the email. If the user had provided a valid email, the website will give a alert message acknowledging that the email was sent successfully, but if there is some problem with the validity of the recipient emails, the user is alerted with a appropriate message.

- When the user submits the email composition form, send the email using JavaScript.
- This is done by making POST request to /emails and passing in values for recipients, subject and body.
- Once the email has been sent, the user’s SENT mailbox is loaded.

<img src="mail/static/mail/images/ss_compose.png" width=100%> 
<br/>
<br/> 


<br/>  

<div name="reply">

#### REPLYING TO A MAIL
- The user can reply to a received email by clicking on the _REPLY_ button.
- Subsequently, the user is taken to the _"COMPOSE MAIL"_ form.
- When viewing a email, the user has a “REPLY” button that lets them reply to the email.
- The user is taken to the email composition form when he click on reply.
- The recipient field is pre-filled with the original sender’s email address.
- The subject line is pre-filled as “Re: ” followed by the original email’s subject line.
- The body is pre-filled with the contents of the original email preceded by the line like “On Jan 1 2022, 12:00 AM xyz@email.com wrote:”

<img src="mail/static/mail/images/ss_reply.png" width=100%> 
<br/>
<br/> 


<br/>
<br/>  


<div name="author">

## Author 

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](
https://www.linkedin.com/in/chaitanya-malani/) 
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cmn22) [![FaceBook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/itsme.cmn22) [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/ChaitanyaMalani) [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/itsme.cmn22/)

This project has been made by Chaitanya Malani 

Demonstration of this project can be viewed on [YouTube](https://youtu.be/N5IUGWdcLrk)

I am an aspiring software engineer who is currently studying Computer Science in Mumbai, India. I love to code and explore various fields within computers. Also I am a very big football enthusiast and I love supporting Manchester United F.C.

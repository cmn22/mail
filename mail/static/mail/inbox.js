document.addEventListener('DOMContentLoaded', function() {

    // By default, load the inbox
    load_mailbox('inbox');

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);

});


function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#mail').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';

    // On submitting the form
    document.querySelector('#compose-form').addEventListener('submit', send_mail);

}


function send_mail() {

    event.preventDefault();

    // To send the email
    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: document.querySelector('#compose-recipients').value,
            subject: document.querySelector('#compose-subject').value,
            body: document.querySelector('#compose-body').value
        })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);

        if (result.message == "Email sent successfully."){
            alert(result.message);
            load_mailbox('sent');
        }
        else{
            alert(result.error);
        }
    })
    .catch(error => {
        console.log(error);
        alert(`Error: ${error}`);
    });

}

function load_mailbox(mailbox) {

    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#mail').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';

    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3 class="sub-heading">${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

    // Show the email list
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
        // Print email list
        console.log(emails);

        // Display email list
        emails.forEach(mail => {

            // Create div for displaying mails
            const element = document.createElement('div');
            element.id = mail.id;
            element.classList.add("email_list");

            // Contents of each mail div
            element.innerHTML = `<strong class="email_list-email">${mail.sender}</strong><p class="email_list-subject">${mail.subject}</p><p class="email_list-timestamp">${mail.timestamp}</p>`;

            if (mailbox == 'sent'){
                element.innerHTML = `<strong class="email_list-email">${mail.recipients}</strong><p class="email_list-subject">${mail.subject}</p><p class="email_list-timestamp">${mail.timestamp}</p>`;
            }

            // On clicking a particular mail
            element.addEventListener('click', function(){
                console.log(`mail: ${element.id} clicked!`);

                // Show only the mail details
                document.querySelector('#emails-view').style.display = 'none';
                document.querySelector('#compose-view').style.display = 'none';
                document.querySelector('#mail').style.display = 'block';

                // To mark mail as read
                fetch(`/emails/${element.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        read: true
                    })
                })

                // To fetch details of a mail
                fetch(`/emails/${element.id}`)
                .then(response => response.json())
                .then(email => {
                    console.log(email);

                    // Display details of a mail
                    document.querySelector('#from').innerHTML = `<b class="mail-label">From: </b>${email.sender}`;
                    document.querySelector('#to').innerHTML = `<b class="mail-label">To: </b>${email.recipients}`;
                    document.querySelector('#subject').innerHTML = `<b class="mail-label">Subject: </b>${email.subject}`;
                    document.querySelector('#time').innerHTML = `<b class="mail-label">Time: </b>${email.timestamp}`;
                    document.querySelector('#body').value = `${email.body}`;

                    // To enable the 'archive' button
                    if(mailbox === 'inbox'){
                        document.querySelector('#unarchive').style.display = 'none';
                        document.querySelector('#archive').style.display = 'inline';
                        document.querySelector('#reply').style.display = 'inline';

                        // To archive the mail
                        document.querySelector('#archive').addEventListener('click', function(){
                            console.log(`archive ${element.id}`);
                            fetch(`/emails/${element.id}`,{
                                method: 'PUT',
                                body: JSON.stringify({
                                    archived: true
                                })
                            })
                            alert("Archived");
                            location.reload();
                        });
                    }

                    // To enable the 'un-archive' button
                    if(mailbox === 'archive'){
                        document.querySelector('#archive').style.display = 'none';
                        document.querySelector('#unarchive').style.display = 'inline';
                        document.querySelector('#reply').style.display = 'inline';

                        // To un-archive the mail
                        document.querySelector('#unarchive').addEventListener('click', function(){
                            console.log(`unarchive mail: ${element.id}`);
                            fetch(`/emails/${element.id}`, {
                                method: 'PUT',
                                body: JSON.stringify({
                                    archived: false
                                })
                            })
                            alert("Unarchived");
                            location.reload();
                        });
                    }

                    // To enable 'sent' button
                    if(mailbox === 'inbox' || mailbox === 'archive'){

                        document.querySelector('#reply').addEventListener('click', function(){

                            // Show compose view and hide other views
                            document.querySelector('#emails-view').style.display = 'none';
                            document.querySelector('#mail').style.display = 'none';
                            document.querySelector('#compose-view').style.display = 'block';

                            // Pre-populate composition fields
                            document.querySelector('#compose-recipients').value = `${mail.sender}`;
                            document.querySelector('#compose-recipients').disabled = true;

                            if (mail.subject.substring(0,3) == "Re:"){
                                document.querySelector('#compose-subject').value = `${mail.subject}`;
                            }
                            else{
                                document.querySelector('#compose-subject').value = `Re: ${mail.subject}`;
                            }

                            document.querySelector('#compose-body').value = `On ${mail.timestamp} ${mail.sender} wrote: \n${mail.body}`;

                            // On submitting the form
                            document.querySelector('#compose-form').addEventListener('submit', send_mail);
                        });
                    }

                    // To hide archive, unarchive and send button
                    if(mailbox === 'sent'){
                        document.querySelector('#unarchive').style.display = 'none';
                        document.querySelector('#archive').style.display = 'none';
                        document.querySelector('#reply').style.display = 'none';
                    }

                });

            });

            // To distinguish read and unread messages in the inbox
            if(mail.read === true){
                element.style.background = "black";
                element.style.color = "white";
                element.style.borderColor = "black";
            }
            else{
                element.style.background = "white";
                element.style.color = "black";
                element.style.borderColor = "black";
            }

            // For displaying messages in the sent box
            if(mailbox === "sent"){
                element.style.background = "black";
                element.style.color = "white";
                element.style.borderColor = "black";
            }

            // For displaying messages in archive
            if(mailbox === 'archive'){
                element.style.background = "black";
                element.style.color = "white";
                element.style.borderColor = "black";
            }

            // To insert mail in the email_list
            document.querySelector('#emails-view').append(element);

        });

    });
}

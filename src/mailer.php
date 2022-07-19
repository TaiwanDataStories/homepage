<?php
    // My modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name1 = strip_tags(trim($_POST["nameFirst"]));
                $name1 = str_replace(array("\r","\n"),array(" "," "),$name1);
        $name2 = strip_tags(trim($_POST["nameLast"]));
                $name2 = str_replace(array("\r","\n"),array(" "," "),$name2);
        $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL );
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($name1) OR empty($name2) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "jhjanicki@gmail.com";

        // Set the email subject.
        $subject = "New contact from $name1";

        // Build the email content.
        $email_content = "First Name: $name1\n";
        $email_content .= "Last Name: $name2\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name1 <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
?>

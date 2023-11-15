<?php


require 'PHPMailerAutoload.php';

$TextBody="";
$site=$_SERVER['SERVER_NAME'];

//Create a new PHPMailer instance
$mail = new PHPMailer;

$mail->IsSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.server.com';                 // Specify main and backup server
$mail->Port = 465;                                    // Set the SMTP port
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '';                // SMTP username
$mail->Password = '';                  // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable encryption, 'ssl' also accepted



$mail->CharSet = 'UTF-8';
//Set who the message is to be sent from
$mail->setFrom('tacticlead@gmail.com', 'Заявка с сайта');

//Set an alternative reply-to address
$mail->addAddress('tacticlead@gmail.com', ''); // email для приема заявок
// $mail->AddBCC('sergey.gamal@gmail.com');
// $mail->AddBCC('');

//Set the subject line
$mail->Subject = 'Заявка с сайта '.$site;

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body

    foreach ( $_POST as $key => $value ) {
        if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
            foreach ( $value as $key => $value ) {
            $TextBody .= "
            " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
        </tr>
        ";
        }
    }
}


$TextBody = "<table style='width: 100%;'>$TextBody</table>";

$mail->msgHTML($TextBody);
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file

if ($_FILES) {
   
            $tmp_name = $_FILES["files"]["tmp_name"]; 
            $name = $_FILES["files"]["name"];
            $name=$dir.$name;
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($name));
			if (move_uploaded_file($tmp_name, $uploadfile)){
			$mail->addAttachment($uploadfile, $name);
			}


}


//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";

}
?>
<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Inclure l'autoloader de Composer
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Destinataire (remplace cette adresse par la tienne)
    $to = "tiamiyouaremou452@gmail.com";

    // Initialiser PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'tiamiyouaremou452@gmail.com'; // Remplace par ton email
        $mail->Password = 'locy kdau zqkv ngyi';   // Remplace par ton mot de passe (ou mot de passe d'application)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Configurer l'email
        $mail->setFrom($email, $name);
        $mail->addAddress($to); // Destinataire
        $mail->Subject = "Nouveau message de contact - " . $subject;
        $mail->isHTML(true);
        $mail->Body = "<h3>Nouveau message de contact</h3>
                       <p><strong>Nom :</strong> {$name}</p>
                       <p><strong>E-mail :</strong> {$email}</p>
                       <p><strong>Message :</strong><br>{$message}</p>";
        $mail->AltBody = "Nom: {$name}\nE-mail: {$email}\nMessage: {$message}";

        // Envoyer l'email
        if ($mail->send()) {
            // Redirection automatique après 2 secondes
            echo "<script>
                    setTimeout(function() {
                        window.location.href = 'thank-you.html'; // Redirection vers la page de remerciement
                    }, 2000); // Délai de 2 secondes
                  </script>";
        }
    } catch (Exception $e) {
        echo "Erreur : l'envoi de l'email a échoué. {$mail->ErrorInfo}";
    }
}
?>

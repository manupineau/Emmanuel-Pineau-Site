<?php
// 1. Définir l'adresse email qui va recevoir les messages
define('DESTINATAIRE_EMAIL', 'manupineau@gmail.com'); // 👈 REMPLACEZ PAR VOTRE EMAIL
define('SUJET_EMAIL', 'Nouveau message depuis le site web');

// 2. Vérifier que le formulaire a été soumis via la méthode POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // 3. Récupérer et nettoyer les données (protection contre les injections de script)
    $name    = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email   = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : false;
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // 4. Validation des champs obligatoires
    if (empty($name) || !$email || empty($message)) {
        // Redirection avec un message d'erreur si un champ est invalide
        header("Location: contact.html?status=error_inputs");
        exit;
    }

    // 5. Construction du corps de l'email
    $corps_email  = "Vous avez reçu un nouveau message depuis le formulaire de contact :\n\n";
    $corps_email .= "Nom : " . $name . "\n";
    $corps_email .= "Email : " . $email . "\n\n";
    $corps_email .= "Message :\n" . $message . "\n";

    // 6. Configuration des entêtes (Headers) de l'email
    // On définit le "Reply-To" pour pouvoir répondre directement à l'expéditeur
    $headers = [
        'From' => 'emmanuel@emmanuelpineau.net', // 👈 Mettez un email lié à votre hébergement
        'Reply-To' => $email,
        'Content-Type' => 'text/plain; charset=UTF-8',
        'X-Mailer' => 'PHP/' . phpversion()
    ];

    // 7. Envoi de l'email
    if (mail(DESTINATAIRE_EMAIL, SUJET_EMAIL, $corps_email, $headers)) {
        // Redirection en cas de succès
        header("Location: contact.html?status=success");
        exit;
    } else {
        // Redirection en cas d'erreur technique du serveur de mail
        header("Location: contact.html?status=server_error");
        exit;
    }
} else {
    // Si quelqu'un tente d'accéder directement au fichier PHP sans le formulaire
    header("Location: contact.html");
    exit;
}

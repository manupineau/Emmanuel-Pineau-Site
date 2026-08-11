<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sécurisation des données
    $nom = strip_tags(trim($_POST["nom"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Vérification des champs
    if (empty($nom) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Erreur dans le formulaire.";
        exit;
    }

    // Paramètres d'envoi
    $destinataire = "manupineau@gmail.com";
    $sujet = "Nouveau message de : " . $nom;
    $contenu = "Nom : $nom\n";
    $contenu .= "Email : $email\n\n";
    $contenu .= "Message :\n$message";
    
    $headers = "From: manupineau@gmail.com\r\nReply-To: $email";

    // Envoi du mail
    if (mail($destinataire, $sujet, $contenu, $headers)) {
        echo "Merci, votre message a bien été envoyé.";
    } else {
        echo "Une erreur est survenue, l'envoi a échoué.";
    }
}
?>
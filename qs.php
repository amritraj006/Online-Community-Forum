<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['question'])) {
        $question = trim($_POST['question']);

        // OPTIONAL: sanitize input
        $safe_question = htmlspecialchars($question, ENT_QUOTES, 'UTF-8');

        // You can now save this to a database or file
        // For testing, we'll just log it to a file
        file_put_contents("questions.txt", $safe_question . PHP_EOL, FILE_APPEND);

        echo "Question received: " . $safe_question;
    } else {
        echo "No question received.";
    }
} else {
    echo "Invalid request method.";
}

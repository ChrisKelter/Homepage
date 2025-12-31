<?php
  define("VERIFY_URL", "https://www.google.com/recaptcha/api/siteverify");
  define("SECRET", "6LdF88AZAAAAAE-PHaVIuDiDa2MP4LOctNMb3fpV");
  define("EMAIL_FROM", "webform@kelter.at");
  define("EMAIL_TO", "christopher@kelter.at");

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

      if(verifyData($data)) {
        $captcha_result = check_captcha($data['token']);

        if($captcha_result->success == true && $captcha_result->score >= 0.6) {
          sendEmail($data);
          echo 1;
        }

        else {
          echo 0;
        }
      }
  }

  function check_captcha($token) {
      $values = "secret=" . SECRET ."&response=" . $token;
      $ch = curl_init(VERIFY_URL);
      curl_setopt( $ch, CURLOPT_POST, 1);
      curl_setopt( $ch, CURLOPT_POSTFIELDS, $values);
      curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt( $ch, CURLOPT_HEADER, 0);
      curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

      $response = curl_exec( $ch );
      return json_decode($response);
  }

  function sendEmail($data) {
    $headers = 'From: "' . $data['name'] .'" <' . EMAIL_FROM . ">\r\n" .
        'Reply-To: ' . $data['email'] . "\r\n" .
        'Content-type: text/html; charset=utf-8' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    $message = "Neue Anfrage von '" . $data['name'] . "'\n";
    $message .= "Antwort an: " . $data['email'] . "\n\n";
    $message .= $data['message'];

    $message = str_replace("\n", "<br>", $message);
    mail(EMAIL_TO, $data['subject'], $message, $headers);
  }

  function verifyData($data) {
    if (array_key_exists('token', $data) && array_key_exists('name', $data) && array_key_exists('email', $data) &&
    array_key_exists('subject', $data) && array_key_exists('message', $data)) {
      return true;
    }

    return false;
  }


?>

<?php
  require_once('../const.php');
  define("VERIFY_URL", "https://global.frcapi.com/api/v2/captcha/siteverify");
  define("API_KEY", "A1C8I0498870QRFLK2BMURQ2DU5OV3HB7UHQOJL3CAC14EFSUFMP6ANHNF");
  define("EMAIL_FROM", "webform@kelter.at");
  define("EMAIL_TO", "christopher@kelter.at");

  if (!defined('API_KEY')) {
      define('API_KEY', 'NOT_SET');
  }

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

      if(verifyData($data)) {
        $captcha_result = check_captcha($data['captcha']);

        if($captcha_result->success == true) {
          sendEmail($data);
          echo "{}";
          exit;
        }

        else {
          http_response_code(400);
          header('Content-Type: application/json');
          echo json_encode([
                'error_code' => $captcha_result->error_code,
                'error_message' => $captcha_result->detail
            ]);
            exit;
        }
      }
  }
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode([
      'message' => 'Wrong request!'
  ]);
  exit;

  function check_captcha($captcha) {
      $data = json_encode([
              'response' => $captcha['response']
          ]);

      $header = [
                    'Content-Type: application/json',
                    'X-API-Key: ' . API_KEY
                ];

      $ch = curl_init(VERIFY_URL);
      curl_setopt( $ch, CURLOPT_POST, true);
      curl_setopt( $ch, CURLOPT_POSTFIELDS, $data);
      curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true);
      curl_setopt( $ch, CURLOPT_HTTPHEADER, $header);
      curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt( $ch, CURLOPT_HEADER, false);

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
    if (array_key_exists('captcha', $data) && array_key_exists('name', $data) && array_key_exists('email', $data) &&
    array_key_exists('subject', $data) && array_key_exists('message', $data)) {
      return true;
    }

    return false;
  }


?>

<?php
// 関数ファイル読み込み
require('function.php');

//判定用変数の初期化
$page_flg = 0;
$clean = array();

// サニタイズ
if (!empty($_POST)) {
  foreach ($_POST as $key => $val) {
    $clean[$key] = htmlspecialchars($val, ENT_QUOTES);
  }
}

if (!empty($clean['confirm'])) {
  // 送信内容確認ページを表示する場合の処理
  // 未入力チェック
  validRequired($clean['name'], 'name');
  validRequired($clean['email'], 'email');
  validRequired($clean['message'], 'message');

  if (empty($err_msg)) {
    // nameの最大文字数チェック
    validMaxLen($clean['name'], 'name', 20);
    // emailの形式、最大文字数チェック
    validEmail($clean['email'], 'email');
    validMaxLen($clean['email'], 'email', 50);
    // messageの最大文字数チェック
    validMaxLen($clean['message'], 'message', 500);
  }

  if (empty($err_msg)) {
    $page_flg = 1;

    // セッション開始
    session_start();
    $_SESSION['page'] = true;
  }
} elseif (!empty($_POST['submit'])) {
  // 送信完了ページを表示する場合の処理
  session_start();
  if (!empty($_SESSION['page']) && $_SESSION['page'] === true) {
    // セッションの削除
    unset($_SESSION['page']);
    //==============================
    // お問い合わせ完了メール送信関連
    //==============================
    // タイムゾーンの初期化と変数の準備
    date_default_timezone_set('Asia/Tokyo');
    $header = null;
    $auto_reply_subject = null;
    $auto_reply_text = null;
    $admin_reply_subject = null;
    $admin_reply_text = null;

    // ヘッダー情報を設定
    $header = "MIME-Version: 1.0\n";
    $header .= "From: K.Ishikawa <no-reply@tanakatarou6.com>\n";
    $header .= "Reply-To: K.Ishikawa <no-reply@tanakatarou6.com>\n";

    // メール本文で使う情報の準備
    $send_date = date("Y-m-d H:i");
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // ユーザー側へのメールの件名と本文
    $auto_reply_subject = 'お問い合わせいただきありがとうございます';
    $auto_reply_text = <<<EOT
この度は、お問い合わせいただき誠に有難うございます。
下記の内容でお問い合わせを受け付けいたしました。
24時間以内にご登録いただいたメールアドレス宛にご連絡いたします。

お問い合わせ日時：{$send_date}

氏名：{$name}
メールアドレス：{$email}
お問い合わせ内容：
{$message}
EOT;

    // ユーザー側へメール送信
    mb_send_mail($email, $auto_reply_subject, $auto_reply_text, $header);

    // 管理者側へのメールの件名と本文
    $admin_reply_subject = "お問い合わせを受け付けました";
    $admin_reply_text = <<<EOT
下記の内容でお問い合わせを受け付けました。

お問い合わせ日時：{$send_date}

氏名：{$name}
メールアドレス：{$email}
お問い合わせ内容：
{$message}
EOT;

    // 管理者側へメール送信
    mb_send_mail('tanakatarou6@msn.com', $admin_reply_subject, $admin_reply_text, $header);
  }

  $page_flg = 2;
} else {
  // お問い合わせページを表示する場合の処理
  $page_flg = 0;
}

if ($page_flg === 0) {
}



if ($page_flg === 2) {
  // 送信完了画面のとき

}


?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio</title>
  <link rel="stylesheet" type="text/css" href="reset.css" />
  <link rel="stylesheet" type="text/css" href="style.css" />
</head>

<body class="page_contact">
  <!-------- header -------->
  <header class="header">
    <div class="container">
      <div class="header_left">
        <h1 class="header_h1">
          <a href="index.html">Kazuya's<br />Portfolio</a>
        </h1>
      </div>
      <div class="hamburger">
        <span class="hamburger_icon">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
      <div class="header_right">
        <ul>
          <li><a href="index.html">TOP</a></li>
          <li><a href="index.html#about">ABOUT</a></li>
          <li><a href="index.html#skill">SKILLS</a></li>
          <li><a href="index.html#works">WORKS</a></li>
          <li><a href="contact.php">CONTACT</a></li>
        </ul>
      </div>
    </div>
  </header>
  <!-------- contact -------->
  <div id="contact" class="contact header_anchor">
    <div class="container">

      <?php if ($page_flg === 0) : ?>
        <!-- 「お問い合わせフォーム」モード -->
        <h2>お問い合わせ</h2>
        <h3>制作の依頼やご相談(無料)はこちらからどうぞ</h3>
        <form action="" method="post" class="form">
          <div class="area_msg">
            <?php
            if (!empty($err_msg['common'])) echo $err_msg['common'];
            ?>
          </div>
          <div class="form_group <?php if (!empty($err_msg['name'])) echo 'err' ?>">
            <label for="name" class="contact_label">お名前</label><span class="check"></span>
            <input type="text" id="name" class="valid_name" name="name" placeholder="example:田中太郎" value="<?php if (!empty($_POST['name'])) echo $_POST['name']; ?>" />
            <div class="area_msg">
              <?php if (!empty($err_msg['name'])) echo $err_msg['name']; ?>
            </div>
          </div>
          <div class="form_group <?php if (!empty($err_msg['email'])) echo 'err' ?>">
            <label for="email" class="contact_label">メールアドレス</label><span class="check"></span>
            <input type="text" id="email" class="valid_email" name="email" placeholder="example:sample@sample.com" value="<?php if (!empty($_POST['email'])) echo $_POST['email']; ?>" />
            <div class="area_msg">
              <?php if (!empty($err_msg['email'])) echo $err_msg['email']; ?>
            </div>
          </div>
          <div class="form_group <?php if (!empty($err_msg['message'])) echo 'err' ?>">
            <label for="message" class="contact_label">お問い合わせ内容</label><span class="check"></span>
            <textarea id="message" class="valid_message" name="message" placeholder="お問い合わせ内容を入力してください。"><?php if (!empty($_POST['message'])) echo $_POST['message']; ?></textarea>
            <div class="area_msg">
              <?php if (!empty($err_msg['message'])) echo $err_msg['message']; ?>
            </div>
          </div>
          <div class="submit">
            <input type="submit" name="confirm" value="確認画面へ" class="contact_btn" />
          </div>
        </form>

      <?php elseif ($page_flg === 1) : ?>
        <!-- 「問い合わせ内容確認」モード -->
        <h2>確認画面</h2>
        <form action="" method="post" class="form confirm">
          <table>
            <tr class="form_group">
              <td class="contact_label">お名前</td>
              <td class="confirm_txt"><?php echo $_POST['name']; ?></td>
            </tr>
            <tr class="form_group">
              <td class="contact_label">メールアドレス</td>
              <td class="confirm_txt"><?php echo $_POST['email']; ?></td>
            </tr>
            <tr class="form_group">
              <td class="contact_label">お問い合わせ内容</td>
              <td class="confirm_txt">
                <!-- <div class="txt-inner"> -->
                <?php echo $_POST['message']; ?>
                <!-- </div> -->
              </td>
            </tr>
          </table>
          <p class="confirm_m">入力内容をご確認ください。<br>
            お間違いがなければ、送信ボタンを押してください。
          </p>
          <div class="submit">
            <input type="submit" name="back" value="戻る" class="contact_btn" />
            <input type="submit" name="submit" value="送信" class="contact_btn" />
            <input type="hidden" name="name" value="<?php echo $_POST['name']; ?>">
            <input type="hidden" name="email" value="<?php echo $_POST['email']; ?>">
            <input type="hidden" name="message" value="<?php echo $_POST['message']; ?>">
          </div>
        </form>

      <?php elseif ($page_flg === 2) : ?>
        <!-- 「送信完了画面」モード -->
        <h2>送信完了</h2>
        <p class="complete_m">お問い合わせいただきありがとうございました。<br>24時間以内にご記入いただいたメールアドレス宛に<br class="sp_br">ご連絡いたします。</p>
      <?php endif; ?>

    </div>
  </div>

  <!-------- footer -------->
  <footer id="footer">
    <p>©︎2020 Kazuya Ishikawa All Rights Reserved.</p>
  </footer>
  <!-------- script -------->
  <!--FontAwesome-->
  <script src="https://kit.fontawesome.com/b67d86aedc.js" crossorigin="anonymous"></script>
  <!--jQuery-->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script type="text/javascript" src="main.js"></script>
</body>

</html>
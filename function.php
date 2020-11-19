<?php
//==============================
// 定数
//==============================
//メッセージを定数に設定
define('MSG01', '入力必須です');
define('MSG02', 'Emailの形式で入力してください');
define('MSG03', '文字以内で入力してください');

// エラーメッセージ格納用の配列
$err_msg = array();

//==============================
// 各種関数
//==============================
// バリデーションチェック（未入力）
function validRequired($str, $key)
{
    if ($str === '') {
        global $err_msg;
        $err_msg[$key] = MSG01;
    }
}

// バリデーションチェック（Email形式チェック）
function validEmail($str, $key)
{
    if (!preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG02;
    }
}

// バリデーションチェック（最大文字数チェック）
function validMaxLen($str, $key, $max)
{
    if (mb_strlen($str) > $max) {
        global $err_msg;
        $err_msg[$key] = $max . MSG03;
    }
}

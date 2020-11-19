$(function () {
  //---------------------------------
  //----お問い合わせフォーム関連---------
  //---------------------------------
  const MSG_EMPTY = "入力必須です。";
  //入力必須の項目に入力されていない場合のエラー文
  const MSG_TEXT_OVER = "20文字以内で入力してください";
  //入力欄の文字数をオーバーした際のエラー文
  const MSG_EMAIL = "emailの形式で入力してください。";
  //メールアドレスの形式で入力されていない場合のエラー文
  const MSG_TEXTAREA_OVER = "500文字以内で入力してください。";
  //お問い合わせ内容の文字数上限オーバーした場合のエラー文
  const CHECK_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
  //emailの形式かどうかチェックする用

  // 1.名前フォームの入力判定
  $(".valid_name").keyup(function () {
    //名前フォーム(valid_nameクラスのついている箇所)選択時にキーボードのキーから指が離れる(ボタンが上がる)度に、以下の処理を実行
    let form_g = $(this).closest(".form_group");
    //判定用の変数(仮)を用意し、名前フォームのhtml要素を代入

    if ($(this).val().length === 0) {
      //名前フォームの文字数が0文字だった場合
      form_g.removeClass("has_success").addClass("has_error");
      //名前フォームから「has_success」クラスを外して「has_error」クラスを付与
      form_g.find(".check").text(MSG_EMPTY);
      //名前フォームから見て子要素にある「check」クラスをもつ要素に「MSG_EMPTY」に代入されている文字を表示させる(エラー文を出す)
    } else if ($(this).val().length > 20) {
      //名前フォームの文字数が0文字ではなく20文字を超える場合
      form_g.removeClass("has_success").addClass("has_error");
      //名前フォームから「has_success」クラスを外して「has_error」クラスを付与
      form_g.find(".check").text(MSG_TEXT_OVER);
      //名前フォームから見て子要素にある「check」クラスをもつ要素に「MSG_TEXT_OVER」に代入されている文字を表示させる(エラー文を出す)
    } else {
      //上記以外の場合(問題ない場合)
      form_g.removeClass("has_error").addClass("has_success");
      //名前フォームから「has_error」クラスを外して「has_success」クラスを付与
      form_g.find(".check").text("");
      //名前フォームから見て子要素にある「check」クラスをもつ要素に何も表示させない(エラー文を消す)
    }
  });

  // 2.メールアドレスフォームの入力判定
  $(".valid_email").keyup(function () {
    //メールアドレスフォーム(valid_emailクラスのついている箇所)選択時にキーボードのキーから指が離れる(ボタンが上がる)度に、以下の処理を実行
    let form_g = $(this).closest(".form_group");
    //判定用の変数(仮)を用意し、メールアドレスフォームのhtml要素を代入

    if ($(this).val().length === 0) {
      //メールアドレスフォームの文字数が0文字だった場合
      form_g.removeClass("has_success").addClass("has_error");
      //メールアドレスフォームから「has_success」クラスを外して「has_error」クラスを付与
      form_g.find(".check").text(MSG_EMPTY);
      //メールアドレスフォームから見て子要素にある「check」クラスをもつ要素に「MSG_EMPTY」に代入されている文字を表示させる(エラー文を出す)
    } else if (!$(this).val().match(CHECK_EMAIL)) {
      //メールアドレスフォームの文字列がメールアドレスの形式でない場合
      form_g.removeClass("has_success").addClass("has_error");
      //メールアドレスフォームから「has_success」クラスを外して「has_error」クラスを付与
      form_g.find(".check").text(MSG_EMAIL);
      //メールアドレスフォームから見て子要素にある「check」クラスをもつ要素に「MSG_EMAIL」に代入されている文字を表示させる(エラー文を出す)
    } else {
      //上記以外の場合(問題ない場合)
      form_g.removeClass("has_error").addClass("has_success");
      //メールアドレスフォームから「has_error」クラスを外して「has_success」クラスを付与
      form_g.find(".check").text("");
      //名前フォームから見て子要素にある「check」クラスをもつ要素に何も表示させない(エラー文を消す)
    }
  });

  // 3.お問い合わせ内容フォームの入力判定
  $(".valid_message").keyup(function () {
    //お問い合わせ内容フォーム(valid_messageクラスのついている箇所)選択時にキーボードのキーから指が離れる(ボタンが上がる)度に、以下の処理を実行
    let form_g = $(this).closest(".form_group");
    //判定用の変数(仮)を用意し、メールアドレスフォームのhtml要素を代入

    if ($(this).val().length === 0) {
      //お問い合わせ内容フォームの文字数が0文字だった場合
      form_g.removeClass("has_success").addClass("has_error");
      //お問い合わせ内容フォームから「has_success」クラスを外して「has_error」クラスを付与
      form_g.find(".check").text(MSG_EMPTY);
      //お問い合わせ内容フォームから見て子要素にある「check」クラスをもつ要素に「MSG_EMPTY」に代入されている文字を表示させる(エラー文を出す)
    } else if ($(this).val().length > 500) {
      //お問い合わせ内容フォームの文字数が200文字を超える場合
      form_g.removeClass("has_success").addClass("has_error");
      //お問い合わせ内容フォームから「has_success」クラスを外して「has_error」クラスを付与
      form_g.find(".check").text(MSG_TEXTAREA_OVER);
      //お問い合わせ内容フォームから見て子要素にある「check」クラスをもつ要素に「MSG_TEXTAREA_OVER」に代入されている文字を表示させる(エラー文を出す)
    } else {
      //上記以外の場合(問題ない場合)
      form_g.removeClass("has_error").addClass("has_success");
      //お問い合わせ内容フォームから「has_error」クラスを外して「has_success」クラスを付与
      form_g.find(".check").text("");
      //お問い合わせ内容フォームから見て子要素にある「check」クラスをもつ要素に何も表示させない(エラー文を消す)
    }
  });

  //---------------------------------
  //----モーダル開閉関連----------------
  //---------------------------------
  $(function () {
    let clickElement;
    let currentScrollPos;
    // ① モーダルを開くとき
    $(".js_modal_popup").click(function () {
      // .js_modal_popupがクリックされた時
      clickElement = $(this).next(".js_modal_wrapper");
      // クリックされた画像に対応したモーダルの要素を取得
      currentScrollPos = $(window).scrollTop();
      // 現在のスクロール位置を記憶
      $(clickElement).fadeIn();
      // モーダルをフェードイン
      $("body").addClass("js_fixed").css({ top: -currentScrollPos });
      // 背景をTOPからcurrentScrollPosだけスクロールした位置で固定
      return false;
    });
    // ②モーダルを閉じるとき
    $(".js_modal_close, .js_modal_bg").click(function () {
      // .js_modal_closeか.js_modal_bgがクリックされた時
      clickElement = $(this).closest(".js_modal_wrapper");
      // クリックされた箇所の親要素にあるモーダルの要素を取得
      $(clickElement).fadeOut();
      // モーダルをフェードアウト
      $("body").removeClass("js_fixed").css({ top: 0 });
      // 背景の固定を解除
      $(window).scrollTop(currentScrollPos);
      // 元のスクロール位置まで移動
      return false;
    });
  });

  //---------------------------------
  //----ヘッダーナビ固定用--------------
  //---------------------------------
  $(window).scroll(function () {
    // 画面がスクロールされた時、
    let offset = $(".header_anchor").offset();
    offset.top -= 50;
    // ヘッダーを固定したい位置（header_anchor）の縦位置を取得し、その100px上を指定
    if ($(window).scrollTop() > offset.top) {
      // 現在のスクロール位置がoffsetに取得した縦位置より下になっている場合、
      $(".header").addClass("js_header_fixed");
      $(".header_h1").addClass("js_header_h1");
      // headerにjs_header_fixedとjs_header_h1クラスを付与
    } else {
      // そうでない場合
      $(".header").removeClass("js_header_fixed");
      $(".header_h1").removeClass("js_header_h1");
      // headerからjs_header_fixed、js_header_h1クラスを削除
    }
  });

  //---------------------------------
  //----スムーススクロール--------------
  //---------------------------------
  $("header a,footer a").click(function () {
    // 要素がクリックされた時
    let adjust = 0;
    // 移動先の位置調整。設定したpxだけ下にずれる。
    let speed = 500;
    // スクロール速度(ミリ秒)
    let href = $(this).attr("href");
    // アンカーの取得。リンク先(href)を取得して変数に代入
    let target = $(href == "#" || href == "" ? "html" : href);
    // 移動先を取得。上で取得したidと同じ要素を探して、targetに代入(なければ「html」を代入)
    let position = target.offset().top + adjust;
    // 移動先の調整。idの要素の位置をoffsetメソッドで取得して、positionに代入
    $("body,html").animate({ scrollTop: position }, speed);
    // スクロールして移動する
    return false;
  });

  //---------------------------------
  //----「TOPに戻る」ボタン-------------
  //---------------------------------
  let $pageTop = $("#page_top");
  // ボタンのDOMを取得
  $(window).scroll(function () {
    // ボタンを表示するまでのスクロール量
    let length = 500;
    // 現在のスクロール位置を取得
    let position = $(window).scrollTop();
    // 現在位置が表示する位置に達しているかどうかで、表示or非表示
    if (position >= length) {
      $pageTop.fadeIn();
    } else {
      $pageTop.fadeOut();
    }
  });
  $pageTop.click(function () {
    // ボタンがクリックされた時
    $("html,body").animate({ scrollTop: 0 }, 500);
    // ページトップまで移動させる
    return false;
  });

  //---------------------------------
  //----ハンバーガーメニュー関連---------
  //---------------------------------
  $(function () {
    $(".hamburger").click(function () {
      // ハンバーガーメニューがクリックされた時
      $(this).toggleClass("op");
      // それに「op」クラスが付いていなければ付ける、付いているなら外す
    });
    $(".header_right a").click(function () {
      // ヘッダーメニュー内のaタグがクリックされた時
      $(".hamburger").removeClass("op");
      // 「hamburger」タグから「op」タグを外す
    });
  });
});
//---------------------------------
//----フッターの位置調整関連-----------
//---------------------------------
let $ftr = $("#footer");
// footerのDOMを取得
if (window.innerHeight > $ftr.offset().top + $ftr.outerHeight()) {
  // もし見ている画面の縦幅がページの縦幅より大きかったら、
  $ftr.attr({
    style:
      "position:fixed; top:" + (window.innerHeight - $ftr.outerHeight()) + "px",
    // 画面の最下部にフッターが固定される様にスタイルを書き加える
  });
}

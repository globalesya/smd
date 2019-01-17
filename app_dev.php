<?php

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = trim($_POST['message']);

if($name == '' || $email == '' || $message == '') {
    echo 'Заполните все поля!';
}
elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Адрес электронной почты введен не корректно!';
}
else {
    file_put_contents('apps.txt', "$name $email $message \n", FILE_APPEND);
    echo '1';
}
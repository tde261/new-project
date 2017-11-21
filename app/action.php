<?php
    $name = $_POST['user_name'];
    $email = $_POST['user_email'];
    $comment = $_POST['text_comment'];
    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $comment = htmlspecialchars($comment);
    $name = urldecode($name);
    $email = urldecode($email);
    $comment = urldecode($comment);
    $name = trim($name);
    $email = trim($email);
    $comment = trim($comment);
	$msg_box = ""; // в этой переменной будем хранить сообщения формы
	$errors = array(); // контейнер для ошибок
	// проверяем корректность полей
	if($name == "") 	 $errors[] = "Поле 'Ваше имя' не заполнено!";
	if($email == "") 	 $errors[] = "Поле 'Ваш e-mail' не заполнено!";
	if($comment == "") $errors[] = "Поле 'Текст сообщения' не заполнено!";

	// если форма без ошибок
	if(empty($errors)){		
		// собираем данные из формы
		$message  = "<b>Имя пользователя: </b>" . $name . "<br/>";
		$message .= "<b>E-mail или телефон пользователя: </b>" . $email . "<br/>";
		$message .= "<br/><b>Текст письма: </b>" . $comment;		
		send_mail($message); // отправим письмо
		// выведем сообщение об успехе
		$msg_box = "<span style='color: gray;'>Сообщение успешно отправлено!</span>";
	}else{
		// если были ошибки, то выводим их
		$msg_box = "";
	}

	// делаем ответ на клиентскую часть в формате JSON
	echo json_encode(array(
		'result' => $msg_box
	));
	
	
	// функция отправки письма
	function send_mail($message){
		// почта, на которую придет письмо
		$mail_to = "tde261@yandex.ru"; 
		// тема письма
		$subject = "Письмо от stamp-magnat.ru";
		
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Тестовое письмо <no-reply@test.com>\r\n"; // от кого письмо
		
		// отправляем письмо 
		mail($mail_to, $subject, $message, $headers);
	}
	

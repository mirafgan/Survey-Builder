<!doctype html>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/dashboard.css?=<?php echo time() ?>" />
    <link rel="stylesheet" href="css/all.css" />
    <title>Survey Edit</title>
    <?php include 'scripts.php'; ?>
    <script>
        let questionHtml = <?php ob_start();
        include 'survey_edit_question.php';
        echo json_encode(ob_get_clean()); ?>;
        let choiceHtml = <?php ob_start();
        include 'survey_edit_choice.php';
        echo json_encode(ob_get_clean()); ?>;
        <?php if (empty($survey->survey_id)): ?>
            $(function () {
                $('#survey_name').focus();
            });
        <?php endif; ?>
    </script>
</head>

<body>
    <main>
        <div id="root">
            <!-- <div class="container-fluid"> -->
                <div id='dashboard-top'>
                    <div id="survey-nav">
                        <nav>
                            <a href="" id="surveys">Surveys</a>/
                            <?php echo $survey->survey_name ?>
                        </nav>
                    </div>
                    <div id="top-sidebar">
                        <div id="publish-container">
                            <button type='button' id="preview">
                                <svg class="SVGInline-svg" width="16" height="11" viewBox="0 0 16 11" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.532 5.895c0 .825-.672 1.493-1.502 1.493S6.528 6.72 6.528 5.895c0-.824.673-1.492 1.502-1.492.83 0 1.502.668 1.502 1.492z">
                                    </path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.004 2.483A8.82 8.82 0 0 0 0 5.985a9.1 9.1 0 0 0 2.904 3.383 8.884 8.884 0 0 0 10.746-.386A8.783 8.783 0 0 0 16 5.985a8.843 8.843 0 0 0-3.184-3.592 9.053 9.053 0 0 0-9.812.09zm3.06.567a3.52 3.52 0 0 1 4.424.433 3.472 3.472 0 0 1 .436 4.397A3.5 3.5 0 0 1 9.35 9.163a3.525 3.525 0 0 1-3.819-.755 3.462 3.462 0 0 1-.76-3.795A3.487 3.487 0 0 1 6.063 3.05z">
                                    </path>
                                </svg>
                            </button>
                            <button type='submit' id='publish'>Publish</button>
                        </div>
                        <div id="current_user_right" tabindex="0">
                            <span class="userLogo">
                                <?php echo $user->first_name[0] ?>
                                <div id="userSettings" class="animate__animated">
                                    <div id="userInformation">
                                            <span class="userLogo"><?php echo $user->first_name[0]; ?></span>
                                        <div class="userText">
                                            <h2>
                                                <?php echo $user->first_name; $user->last_name; ?>
                                            </h2>
                                            <p> <?php echo $user->email ?> </p>
                                        </div>
                                    </div>
                                    <div class="logout">
                                        <a href="http://localhost/root3/logout.php" class="logOutButton">Log out</a>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="dashboard-bottom">
                    <form id="survey_edit_form" action="survey_edit.php" method="post">
                        <div class="questions-bar col-md-3">
                            <div class="questions-bar-title">
                                <h2 class="question-title fw-bold">Content</h2>
                                <div class="add_question_box">
                                    <button type="button" id="add_question1"></button>
                                    <div class="tooltipp">
                                        <p>Add new question</p>
                                    </div>
                                </div>
                            </div>
                            <div class="questions-bar-body">
                                <?php if (!empty($survey) && $survey instanceof Survey): ?>
                                    <?php foreach ($survey->questions as $i => $question): ?>
                                        <div class="question" tabindex="0">
                                            <div class="overflow-hidden">
                                                <div
                                                    class="icon_box <?php if ($question->question_type == 'input'): echo "shrt-text-bg"; elseif ($question->question_type == 'textarea'): echo "long-text-bg"; elseif (in_array($question->question_type, ['radio', 'checkbox'])):
                                                        echo "choice-bg"; endif ?>">
                                                    <span>
                                                        <?php if ($question->question_type == 'input'): ?>
                                                            <svg class="SVGInline-svg" style="width: 14px;height: 6px;" width="14"
                                                                height="6" viewBox="0 0 14 6" fill="#000"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0 0h7v2H0V0zM9 0h5v2H9V0zM0 4h3v2H0V4zM5 4h9c0 1.10457-.8954 2-2 2H5V4z">
                                                                </path>
                                                            </svg>
                                                        <?php elseif ($question->question_type == 'textarea'): ?>
                                                            <svg class="SVGInline-svg" style="width: 14px;height: 10px;" width="14"
                                                                height="10" viewBox="0 0 14 10" fill="#000"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M8 8h6c0 1.10457-.8954 2-2 2H8V8zM0 8h6v2H0V8zM5 4h9v2H5V4zM0 4h3v2H0V4zM10 0h4v2h-4V0zM0 0h8v2H0V0z">
                                                                </path>
                                                            </svg>
                                                        <?php elseif (in_array($question->question_type, ['radio', 'checkbox'])): ?>
                                                            <svg class="SVGInline-svg" style="width: 14px;height: 10px;" width="14"
                                                                height="10" viewBox="0 0 14 10" fill="#000"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                    d="M13.7072.707124L5.00008 9.41423.292969 4.70712c.781051-.78104 2.047381-.78104 2.828431 0L5.00008 6.5858 10.8788.707124c.781-.7810482 2.0473-.7810482 2.8284 0z">
                                                                </path>
                                                            </svg>
                                                        <?php endif; ?>
                                                    </span>
                                                    <span>
                                                        <?php echo htmlspecialchars($question->question_id); ?>
                                                    </span>
                                                </div>
                                                <p class="question-title">
                                                    <?php echo $question->question_text ?>
                                                </p>
                                            </div>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </div>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </div>
                        </div>
                        <div id="slider" class="col-md-6">
                            <div id="wrapper">
                                <?php if (!empty($survey) && $survey instanceof Survey): ?>
                                    <input type="hidden" id="action" name="action" value="edit_survey" />
                                    <input type="hidden" id="survey_id" name="survey_id"
                                        value="<?php echo htmlspecialchars($survey->survey_id); ?>" />
                                    <input type="hidden" id="survey_create_date" name="survey_create_date" value="<?php
                                    if (empty($survey->survey_id)) {
                                        date_default_timezone_set('Asia/Baku');
                                        $datetime = date("d/m/Y H:i");
                                        echo $datetime;
                                    } else {
                                        echo $survey->survey_create_date;
                                    }
                                    ?>" />
                                    <?php
                                    if (!empty($survey->survey_id)) {
                                        date_default_timezone_set('Asia/Baku');
                                        $datetime = date("d/m/Y H:i");
                                        echo "<input type='hidden' id='survey_update_date' name='survey_update_date' value='$datetime' />";
                                    }
                                    ?>
                                    <div class="quiz-container">
                                        <?php foreach ($survey->questions as $i => $question): ?>
                                            <?php include 'survey_edit_question.php'; ?>
                                        <?php endforeach; ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                        <div class="col-md-3 question-params">
                            <div class="questiontypes">
                                <h2 class="fw-bold">Type</h2>
                            </div>
                            <div class="settings">
                                <h2 class="fw-bold">Settings</h2>
                                <?php foreach ($survey->questions as $i => $question): ?>
                                    <div class="settings_container">
                                        <div class="required-container">
                                            <label for="is_required_<?php echo $question->question_id; ?>">Required</label>
                                            <div class="required_input">
                                                <input type="checkbox"
                                                    name="is_required[<?php echo $question->question_id; ?>]"
                                                    id="is_required_<?php echo $question->question_id ?>" value="1" <?php
                                                        if ($question->is_required)
                                                            echo "checked='checked'" ?>>
                                                </div>
                                            </div>
                                        <?php if (in_array($question->question_type, ['radio', 'checkbox'])): ?>
                                            <div class="multiple-selection">
                                                <label for="is_multiple-<?php echo $i + 1; ?>">Multiple Selection</label>
                                                <div class="multiple-input">
                                                    <input type="checkbox" id="is_multiple-<?php echo $i + 1; ?>"
                                                        name="is_multiple[<?php echo $question->question_id; ?>]" <?php
                                                            if ($question->question_type == 'checkbox' || $question->is_multiple)
                                                                echo "checked='checked'" ?> />
                                                    </div>
                                                </div>
                                                <div class="randomize">
                                                    <label for="is_randomize_<?php echo $i + 1; ?>">Randomize</label>
                                                <div class="randomize-input">
                                                    <input type="checkbox"
                                                        name="is_randomize[<?php echo $question->question_id; ?>]"
                                                        id="is_randomize_<?php echo $i + 1; ?>" value="1" <?php
                                                           if ($question->is_randomize == 1)
                                                               echo "checked='checked'" ?> />
                                                    </div>
                                                </div>

                                        <?php endif; ?>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <!--<button id="add_question">Add Question</button>-->
                    </form>
                </div>

                <!--        <?php if (isset($statusMessage)): ?>-->
                    <!--            <p class="error"><?php echo htmlspecialchars($statusMessage); ?></p>-->
                    <!--        <?php endif; ?>-->
                <!--    </div>-->


                <div class="add_question_types">
                    <ul class="question_types" tabindex='0'>
                        <li>
                            <div class="icon_box">
                                <span class="shrt-text-bg">
                                    <svg class="SVGInline-svg" style="width: 14px;height: 6px;" width="14" height="6"
                                        viewBox="0 0 14 6" fill="#000" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 0h7v2H0V0zM9 0h5v2H9V0zM0 4h3v2H0V4zM5 4h9c0 1.10457-.8954 2-2 2H5V4z">
                                        </path>
                                    </svg>
                                </span>
                                <span>
                                    Short text
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="icon_box">
                                <span class="long-text-bg">
                                    <svg class="SVGInline-svg" style="width: 14px;height: 10px;" width="14" height="10"
                                        viewBox="0 0 14 10" fill="#000" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 8h6c0 1.10457-.8954 2-2 2H8V8zM0 8h6v2H0V8zM5 4h9v2H5V4zM0 4h3v2H0V4zM10 0h4v2h-4V0zM0 0h8v2H0V0z">
                                        </path>
                                    </svg>
                                </span>
                                <span>
                                    Long text
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="icon_box">
                                <span class="choice-bg">
                                    <svg class="SVGInline-svg" style="width: 14px;height: 10px;" width="14" height="10"
                                        viewBox="0 0 14 10" fill="#000" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M13.7072.707124L5.00008 9.41423.292969 4.70712c.781051-.78104 2.047381-.78104 2.828431 0L5.00008 6.5858 10.8788.707124c.781-.7810482 2.0473-.7810482 2.8284 0z">
                                        </path>
                                    </svg>
                                </span>
                                <span>
                                    Multiple Choice
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="question-extra-container">
                    <?php if (!empty($survey) && $survey instanceof Survey): ?>
                        <?php foreach ($survey->questions as $i => $question): ?>
                            <ul class="question-extra" tabindex="0">
                                <li>
                                    <button type="button" class="duplicate">Duplicate</button>
                                </li>
                                <li>
                                    <button type="button" class="delete_question text-danger">Delete</button>
                                </li>
                            </ul>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            <!-- </div> -->
        </div>
    </main>
    <script src="js/survey_edit.js?=<?php echo time() ?>"></script>
    <script src="js/dashboard.js?=<?php echo time() ?>"></script>
</body>

</html>
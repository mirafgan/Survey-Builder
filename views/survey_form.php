<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Survey - <?php echo htmlspecialchars($survey->survey_name); ?></title>
  <?php include 'stylesheets.php'; ?>
  <?php include 'scripts.php'; ?>
  <script type="text/javascript" src="js/index.js?=<?php echo time() ?>"></script>
  <script type="text/javascript" src="js/survey_form.js?=<?php echo time() ?>"></script>
  <script type="text/javascript" src="js/survey_edit.js?=<?php echo time() ?>"></script>
</head>
<body>
  <div id="main">
    <?php $title = htmlspecialchars($survey->survey_name); ?>
    <div id="site_content container">
      <div id="">
        <?php if (isset($statusMessage)): ?>
            <p class="error"><?php echo htmlspecialchars($statusMessage); ?></p>
        <?php endif; ?>
        <?php if (! empty($survey) && $survey instanceof Survey): ?>
          <form id="survey_form" action="survey_form.php" method="post">
            <input type="hidden" id="action" name="action" value="add_survey_response" />
            <input type="hidden" id="survey_id" name="survey_id" value="<?php echo htmlspecialchars($survey->survey_id); ?>" />
            <input type="hidden" id="time_elapsed" name="time_elapsed">
            <div class="input_form big widelabels">
              <div class="container quiz-container">
              <?php foreach ($survey->questions as $i => $question): ?>
              <div class="question-container" data-question_id="<?php echo htmlspecialchars($question->question_id); ?>">
                  <!--question_id_counter-->
                  <div class="question_text blue-txt" >
                      <span><script>document.write(question_id_counter++)</script><i class="fas fa-arrow-right me-2 ms-1"></i></span>
        <h4 data-question_id="<?php echo htmlspecialchars($question->question_id); ?>" data-is_required="<?php echo htmlspecialchars($question->is_required); ?>" data-question_type="<?php echo htmlspecialchars($question->question_type); ?>" ><?php echo htmlspecialchars($question->question_text); ?></h4></div>
                <?php if (in_array($question->question_type, ['radio', 'checkbox'])): ?>
                  <?php if($question->is_randomize) shuffle($question->choices)?>
                <?php foreach ($question->choices as $j => $choice): ?>
                  <div class="choice_container" >
                      <div class="choice_start">
                      <span class="question_choice">
                        A
                        </span> 
                    <?php $question_html_id = 'choice_' . htmlspecialchars($question->question_id) . '_' . htmlspecialchars($choice->choice_id); ?>
                    <input id="<?php echo $question_html_id; ?>" type="<?php echo $question->is_multiple ? 'checkbox' : 'radio' ; ?>" name="question_id[<?php echo htmlspecialchars($question->question_id); ?>][]" value="<?php echo htmlspecialchars($choice->choice_text); ?>" />
                    <label for="<?php echo $question_html_id; ?>"><?php echo htmlspecialchars($choice->choice_text); ?></label>
                    </div>
                    <i class="fas blue-txt fa-check" aria-hidden="true"></i>
                  </div>
                <?php endforeach; ?>
                <?php elseif ($question->question_type == 'input'): ?>
                  <input type='text' name="question_id[<?php echo htmlspecialchars($question->question_id); ?>]" placeholder="Cavabınızı daxil edin"  />
                <?php elseif ($question->question_type == 'textarea'): ?>
                  <textarea enterkeyhint="done" name="question_id[<?php echo htmlspecialchars($question->question_id); ?>]" placeholder="Cavabınızı daxil edin"></textarea>
                <?php endif; ?>
              </div>
              <?php endforeach; ?>
              </div>
            </div>
          </form>
        <?php endif; ?>
      </div>
    </div>
  </div>
    <?php include 'footer.php'; ?>
</body>
</html>

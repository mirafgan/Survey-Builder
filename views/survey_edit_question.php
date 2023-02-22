<div class="question-container" 
data-question_id="<?php if (empty($question)) {
    echo 'QUESTION_ID';
} else {
    echo $question->getUniqueId();
} ?>" 
data-question_number="<?php if (isset($i)) {
    echo $i + 1;
} ?>">
  <div class="question_text blue-txt">
    <span></span>
      <span>
      <i class="fas fa-arrow-right me-2" aria-hidden="true"></i>
        </span>
        <input type="text" class="question_text" name="question_text[<?php if (empty($question)) {
    echo 'QUESTION_ID';
} else {
    echo $question->getUniqueId();
} ?>]" value="<?php if (! empty($question)) {
    echo htmlspecialchars($question->question_text);
} ?>" placeholder="Question Title" />
  </div>
  <?php if (! empty($question) && ($question->question_type == 'input' || $question->question_type == 'textarea') ): ?>
    <input type='text' placeholder="Cavabınızı daxil edin" disabled="disabled"/>
    <?php elseif (! empty($question) && in_array($question->question_type, ['radio', 'checkbox']) ): ?> 
        <div class="choices_container"<?php if (empty($question) || ! in_array($question->question_type, ['radio', 'checkbox'])): ?> <?php endif; ?> >
    <h4>Choices</h4>
    <div class="choices" data-question_id="<?php if (empty($question)) {
    echo 'QUESTION_ID';
} else {
    echo $question->getUniqueId();
} ?>">
      <?php if (! empty($question->choices)): ?>
      <?php foreach ($question->choices as $j => $choice): ?>
      <?php include 'survey_edit_choice.php'; ?>
      <?php endforeach; ?>
      <?php endif; ?>
    </div>
    <button class="add_choice" type="button">Add Choice</button>
  </div>
  <?php endif; ?>
  <select class="question_type" name="question_type[<?php if (empty($question)) {
    echo 'QUESTION_ID';
} else {
    echo $question->getUniqueId();
} ?>]">
      <option value="input"<?php if (! empty($question) && $question->question_type == 'input'): ?> selected="selected"<?php endif; ?>>Open Text</option>
      <option value="radio"<?php if (! empty($question) && $question->question_type == 'radio'): ?> selected="selected"<?php endif; ?>>Select One</option>
      <option value="checkbox"<?php if (! empty($question) && $question->question_type == 'checkbox'): ?> selected="selected"<?php endif; ?>>Select Many</option>
      <option value="textarea"<?php if (! empty($question) && $question->question_type == 'textarea'): ?> selected="selected"<?php endif; ?>>Multi-line open Text</option>
    </select>
  </div>
  
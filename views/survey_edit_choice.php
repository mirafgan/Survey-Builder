  <?php $alphabet = array(
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  ); ?>
<div class="choice_start" data-choice_id="<?php if (empty($choice)) {
    echo 'CHOICE_ID';
} else {
    echo $choice->getUniqueId();
} ?>" data-choice_number="<?php if (isset($j)) {
    echo $j + 1;
} ?>">
        <span class="question_choice"></span> 
        <input type="text" class="choice_text" name="choice_text[<?php if (empty($question)) {
    echo 'QUESTION_ID';
} else {
    echo $question->getUniqueId();
} ?>][<?php if (empty($choice)) {
    echo 'CHOICE_ID';
} else {
    echo $choice->getUniqueId();
} ?>]" value="<?php if (! empty($choice)) {
        echo htmlspecialchars($choice->choice_text);
        } ?>" placeholder="Choice...">
</div>
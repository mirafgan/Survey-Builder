<form id="survey_add_form" action="survey_edit.php" method="post">
    <input type="hidden" id="action" name="action" value="edit_survey"/>
    <input type="hidden" id="survey_id" name="survey_id" value="" />
    <input type="hidden" id="survey_create_date" name="survey_create_date" value="<?php 
            if(empty($survey->survey_id)){
            date_default_timezone_set('Asia/Baku');
            $datetime = date("d/m/Y H:i");
            echo $datetime;}
            else {
              echo $survey->survey_create_date;
            }
          ?>" />
    <input type="hidden" id="survey_update_date" name="survey_update_date" value="<?php 
            if(empty($survey->survey_id)){
            date_default_timezone_set('Asia/Baku');
            $datetime = date("d/m/Y H:i");
            echo $datetime;}
            else {
              echo $survey->survey_update_date;
            }
          ?>" />
    <?php 
         # if(!empty($survey->survey_id)){date_default_timezone_set('Asia/Baku');$datetime = date("d/m/Y H:i");
           # echo "<input type='hidden' id='survey_update_date' name='survey_update_date' value='$datetime' />";
            #}
            ?>
            <div class="survey_add-container">
                <div class="close-btn-container">
                    <button id="survey_add_close" type="button"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <h2>Create a new survey</h2>
              <div>
                <input type="text" id="survey_name" name="survey_name" value="" placeholder="Name your survey"/>
              </div>
              <div class="survey_add_submit">
                <button id="delete_survey" name="delete_survey">Cancel</button>
                <button id="submitButton" name="submitButton" disabled="disabled">Create survey</button>
              </div>
            </div>
</form>

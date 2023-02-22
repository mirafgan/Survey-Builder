var question_id_counter = 1;
var choice_id_counter = 1;
renumberQuestions();

/**
 * Get a new question id to associate choice ids with this question id
 *
 * @return string question_id
 */
  function choice_alph(){
      const alphabet = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  ];
  $(".question-container").each((index, item) => {
    if ($(item).find(".question_choice").length !== 0) {
      $(item)
        .find(".question_choice")
        .each((i, cvb) => {
          $(cvb).html(alphabet[i]);
        });
    }
  })
  }
function getUniqueQuestionId()
{
    // let quiz_all = document.querySelectorAll('.quiz-container > div')
    // let cur = quiz_all.length == 0 ? 1 : quiz_all.length+1
    // return cur;
    return 'Question' + question_id_counter++;
}

/**
 * Get a new choice id
 *
 * @return string choice_id
 */
function getUniqueChoiceId()
{
    return 'Choice' + choice_id_counter++;
}

/**
 * Add a new choice to a question
 */
//  $(".choices").each(function(index,item){
//          if ( $(item).find('div.choice_start').length == 1) {
//              $(item).find('div.choice_icon').remove()
//          }
//      })
 function choice_remove(e){
      if ( $(e).parents('.choices').find('.choice_start').length > 1 )  $(e).parents('.choice_start').remove()
    //   else $(e).parents('.choice_start').find('.choice_icon').remove()
      choice_icon_check()
}
 function choice_icon_check(){
      $(".choices").each(function(index,item){
     if ( $(item).find('div.choice_start').length > 1) {
              $(item).find('div.choice_start').append('<div class="choice_icon" onclick="choice_remove(this)"><i class="fa-solid fa-xmark"></i></div>')
         }
    else $(item).find('.choice_icon').remove()
      })
    //  $(e).parents('.choice_start').find('.choice_icon').remove()
    //  $(".choices").each(function(index,item){
    //      if ( $(item).find('div.choice_start').length == 1) {
    //          $(item).find('div.choice_icon').remove()
    //      }
    //  })
 }
 choice_icon_check()
function addChoice()
{
   var choices = $(this).parents('.question-container').find('.choices');
    var questionID = $(this).parents('.question-container').data('question_id');
    var choiceID = getUniqueChoiceId();
    var newChoiceHtml = choiceHtml.replace(/QUESTION_ID/g, questionID).replace(/CHOICE_ID/g, choiceID);
    choices.append(newChoiceHtml);
    initDeleteChoiceButton('div.choice[data-choice_id="' + choiceID + '"] button.delete_choice');
    renumberChoices(questionID);
    // Focus on new choice text box
    $('div.choice[data-choice_id="' + choiceID + '"] input.choice_text').focus();
    choice_alph()
    choice_icon_check()
    return false;
}

/**
 * Add a new question to the survey
 */
function initAddQuestion()
{
    var questionID = getUniqueQuestionId();
    var newQuestionHtml = questionHtml.replace(/QUESTION_ID/g, questionID);
    return [questionID,newQuestionHtml];
}

function addQuestion()
{
    let [questionID,newQuestionHtml] = initAddQuestion();
    $('.quiz-container').append(newQuestionHtml);
    initQuestionTypeDropDown('div[data-question_id="' + questionID + '"] select.question_type');
    // initSortableChoices('div.choices[data-question_id="' + questionID + '"]');
    initAddChoiceButton('div[data-question_id="' + questionID + '"] button.add_choice');
    // initDeleteQuestionButton('div[data-question_id="' + questionID + '"] button.delete_question');
    renumberQuestions();
    // Focus on new question text box
    $('div[data-question_id="' + questionID + '"] input.question_text').focus();

    return false;
}

/**
 * Delete the survey
 */
function deleteSurvey()
{
    $('#action').val('delete_survey');
    if (confirm("Are you sure you want to delete this survey?"))
    {
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * Delete a choice from a question
 */
function deleteChoice()
{
    var questionID = $(this).parents('.question').data('question_id');
    var choiceID = $(this).parents('div.choice').data('choice_id');
    $('div.choice[data-choice_id="' + choiceID + '"]').remove();
    renumberChoices(questionID);
    return false;
}

/**
 * Delete a question from the survey
 */
function extra_func(e)
{
    let parent = $(e).parents('.question-extra');
    let index = $('.question-extra').index(parent);
    return [parent,index];
}
function addQuestionDuplicate(e)
{
    let [parent,index] = extra_func(e);
    let icon = $('.question').eq(index).find('span:first-of-type').html();
    let last_index = $('.questions-bar-body > div').length;
    let bg_class = $('.question').eq(index).find('.icon_box').attr('class');
    let new_question = `<div class="question" tabindex="0">
                <div class="overflow-hidden">
                  <div class=" ${bg_class}">
                    <span>
                    ${icon}
                     </span>
                    <span>${last_index+1}</span>
                  </div>
                  <p class="question-title"></p>
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </div>`;
    let new_select = `<select class="question_type" name="question_type[Question${question_id_counter}]">
    <option value="input">Open Text</option>
    <option value="radio">Select One</option>
    <option value="checkbox">Select Many</option>
    <option value="textarea">Multi-line open Text</option>
  </select>`
    question_type_change(-1,bg_class);
    return [new_question,bg_class,new_select];
}
function question_type_change(i,bg_class){
    bg_class == 'shrt-text-bg' ? $('.selects').eq(i).find('select').val('input') : 
    bg_class == 'long-text-bg' ? $('.selects').eq(i).find('select').val('textarea') :
    bg_class == 'choice-bg' ? $('.selects').eq(i).find('select').val('radio') : '';
}
// function duplicate(e){
    
    // let [parent,index] = extra_func(e);
    // let dupl_arr = [];
    // let question_bar = $('.question').eq(index);
    // let question = $('.question-container').eq(index);
    // let select = $('.selects').eq(index);
    // dupl_arr.splice(0,0,question_bar,question,select,parent); 
    // dupl_arr.forEach(( item , index )=> {
    //     let duplicat = $(item).clone();
    //     if(index == 0) duplicat.removeClass(duplicat.attr('class').split(' ').pop());
    //     else if(index == 1) {
    //         duplicat.css({'top':'100%'});
    //         duplicat.find('.question_text').val(duplicat.find('.question_text').val() + '(copy)');
    //     } 
    //     else if (index == 2) {
    //         duplicat.css({display: 'none'}); 
            
    //     } 
    //     else if (index == 3 ) {
    //         parent.removeClass(duplicat.attr('class').split(' ').pop())
    //         duplicat.attr('style','');
    //         duplicat.removeClass(duplicat.attr('class').split(' ').pop());
    //     } 
    //     $(item).after(duplicat);
    // })
    // renumberQuestions();
    // $('.question').eq(index + 1).click()
// }
function deleteQuestion(e)
{
    let [parent,index] = extra_func(e);
    $('.question').eq(index).remove();
    $('.question-container').eq(index).remove();
    $('.selects').eq(index).remove();
    parent.remove();
    renumberQuestions();
    $('.question').eq(index).click()
    return false;
}

/**
 * Renumber the questions
 */
function renumberQuestions()
{
    $('div.question').each(function(i, obj)
    {
        $(obj).find('.question_number').text(i + 1);
        $(obj).find('.icon_box span:nth-of-type(2)').text(i + 1);
        $('.question-container').eq(i).find('.question_text > span:first-of-type').html(i + 1);
    });

}

/**
 * Move a question up
 */
function moveQuestionUp()
{
    var question = $(this).parents('div.question');
    if (question.prev().length > 0)
        question.prev().before(question);
    renumberQuestions();

    return false;
}

/**
 * Move a question down
 */
function moveQuestionDown()
{
    var question = $(this).parents('div.question');
    if (question.next().length > 0)
        question.next().after(question);
    renumberQuestions();

    return false;
}

/**
 * Renumber a question's choices
 */
function renumberChoices(questionID)
{
    $('div.question[data-question_id="' + questionID + '"]').find('div.choice').each(function(i, obj)
    {
        $(obj).find('.choice_number').text(i + 1);
    });
}

/**
 * Handle a question_type change, hide the choices if it is an open text field
 */
function questionTypeChange()
{
    var showChoices = false;

    switch ($(this).val())
    {
        case 'radio':
        case 'checkbox':
            showChoices = true;
            break;
    }

    let choices = $(this).parents('.question').find('.choices_container');

    if (showChoices)
        choices.show();
    else
        choices.hide();
}

/**
 * Make the choices sortable and renumber the choices when a choice is re-sorrted
 */
// function initSortableChoices(selector)
// {
//     $(selector).sortable({
//         disable: true,
//         placeholder: "ui-state-highlight",
//         items: 'div.choice',
//         stop: function(event, ui)
//         {
//             renumberChoices($(this).parents('div.question').data('question_id'));
//         }
//     });
// }

/**
 * Create a jQuery UI add choice button
 */
function initAddChoiceButton(selector)
{
    $(selector).on('click', addChoice);
}

/**
 * Create a jQuery UI delete choice button and delete the choice when clicked
 */
function initDeleteChoiceButton(selector)
{
    $(selector).on('click', deleteChoice);
}

/**
 * Create a jQuery UI delete question button and delete the question when clicked
 */
function initDeleteQuestionButton(selector)
{
    $(selector).click(deleteQuestion);
}

/**
 * Create a jQuery UI button that moves the question up when clicked
 */
function initMoveQuestionUpButton(selector)
{
    $(selector).on('click', moveQuestionUp);
}

/**
 * Create a jQuery UI button that moves the question down when clicked
 */
function initMoveQuestionDownButton(selector)
{
    $(selector).on('click', moveQuestionDown);
}

/**
 * Handle when the question type is changed
 */
function initQuestionTypeDropDown(selector)
{
    $(selector).on('keyup change', questionTypeChange);
}

/**
 * Validate the form to ensure required fields are filled in
 */
function validateForm()
{
    // if ($('#survey_name').val().length == 0)
    // {
    //     alert('Please enter the survey title');
    //     return false;
    // }
    return true;
}

/**
 * Page load - initialize handlers
 */
$(function()
{
    // $('#submitButton').click(validateForm);
    $('#delete_survey').click(deleteSurvey);
    $('#add_question').click(addQuestion);

    initQuestionTypeDropDown('select.question_type');
    // initSortableChoices("div.choices");
    initAddChoiceButton('.add_choice');
    initDeleteChoiceButton('.delete_choice');
    initMoveQuestionUpButton('.move_question_up');
    initMoveQuestionDownButton('.move_question_down');
});

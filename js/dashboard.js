$(() => {
    $('.extra').each((index, item) => {
        $(`.drop:nth-of-type(${index + 1})`).css({
            top: `${$(item).offset().top - $('.drop').outerHeight()}px`,
            left: `${$(item).offset().left}px`,
        })
        $(item).click((e)=>{
            e.preventDefault();
        })
    });
    $('.surveys-view > button').click( function(){
        $('.surveys-view > button').removeClass('surveys-view-selected')
        $(this).addClass('surveys-view-selected')
    });
    $(window).click((e) => {
        $('.drop').each((index, item) => {
            if (e.target == $(`.extra`).eq(index)[0] && !$(item).hasClass('d-block')) $(item).addClass("d-block")
            else if (e.target !== $(item)[0]) $(item).removeClass("d-block")
        })
    });
    $('.survey').each((index, item) => {
        $(item).attr('id', `survey-${index + 1}`)
    });
    $('.survey_copy').click(function () {
        let loc = window.location.origin;
        let ul = $(this).parent().parent();
        let id = ul.attr('id').slice(-1);
        let text = $(`#survey-${id}`).attr('href').match(/[?](\w+)\=(\d+)/g);
        let link = `${loc}/survey_form.php${text}`;
        navigator.clipboard.writeText(link);
        ul.css({ display: 'none' });
    });
    $('.question_types').css({
        top: `${$('.add_question_box').offset()?.top + $('.add_question_box')?.height()}px`,
        left: `${$('.add_question_box').offset()?.left + $('.add_question_box')?.width()}px`
    });
    // $('#add_question1').click(function () {
    //     //  $('.question_types').toggleClass('d-block')
    //     document.querySelector('.question_types').classList.toggle('d-block')
    // });
    let add_question = $("#add_question1");
    add_question.click(()=> {
        $('.question_types').toggleClass('d-block')
    });
    let i = 1;
    function question_types(e){
        let [ new_question, bg_class] = addQuestionDuplicate();
        $('.questions-bar-body').append(new_question);
        
        $(this).parent().removeClass('d-block');
        let lastQuesIconBox = $('.question:last-of-type').find('.icon_box')
        let newqIcon = $(this).find('span:first-of-type > svg').clone()
        let newqIconClass = $(this).find('span:first-of-type').attr('class') 
        let newqLastIcon = lastQuesIconBox.attr('class').split(' ').slice(-1)
        lastQuesIconBox.removeClass(newqLastIcon)
        addQuestion();
        let qID = $('.question-container').eq(-1).data('question_id');
        switch(newqIconClass) {
            case 'long-text-bg':
                lastQuesIconBox.addClass('long-text-bg');
                lastQuesIconBox.find('span:first-of-type').html(newqIcon);
                $('.question-container').eq(-1).find('select').val('textarea');
                $('.question-container').eq(-1).append(`<input type="text" placeholder="Cavabınızı daxil edin" disabled="disabled">`)
                break
            case 'shrt-text-bg':
                lastQuesIconBox.addClass('shrt-text-bg');
                lastQuesIconBox.find('span:first-of-type').html(newqIcon);
                $('.question-container').eq(-1).find('select').val('input');
                $('.question-container').eq(-1).append(`<input type="text" placeholder="Cavabınızı daxil edin" disabled="disabled">`);
                break
            case 'choice-bg':
                lastQuesIconBox.addClass('choice-bg');
                lastQuesIconBox.find('span:first-of-type').html(newqIcon);
                $('.question-container').eq(-1).find('select').val('radio');
                let choiceID = getUniqueChoiceId()
                $('.question-container').eq(-1).append(`<div class="choices_container">
                <h4>Choices</h4>
                <div class="choices" data-question_id="Question${i}">
                                <div class="choice_start" data-choice_id="Choice${choiceID}" data-choice_number>
                    <span class="question_choice">A</span> 
                    <input type="text" class="choice_text" name="choice_text[Question${i}][Choice${choiceID}]" placeholder="Choice...">
            </div>                                            </div>
                <button class="add_choice" type="button">Add Choice</button>
              </div>`)
              i++  
                break; 
        }
        select_add(-1,[newqIcon,newqIconClass]);
        questions_bar_click();
        selectMove();
        $('.question_text > span:first-of-type').each(
            function(index,item){
                $(item).html(index+1);
            }
            );
        $('.question:last-of-type').click();
        initQuestionExtraEllipsis('.fa-ellipsis-vertical');
        initQuestionDeleteButton('.delete_question');
        initQuestionSettings('.settings',newqIconClass);
        initAddChoiceButton(`div[data-question_id="${qID}"] button.add_choice`);
        console.log(qID);
    }

   $("#current_user_right").click(function(){
    $("#userSettings").toggleClass("animate__bounceIn")
   })
    $('.question_types > li').click(question_types)
        //     if($(this).find("span:first-of-type").attr('class') === 'choice-bg'){
        //         let choice_begin = `<div class="choices ui-sortable" data-question_id="${$(".question-container").length}">
        //         <div class="choice_start" data-choice_id="Choice1" data-choice_number="">
        //         <span class="question_choice">A</span> 
        //         <input type="text" class="choice_text" name="choice_text[1][Choice1]" value="" placeholder="Choice...">
        // <div class="choice_icon" onclick="choice_remove(this)"><i class="fa-solid fa-xmark"></i></div></div>
        //         ` 
        //         $('.question-container').eq(-1).append(choice_begin)
        //     }

    function duplicate(e){
        let [new_question,,new_select] = addQuestionDuplicate(e.target);
        let [parent,index] = extra_func(e.target);
        $('.question').eq(index).after(new_question);
        questions_bar_click();
        initQuestionExtraEllipsis('.fa-ellipsis-vertical');
        initQuestionDeleteButton('.delete_question');
        $('.question-extra-opened').removeClass('question-extra-opened');
        addQuestion();
        $('.question-container').eq(index).after($('.question-container').eq(-1))
        renumberQuestions();
        select_add(index);
        
        $('.selects').eq(index + 1).html(new_select)
        selectMove();
        $('.question').eq($('.question-extra').index($(e.target).parents('.question-extra')) + 1).click();
    }
    function initQuestionDeleteButton(selector){
        $(selector).click( function (e) {
            deleteQuestion(e.target);
            questions_bar_click();
        });
    }
    function initQuestionDuplicateButton(selector){
        $(selector).click((e)=> duplicate(e))
    }
    function initQuestionSettings(selector,newqIconClass){
        let qID = $('.question-container').eq(-1).data('question_id');
        let settingsHTML = ''
        settingsHTML += `<div class="settings_container">
        <div class="required-container">
            <label for="is_required_${qID}">Required</label>
            <div class="required_input">
                <input type="checkbox"
                    name="is_required[${qID}]"
                    id="is_required_${qID}" value="1">
                </div>
            </div>`;
        settingsHTML += newqIconClass == 'choice-bg' ? `<div class="multiple-selection">
        <label for="is_multiple-${qID + 1}">Multiple Selection</label>
        <div class="multiple-input">
            <input type="checkbox" id="is_multiple-${qID + 1}"
                name="is_multiple[${qID}]" />
            </div>
        </div>
        <div class="randomize">
            <label for="is_randomize_${qID + 1}">Randomize</label>
        <div class="randomize-input">
            <input type="checkbox"
                name="is_randomize[${qID}]"
                id="is_randomize_${qID + 1}" value="1" />
            </div>
        </div> ` : '';
        $(selector).append(settingsHTML)
    }
    function questions_bar_click(){
        let question = $('.question');
            question.each((index,item)=>{
                $(item).click(()=>{
                    question.removeClass('bg-gray');
                    $(item).addClass('bg-gray');
                selectMove(index);
                settings(index);
                $('.question-container').css({top: `${(index + 1)*100}%`});
                $('.question-container').eq(question.index(item)).css({top:'20%'});
                });
            });
            // $('.question:first-of-type').click()
            initQuestionDeleteButton('.delete_question');
            initQuestionDuplicateButton('.duplicate');
            initQuestionName('.question-container input[type="text"]:first-of-type');
        };
        
        function selectMove(reqem){
            $('.selects').css({display: 'none'})
            $('.selects').eq(reqem).css({display:'flex'})
        }; 
        function settings(reqem){
            $('.settings_container').css({display: 'none'})
            $('.settings_container').eq(reqem).css({display: 'flex'})
        }
       function initQuestionExtraEllipsis(selector){
            $(selector).click( function(){
                let parent = $(this).parent();
                let index = $('.question').index(parent);
                $('.question-extra').eq(index).css({top: parent.offset().top, left: parent.width() + 25 });
                $('.question-extra-opened').removeClass('question-extra-opened');
                $('.question-extra').eq(index).addClass('question-extra-opened');
               })
       }
       
       initQuestionExtraEllipsis('.fa-ellipsis-vertical')
       function select_add(i,currentIcon){ 
        if($('.questiontypes .selects').length == 0){
            $('.question-container').each((index,item) => {
                let select = $('.question-container').eq(index).find('select').val();
                let select_icon = select == 'input' ? 
                `<span class="shrt-text-bg">
                    <svg class="SVGInline-svg" style="width: 14px;height: 6px;" width="14" height="6" viewBox="0 0 14 6" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h7v2H0V0zM9 0h5v2H9V0zM0 4h3v2H0V4zM5 4h9c0 1.10457-.8954 2-2 2H5V4z"></path></svg>
                </span>` :  
                select == 'textarea' ? 
                ` <span class="long-text-bg">
                <svg class="SVGInline-svg" style="width: 14px;height: 10px;" width="14" height="10" viewBox="0 0 14 10" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M8 8h6c0 1.10457-.8954 2-2 2H8V8zM0 8h6v2H0V8zM5 4h9v2H5V4zM0 4h3v2H0V4zM10 0h4v2h-4V0zM0 0h8v2H0V0z"></path></svg>
                </span>` : 
                select == 'radio' || select == 'checkbox' ? 
                `<span class="choice-bg">
                <svg class="SVGInline-svg" style="width: 14px;height: 10px;" width="14" height="10" viewBox="0 0 14 10" fill="#000" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.7072.707124L5.00008 9.41423.292969 4.70712c.781051-.78104 2.047381-.78104 2.828431 0L5.00008 6.5858 10.8788.707124c.781-.7810482 2.0473-.7810482 2.8284 0z"></path></svg>
                </span>` : '' ;
           $('.questiontypes').append($(`
            <div class="selects">
            <div class="selection-box">
            ${select_icon}
            <p class="selection-text"></p>
            </div>
            <i class="fa-solid fa-angle-down"></i>
                <ul class="custom-select"></ul>
            </div>
           `)); 
           $('.questiontypes .selects').eq(-1).append($(item).find('select'))
           $('.selects').eq(-1).find('.custom-select').append($('.question_types > li').clone())
            let bg_class = $('.selection-box').eq(-1).find('span:first-of-type').attr('class')
            $('.selection-text').eq(-1).html($('.custom-select').eq(-1).find(`.${bg_class}`).next().html())
        })
    }
        else{
            
            $('.questiontypes').append($(`
            <div class="selects">
            <div class="selection-box">
            <span class="${currentIcon[1]}">${currentIcon[0].prop('outerHTML')}</span>
            <p class="selection-text"></p>
            </div>
            <i class="fa-solid fa-angle-down"></i>
                <ul class="custom-select"></ul>
            </div>
           `)); 
           $('.selects').eq(-1).find('.custom-select').append($('.question_types > li').clone())
            // $('.selects').eq(i).after($('<div class="selects"></div>'));
            $('.questiontypes .selects').eq(i).append($('.question-container').eq(i).find('select'));
            initcustomSelect('.selects')
            $('.selection-text').eq(-1).html($('.custom-select').eq(-1).find(`.${currentIcon[1]}`).next().html())
        }
       }
      
    select_add();
    questions_bar_click();
    $('div.question:first-of-type').click();
    choice_alph();
    
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
  $('#add_survey').click(function(){
      $('#survey_add_container, .overlay').fadeToggle("500");
      $('#survey_add_container input' ).focus();
  })
  $('#survey_add_close').click(function(){
      $('#survey_add_container, .overlay').fadeOut("500")
  })
  $('form#survey_add_form input').on('input',function(){
      $(this).val() !== '' ? $('#submitButton').removeAttr('disabled','disabled') : $('#submitButton').attr('disabled','disabled')
  })
  $('.overlay').click( ()=> { $('#survey_add_container, .overlay').fadeOut("500") } )
//   function backHistory(e){ // History back function
//     e.preventDefault();
//     history.back();
//   }
//   $('#surveys').click(backHistory);
  function initcustomSelect(selector){
    // $(selector).each(item=>{
    //     let bg_class = $(item).find('.selection-box > span:first-of-type').attr('class');

    // })
     
    $(`${selector}`).click(function(){
        $('.custom-select').toggleClass('d-block');
    })
    $('.custom-select > li').click(function(){
        let index = $('.custom-select').index($(this).parent());
        let icon_box = $(this).find('.icon_box > span:first-of-type');
        let bg_class = icon_box.attr('class');
        let icon_text = $(this).find('.icon_box > span:last-of-type').text();
        $(selector).find('.selection-text').html(icon_text);
        question_type_change(index,bg_class);
        let icon = $(this).find('span:first-of-type').clone()
        $('.selection-box span:first-of-type').remove();
         $('.selection-box').prepend(icon)
        
    })
  }
  initcustomSelect('.selects')
  $('#publish').click(()=> $('form').submit())
  function initQuestionName(selector){
    $(selector).on('input', function(){
        let index = $('.question-container').index($(this).parents('.question-container'));
        $('.question').eq(index).find('.question-title').text($(this).val())
    })
  }
  initQuestionName('.question-container input[type="text"]:first-of-type')
})

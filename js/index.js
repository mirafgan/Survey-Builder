$(() => {
  let attempt = 0;
  let check;
  let check_radio;
  let type;
  const alphabet = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  ];
  $('input[type="text"], textarea').on('keydown',function(e){
      if( e.which == 13 ?? attempt !=  $(".question-container").length){
          e.preventDefault()
          vertical('down')  
      }  
  })
  $(".choice_container").click(function () {
      check = $(this).find('input[type=checkbox]').prop("checked");
      check_radio = $(this).find('input[type=radio]').prop("checked") 
      type = $(this).find('input').attr('type')
      if(check){
         $(this).removeClass("choice_selected");
         $(this).find('input[type=checkbox]').prop('checked',false)
      }
      else if(!check){
          $(this).addClass("choice_selected");
        $(this).find('input[type=checkbox]').prop('checked',true)
      }
      if(type=="radio"){
              $(".choice_container input[type='radio']").each((index,item)=>{
              $(item).parents('.choice_container').removeClass("choice_selected");
              $(item).prop('checked',false)
          })
      
          $(this).addClass("choice_selected");
          $(this).find('input[type=radio]').prop('checked',true)
          }
          
      if(check_radio){
          $(this).removeClass("choice_selected");
         $(this).find('input[type=checkbox]').prop('checked',false)
      }
       
  });
  $("input[type=text]").attr("placeholder", "Cavabınızı daxil edin");
  $("body").css({ overflow: "hidden" });
  $(".question-container").each((index, item) => {
    if ($(item).find(".question_choice").length !== 0) {
      $(item)
        .find(".question_choice")
        .each((i, cvb) => {
          $(cvb).html(alphabet[i]);
        });
    }
    index < $(".question-container").length - 1
      ? $(item).append(
          '<button class="ok custom-btn btn-hover" type="button">OK <i class="fas text-white fa-check"></i></button>'
        )
      : $(item).append(
          '<div class="submit_button "><button id="submitButton"  type="button" class="custom-btn btn-hover" name="submitButton">Submit</button></div>'
        );
    $(item).css({ top: `${index * 100}%` });
  });
  $(".ok").click(function () {
    console.log(attempt, $(".question-container").length);
    if (attempt >= 0) $(`#up`).removeAttr("disabled");
    if (attempt == $(".question-container").length - 2)
      $(`#down`).attr("disabled", "disabled");
    vertical("down");
  });

  let buttons = $("footer button");
  buttons.each((index, item) => {
    $(item).click(function () {
      if (this.id == "up" && attempt > 0) {
        $(`#down`).removeAttr("disabled");
        vertical(this.id);
      }
      if (this.id == "down" && attempt != $(".question-container").length - 1) {
        $(`#up`).removeAttr("disabled");
        vertical(this.id);
      } else if (attempt <= 0) {
        $(`#up`).attr("disabled", "disabled");
      }
      if (attempt == $(".question-container").length - 1) {
        $(`#down`).attr("disabled", "disabled");
      }
    });
  });
  function vertical(x) {
    if (attempt >= 0) $(`#up`).removeAttr("disabled");
    if (attempt == $(".question-container").length - 2) $(`#down`).attr("disabled", "disabled");
    if (x == "up" && attempt > 0) {
      attempt--;
      $(".question-container").each((index, item) => {
        $(item).animate({ top: "+=100%" }, 600);
        //   $(item).animate({top:'+=100%',opacity:0},400,function(){$(this).animate({opacity:1},600)})
      });
    } else if (x == "down" && attempt != $(".question-container").length ) {
      attempt++;
      $(".question-container").each((index, item) => {
        $(item).animate({ top: "-=100%" }, 600);
        // $(item).animate({opacity:1},250,()=>{$(this).animate({opacity:0},250)})
        //   $(item).animate({top:'-=100%',opacity:0},400,function(){$(this).animate({opacity:1},600)})
      });
    }
    console.log(attempt)
  }
  function pres(e){
    e.onkeypress = function(pr){
      if(pr.keyCode == 13 && attempt !== $('.question-container').length-1) {
        vertical('down')
        $('button#submitButton').attr('disabled','disabled')
      }
      if(pr.keyCode == 13 && !$('button#submitButton').prop('disabled')){
        
      }
      if(pr.keyCode == 13 && attempt == $('.question-container').length-1) {
        $('button#submitButton').removeAttr('disabled')
      }
    }
  }
  pres(this);

  $('#submitButton').click(function(){
  let req = 0;
  let success = false
  $('[data-is_required="1"]').each((i,obj)=>{
    let questionID = $('.question-container').eq(i).data('question_id');
    let questionType = $(obj).data('question_type');
      switch(questionType){
        case 'input':
          req+= $(`input[name="question_id[${questionID}]"]`).val().length > 0 ? 1 : 0;
          break;
        case 'textarea':
          req+= $(`textarea[name="question_id[${questionID}]"]`).val().length > 0 ? 1 : 0;
          break;
        case 'radio':
        case 'checkbox':
          req+= $(`input[name="question_id[${questionID}][]"]:checked`).length;
          break;
      }
      if(req == $('.question-container').length){
        success = !success 
      }
      else{
        success = false
      }
    })                                                                                                                                                                                   
    if(!success){
       alert('hamisini doldur')
    }
    else $('form').submit()
})
});

// radio ve checkboxlarin hərf əlavə etmə funksiyası Jquery siz
// window.onload = function(){
//  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
// let questions = document.querySelectorAll('.question-container')
// questions.forEach(item=>{
//     item.querySelectorAll('.question_choice').forEach((cvb,index)=>{
//         cvb.innerHTML = alphabet[index]
//     })
// })

// }
